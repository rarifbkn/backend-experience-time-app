import mongoose, { Schema, Document } from 'mongoose';
import { Field } from 'src/Field/field.interfaces';
import { v4 as uuidv4 } from 'uuid';


const FieldSchema = new Schema<Field & Document>(
  {
    _id: {
      type: String,
      default: uuidv4, 
    },
    name: {
      type: String,
      required: true
    },
    category: { 
      type: String 
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

FieldSchema.methods.softDelete = async function() {
  this.deletedAt = new Date();
  return await this.save();
};

FieldSchema.methods.restore = async function() {
  this.deletedAt = undefined;
  return await this.save();
};

const FieldModel = mongoose.model<Field & Document>('Field', FieldSchema);
export default FieldModel;