import mongoose, { Schema, Document } from 'mongoose';
import { randomBytes } from 'crypto';
import { Forms, FormsBase } from './forms.interfaces';
import { v4 as uuidv4 } from 'uuid';

const FormSchema = new Schema<Forms & Document>(
  {
    _id: {
      type: String,
      default: uuidv4, 
    },
    title: { type: String, required: true },
    description: { type: String },
    token: {
      type: String,
      required: true,
      unique: true,
      default: () => randomBytes(16).toString('hex'),
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

FormSchema.methods.softDelete = async function() {
  this.deletedAt = new Date();
  return await this.save();
};

FormSchema.methods.restore = async function() {
  this.deletedAt = undefined;
  return await this.save();
};



const FormModel = mongoose.model<Forms & Document>('Form', FormSchema);
export default FormModel;