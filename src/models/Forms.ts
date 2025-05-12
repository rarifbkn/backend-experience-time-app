import mongoose, { Schema, Document } from 'mongoose';
import { randomBytes } from 'crypto';
import { Forms, FormsBase } from '../interfaces/forms.interfaces';

const FormSchema = new Schema<Forms & Document>(
  {
    title: { type: String, required: true },
    description: { type: String },
    token: {
      type: String,
      required: true,
      unique: true,
      default: () => randomBytes(16).toString('hex'),
    },
    expireDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

FormSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return await this.save();
};

FormSchema.methods.restore = async function() {
  this.isDeleted = false;
  this.deletedAt = undefined;
  return await this.save();
};

FormSchema.pre('find', function() {
  this.where({ isDeleted: false });
});

FormSchema.pre('findOne', function() {
  this.where({ isDeleted: false });
});

// Método estático para obtener también los documentos eliminados
FormSchema.statics.withDeleted = function() {
  return this.find().where({ isDeleted: true });
};

const FormModel = mongoose.model<Forms & Document>('Form', FormSchema);
export default FormModel;