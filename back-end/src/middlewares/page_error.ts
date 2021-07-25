import { Request, Response } from "express";

export const error_404 = (req: Request, res: Response): Response => {
  console.log("🔥 error 404 ", req.originalUrl, req.baseUrl, req.url);
  return res.status(404).json({ message: "Page not found", error: 404 });
};
