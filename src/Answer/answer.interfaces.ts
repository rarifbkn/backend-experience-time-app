import { Document, Types } from 'mongoose';
import { Field } from 'src/Field/field.interfaces';

export interface AnswerBase {
    field: Field;
    init_exp: string;
    final_exp: string;
}

export interface Answer extends AnswerBase {
  _id: string; 
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  softDelete?: () => Promise<Answer>;
  restore?: () => Promise<Answer>;
}

export interface AnswerDocument extends Omit<AnswerBase, 'field'>, Document {
  _id: string;
  field: Types.ObjectId | Field;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  softDelete: () => Promise<AnswerDocument>;
  restore: () => Promise<AnswerDocument>;
  withDeleted: () => Promise<AnswerDocument[]>;
}

export interface FieldModel {
  withDeleted: () => Promise<AnswerDocument[]>;
}

export interface FieldModelMethods {
  softDelete: () => Promise<AnswerDocument>;
  restore: () => Promise<AnswerDocument>;
}