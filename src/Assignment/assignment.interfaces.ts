import { Document } from "mongoose";

export interface AssignmentBase {
    id_field: string;
    id_form: string;
}

export interface Assignment extends AssignmentBase {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    softDelete?: () => Promise<Assignment>;
    restore?: () => Promise<Assignment>;
}

export interface AssignmentDocument extends AssignmentBase, Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    softDelete: () => Promise<AssignmentDocument>;
    restore: () => Promise<AssignmentDocument>;
    withDeleted: () => Promise<AssignmentDocument[]>;
}

export interface AssignmentModel {
    withDeleted: () => Promise<AssignmentDocument[]>;
}

export interface AssignmentModelMethods {
    softDelete: () => Promise<AssignmentDocument>;
    restore: () => Promise<AssignmentDocument>;
}