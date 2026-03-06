import type { Request, Response } from "express";
export declare const getAlerts: (req: Request, res: Response) => Promise<void>;
export declare const markAsRead: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const clearAllAlerts: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=alert.controller.d.ts.map