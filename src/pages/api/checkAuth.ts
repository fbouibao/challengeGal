// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME } from "../../../constants";
import { verify } from "jsonwebtoken";

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
    verify(verifiedValue, secret);
    res.status(200).json({ message: "authorized" });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
}
