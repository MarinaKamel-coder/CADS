import { clerkMiddleware } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";

export const clerkAuth = clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY!,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
});

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth?.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
