export declare const UserRole: {
    readonly COMPTABLE: "COMPTABLE";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const ClientStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
};
export type ClientStatus = (typeof ClientStatus)[keyof typeof ClientStatus];
export declare const DocumentStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSED: "PROCESSED";
    readonly APPROVED: "APPROVED";
};
export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus];
export declare const DeadlineStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly INACTIVE: "INACTIVE";
};
export type DeadlineStatus = (typeof DeadlineStatus)[keyof typeof DeadlineStatus];
export declare const DeadlinePriority: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
};
export type DeadlinePriority = (typeof DeadlinePriority)[keyof typeof DeadlinePriority];
export declare const DeadlineType: {
    readonly FEDERAL: "FEDERAL";
    readonly PROVINCIAL: "PROVINCIAL";
    readonly MUNICIPAL: "MUNICIPAL";
};
export type DeadlineType = (typeof DeadlineType)[keyof typeof DeadlineType];
export declare const AlertType: {
    readonly DEADLINE: "DEADLINE";
    readonly DOCUMENT: "DOCUMENT";
    readonly SYSTEM: "SYSTEM";
};
export type AlertType = (typeof AlertType)[keyof typeof AlertType];
export declare const AlertPriority: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
};
export type AlertPriority = (typeof AlertPriority)[keyof typeof AlertPriority];
//# sourceMappingURL=enums.d.ts.map