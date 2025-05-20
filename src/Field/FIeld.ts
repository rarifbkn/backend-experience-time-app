import mongoose, { Schema, Document } from 'mongoose';
import { randomBytes } from 'crypto';
import { Field } from 'src/Field/field.interfaces';

const FieldSchema = new Schema<Field & Document>(
  {
    name: { type: String, required: true },
    category: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

FieldSchema.pre('find', function() {
  this.where({ isDeleted: false });
});

FieldSchema.pre('findOne', function() {
  this.where({ isDeleted: false });
});

const FieldModel = mongoose.model<Field & Document>('Field', FieldSchema);
export default FieldModel;