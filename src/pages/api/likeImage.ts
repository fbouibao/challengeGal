// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  dislikeImage,
  getUserByUsername,
  likeImage,
  showDBContent,
  db
} from "../../../db";
import { COOKIE_NAME } from "../../../constants";
import jwt, { JwtPayload } from "jsonwebtoken";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.cookies[COOKIE_NAME] ?? null;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const verifiedValue = token as string;

  const secret = process.env.JWT_SECRET || "";

  try {
    const decodedToken = jwt.verify(verifiedValue, secret) as JwtPayload;
    
    const username = decodedToken.username;
    await db.db.open();
    if (
      (await getUserByUsername(
        (username + "_" + req.body.imageId) as string
      )) === null
    ) {
      const likeImg = await likeImage(username, req.body.imageId);
      if (!likeImg) {
        await db.db.close();
        res.status(400).json({ message: "Something went wrong" });
      }
    } else {
      const dislikeImg = await dislikeImage(username, req.body.imageId);
      if (!dislikeImg) {
        await db.db.close();
        res.status(400).json({ message: "Something went wrong" });
      }
    }
    await db.db.close();
    res.status(200).json({ message: "authorized" });
  } catch (e) {
    await db.db.close();
    res.status(400).json({ message: "Something went wrong" });
  }
}
