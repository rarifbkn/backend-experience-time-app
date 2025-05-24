import { Document, Types } from "mongoose";
import { Field } from "src/Field/field.interfaces";
import { Forms } from "src/Forms/forms.interfaces";

export interface AssignmentBase {
    field: Field;
    form: Forms;
}

export interface Assignment extends AssignmentBase {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    softDelete?: () => Promise<Assignment>;
    restore?: () => Promise<Assignment>;
}

export interface AssignmentDocument extends Omit<AssignmentBase, 'field' | 'form'>, Document {
    _id: string;
    field: Types.ObjectId | Field;
    form: Types.ObjectId | Forms;
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