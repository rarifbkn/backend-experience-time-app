import { Document } from 'mongoose';

export interface FormsBase {
  title: string;
  description?: string;
  token: string;
  expireDate?: Date;
}

export interface Forms extends FormsBase {
  _id: string; 
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  softDelete?: () => Promise<Forms>;
  restore?: () => Promise<Forms>;
}

export interface FormDocument extends FormsBase, Document {
  softDelete: () => Promise<FormDocument>;
  restore: () => Promise<FormDocument>;
  withDeleted: () => Promise<FormDocument[]>;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface FormModel {
  withDeleted: () => Promise<FormDocument[]>;
}
export interface FormModelMethods {
  softDelete: () => Promise<FormDocument>;
  restore: () => Promise<FormDocument>;
}
