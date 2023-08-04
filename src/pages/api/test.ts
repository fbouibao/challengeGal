// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { showDBContent } from "../../../db";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const keys: any[] | undefined = await showDBContent();
    console.log("keys:", keys);
    res.status(200).json({ message: "authorized" });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
}
