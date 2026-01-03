import "express";

declare module "express" {
  interface Request {
    auth?: {
      userId: string;
    };
  }
}
