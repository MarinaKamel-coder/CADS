import type { Request, Response } from "express";
export declare const getDocuments: (req: Request, res: Response) => Promise<void>;
export declare const getDocumentsByClientId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const uploadDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDocumentStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const downloadDocument: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const deleteDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=document.controller.d.ts.map