import { Document } from 'mongoose';

export interface FieldBase {
  name: string;
  category: string;
}

export interface Field extends FieldBase {
  _id: string; 
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  softDelete?: () => Promise<Field>;
  restore?: () => Promise<Field>;
}

export interface FieldDocument extends FieldBase, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  softDelete: () => Promise<FieldDocument>;
  restore: () => Promise<FieldDocument>;
  withDeleted: () => Promise<FieldDocument[]>;
}

export interface FieldModel {
  withDeleted: () => Promise<FieldDocument[]>;
}

export interface FieldModelMethods {
  softDelete: () => Promise<FieldDocument>;
  restore: () => Promise<FieldDocument>;
}
