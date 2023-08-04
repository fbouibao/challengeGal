// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME } from "../../../constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByUsername, db } from "../../../db";

type Data = {
  message: string;
  likes?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.cookies[COOKIE_NAME] ?? null;
  const likes: string[] = [];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const verifiedValue = token as string;

  const secret = process.env.JWT_SECRET || "";

  try {
    const decodedToken = jwt.verify(verifiedValue, secret) as JwtPayload;
    const username = decodedToken.username;
    const imgsId: string[] = req.body.imageIds;
    await db.db.open();
    for (const key of imgsId) {
      const check: string | null = await getUserByUsername(
        (username + "_" + key) as string
      );
      if (check !== null) {
        likes.push(key);
      }
    }
    await db.db.close();
    res.status(200).json({ message: "Success", likes: likes });
  } catch (e) {
    await db.db.close();
    res.status(400).json({ message: "Something went wrong" });
  }
}
