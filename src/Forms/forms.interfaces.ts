import { Document } from 'mongoose';

export interface FormsBase {
  title: string;
  description?: string;
  token: string;
  expireDate?: Date;
}

export interface Forms extends FormsBase {
  _id: any; 
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date | null;
  
  softDelete?: () => Promise<Forms>;
  restore?: () => Promise<Forms>;
}

export interface FormDocument extends FormsBase, Document {
  softDelete: () => Promise<FormDocument>;
  restore: () => Promise<FormDocument>;
  _id: any;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date | null;
}

export interface FormModel {
  withDeleted: () => Promise<FormDocument[]>;
}