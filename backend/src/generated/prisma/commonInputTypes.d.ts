import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums";
import type * as Prisma from "./internal/prismaNamespace";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumClientStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientStatus | Prisma.EnumClientStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ClientStatus[] | Prisma.ListEnumClientStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ClientStatus[] | Prisma.ListEnumClientStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumClientStatusFilter<$PrismaModel> | $Enums.ClientStatus;
};
export type EnumClientStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientStatus | Prisma.EnumClientStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ClientStatus[] | Prisma.ListEnumClientStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ClientStatus[] | Prisma.ListEnumClientStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumClientStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClientStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumClientStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumClientStatusFilter<$PrismaModel>;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type BytesNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Bytes | Prisma.BytesFieldRefInput<$PrismaModel> | null;
    in?: runtime.Bytes[] | Prisma.ListBytesFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Bytes[] | Prisma.ListBytesFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedBytesNullableFilter<$PrismaModel> | runtime.Bytes | null;
};
export type EnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | Prisma.EnumDocumentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentStatus[] | Prisma.ListEnumDocumentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentStatus[] | Prisma.ListEnumDocumentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type BytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Bytes | Prisma.BytesFieldRefInput<$PrismaModel> | null;
    in?: runtime.Bytes[] | Prisma.ListBytesFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Bytes[] | Prisma.ListBytesFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedBytesNullableWithAggregatesFilter<$PrismaModel> | runtime.Bytes | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedBytesNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedBytesNullableFilter<$PrismaModel>;
};
export type EnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | Prisma.EnumDocumentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentStatus[] | Prisma.ListEnumDocumentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentStatus[] | Prisma.ListEnumDocumentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDocumentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDocumentStatusFilter<$PrismaModel>;
};
export type EnumDeadlinePriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlinePriority | Prisma.EnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlinePriority[] | Prisma.ListEnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlinePriority[] | Prisma.ListEnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlinePriorityFilter<$PrismaModel> | $Enums.DeadlinePriority;
};
export type EnumDeadlineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlineStatus | Prisma.EnumDeadlineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlineStatus[] | Prisma.ListEnumDeadlineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlineStatus[] | Prisma.ListEnumDeadlineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlineStatusFilter<$PrismaModel> | $Enums.DeadlineStatus;
};
export type EnumDeadlineTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlineType | Prisma.EnumDeadlineTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlineType[] | Prisma.ListEnumDeadlineTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlineType[] | Prisma.ListEnumDeadlineTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlineTypeFilter<$PrismaModel> | $Enums.DeadlineType;
};
export type EnumDeadlinePriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlinePriority | Prisma.EnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlinePriority[] | Prisma.ListEnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlinePriority[] | Prisma.ListEnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlinePriorityWithAggregatesFilter<$PrismaModel> | $Enums.DeadlinePriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeadlinePriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeadlinePriorityFilter<$PrismaModel>;
};
export type EnumDeadlineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlineStatus | Prisma.EnumDeadlineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlineStatus[] | Prisma.ListEnumDeadlineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlineStatus[] | Prisma.ListEnumDeadlineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlineStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeadlineStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeadlineStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeadlineStatusFilter<$PrismaModel>;
};
export type EnumDeadlineTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlineType | Prisma.EnumDeadlineTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlineType[] | Prisma.ListEnumDeadlineTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlineType[] | Prisma.ListEnumDeadlineTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlineTypeWithAggregatesFilter<$PrismaModel> | $Enums.DeadlineType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeadlineTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeadlineTypeFilter<$PrismaModel>;
};
export type EnumAlertTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertType | Prisma.EnumAlertTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AlertType[] | Prisma.ListEnumAlertTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AlertType[] | Prisma.ListEnumAlertTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAlertTypeFilter<$PrismaModel> | $Enums.AlertType;
};
export type EnumAlertPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertPriority | Prisma.EnumAlertPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.AlertPriority[] | Prisma.ListEnumAlertPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AlertPriority[] | Prisma.ListEnumAlertPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAlertPriorityFilter<$PrismaModel> | $Enums.AlertPriority;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type EnumAlertTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertType | Prisma.EnumAlertTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AlertType[] | Prisma.ListEnumAlertTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AlertType[] | Prisma.ListEnumAlertTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAlertTypeWithAggregatesFilter<$PrismaModel> | $Enums.AlertType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAlertTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAlertTypeFilter<$PrismaModel>;
};
export type EnumAlertPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertPriority | Prisma.EnumAlertPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.AlertPriority[] | Prisma.ListEnumAlertPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AlertPriority[] | Prisma.ListEnumAlertPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAlertPriorityWithAggregatesFilter<$PrismaModel> | $Enums.AlertPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAlertPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAlertPriorityFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumClientStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientStatus | Prisma.EnumClientStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ClientStatus[] | Prisma.ListEnumClientStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ClientStatus[] | Prisma.ListEnumClientStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumClientStatusFilter<$PrismaModel> | $Enums.ClientStatus;
};
export type NestedEnumClientStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientStatus | Prisma.EnumClientStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ClientStatus[] | Prisma.ListEnumClientStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ClientStatus[] | Prisma.ListEnumClientStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumClientStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClientStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumClientStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumClientStatusFilter<$PrismaModel>;
};
export type NestedBytesNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Bytes | Prisma.BytesFieldRefInput<$PrismaModel> | null;
    in?: runtime.Bytes[] | Prisma.ListBytesFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Bytes[] | Prisma.ListBytesFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedBytesNullableFilter<$PrismaModel> | runtime.Bytes | null;
};
export type NestedEnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | Prisma.EnumDocumentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentStatus[] | Prisma.ListEnumDocumentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentStatus[] | Prisma.ListEnumDocumentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedBytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Bytes | Prisma.BytesFieldRefInput<$PrismaModel> | null;
    in?: runtime.Bytes[] | Prisma.ListBytesFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Bytes[] | Prisma.ListBytesFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedBytesNullableWithAggregatesFilter<$PrismaModel> | runtime.Bytes | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedBytesNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedBytesNullableFilter<$PrismaModel>;
};
export type NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | Prisma.EnumDocumentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentStatus[] | Prisma.ListEnumDocumentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentStatus[] | Prisma.ListEnumDocumentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDocumentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDocumentStatusFilter<$PrismaModel>;
};
export type NestedEnumDeadlinePriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlinePriority | Prisma.EnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlinePriority[] | Prisma.ListEnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlinePriority[] | Prisma.ListEnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlinePriorityFilter<$PrismaModel> | $Enums.DeadlinePriority;
};
export type NestedEnumDeadlineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlineStatus | Prisma.EnumDeadlineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlineStatus[] | Prisma.ListEnumDeadlineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlineStatus[] | Prisma.ListEnumDeadlineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlineStatusFilter<$PrismaModel> | $Enums.DeadlineStatus;
};
export type NestedEnumDeadlineTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlineType | Prisma.EnumDeadlineTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlineType[] | Prisma.ListEnumDeadlineTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlineType[] | Prisma.ListEnumDeadlineTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlineTypeFilter<$PrismaModel> | $Enums.DeadlineType;
};
export type NestedEnumDeadlinePriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlinePriority | Prisma.EnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlinePriority[] | Prisma.ListEnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlinePriority[] | Prisma.ListEnumDeadlinePriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlinePriorityWithAggregatesFilter<$PrismaModel> | $Enums.DeadlinePriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeadlinePriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeadlinePriorityFilter<$PrismaModel>;
};
export type NestedEnumDeadlineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlineStatus | Prisma.EnumDeadlineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlineStatus[] | Prisma.ListEnumDeadlineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlineStatus[] | Prisma.ListEnumDeadlineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlineStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeadlineStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeadlineStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeadlineStatusFilter<$PrismaModel>;
};
export type NestedEnumDeadlineTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeadlineType | Prisma.EnumDeadlineTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DeadlineType[] | Prisma.ListEnumDeadlineTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeadlineType[] | Prisma.ListEnumDeadlineTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeadlineTypeWithAggregatesFilter<$PrismaModel> | $Enums.DeadlineType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeadlineTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeadlineTypeFilter<$PrismaModel>;
};
export type NestedEnumAlertTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertType | Prisma.EnumAlertTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AlertType[] | Prisma.ListEnumAlertTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AlertType[] | Prisma.ListEnumAlertTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAlertTypeFilter<$PrismaModel> | $Enums.AlertType;
};
export type NestedEnumAlertPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertPriority | Prisma.EnumAlertPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.AlertPriority[] | Prisma.ListEnumAlertPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AlertPriority[] | Prisma.ListEnumAlertPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAlertPriorityFilter<$PrismaModel> | $Enums.AlertPriority;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedEnumAlertTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertType | Prisma.EnumAlertTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AlertType[] | Prisma.ListEnumAlertTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AlertType[] | Prisma.ListEnumAlertTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAlertTypeWithAggregatesFilter<$PrismaModel> | $Enums.AlertType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAlertTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAlertTypeFilter<$PrismaModel>;
};
export type NestedEnumAlertPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertPriority | Prisma.EnumAlertPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.AlertPriority[] | Prisma.ListEnumAlertPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AlertPriority[] | Prisma.ListEnumAlertPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAlertPriorityWithAggregatesFilter<$PrismaModel> | $Enums.AlertPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAlertPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAlertPriorityFilter<$PrismaModel>;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
//# sourceMappingURL=commonInputTypes.d.ts.map