// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME } from "../../../constants";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import {
  checkBlockedUser,
  checkExistUser,
  db,
} from "../../../db";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

type Data = {
  existUser: boolean;
  blockedUser: boolean;
  message?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (
    req.method === "POST" &&
    req.body.query &&
    req.body.query.username &&
    req.body.query.password
  ) {
    await db.db.open();
    const checkExist: boolean = await checkExistUser(
      req.body.query.username,
      req.body.query.password
    );
    if (checkExist) {
      const checkBlock: boolean = await checkBlockedUser(
        req.body.query.username
      );
      if (checkBlock) {
        await db.db.close();
        res.status(200).json({
          existUser: checkExist,
          blockedUser: checkBlock,
          message: "Ce compte a été bloqué",
        });
      } else {
        const { username, password } = req.body.query;
        const secret = process.env.JWT_SECRET || "";
        const token = sign(
          {
            username,
          },
          secret,
          {
            expiresIn: MAX_AGE,
          }
        );
        const seralized = serialize(COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: MAX_AGE,
          path: "/",
        });
        await db.db.close();
        res.setHeader("Set-Cookie", seralized);
        res.status(200).json({
          existUser: checkExist,
          blockedUser: checkBlock,
        });
      }
    } else {
      await db.db.close();
      res.status(200).json({
        existUser: false,
        blockedUser: false,
        message: "Informations de connexion invalides",
      });
    }
  } else {
    await db.db.close();
    res.status(400).json({
      existUser: false,
      blockedUser: false,
    });
  }
}
