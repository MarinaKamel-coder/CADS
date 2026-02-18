import type { Request, Response, NextFunction } from "express";
import prisma from "../prisma/prisma";
import { getAuth, clerkClient } from "@clerk/express";

export const syncUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: auth.userId },
  });

  if (!existingUser) {
    const clerkUser = await clerkClient.users.getUser(auth.userId);

    // SAFE EMAIL EXTRACTION
    const primaryEmail =
      clerkUser.emailAddresses?.[0]?.emailAddress ??
      "no-email@clerk.local";

    await prisma.user.create({
      data: {
        id: auth.userId, // Clerk userId
        email: primaryEmail,
        firstName: clerkUser.firstName ?? "",
        lastName: clerkUser.lastName ?? "",
      },
    });

    console.log("✅ User created in database");
  }

  next();
};
