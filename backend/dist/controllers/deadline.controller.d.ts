import type { Request, Response } from "express";
export declare const getDeadlines: (req: Request, res: Response) => Promise<void>;
export declare const createDeadline: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDeadlineStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteDeadline: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=deadline.controller.d.ts.map