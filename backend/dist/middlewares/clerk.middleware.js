import { clerkMiddleware } from "@clerk/express";
export const clerkAuth = clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});
export const requireAuth = (req, res, next) => {
    if (!req.auth?.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
//# sourceMappingURL=clerk.middleware.js.map