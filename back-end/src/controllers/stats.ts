import { Request, Response } from "express";
import { getManager } from "typeorm";

export async function statsPrint(
  req: Request,
  res: Response
): Promise<Response> {
  console.log("Print stats");
  return res.status(200).json({ message: "OK !" });
}
