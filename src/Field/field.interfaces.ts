import { Document } from 'mongoose';

export interface FieldBase {
    name: string;
    category: string;
}

export interface Field extends FieldBase {
  _id: any; 
  createdAt: Date;

  
}

export interface FieldDocument extends FieldBase, Document {

  _id: any;
  createdAt: Date;

}

