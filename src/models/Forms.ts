// src/models/Form.ts
import mongoose, { Schema, Document } from 'mongoose';
import { randomBytes } from 'crypto';
import { Forms, FormsBase } from '../interfaces/forms.interfaces';

// Esquema de Mongoose para formularios
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
    // Otros campos específicos que puedas tener
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Método para soft delete
FormSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return await this.save();
};

// Método para restaurar
FormSchema.methods.restore = async function() {
  this.isDeleted = false;
  this.deletedAt = undefined;
  return await this.save();
};

// Query middleware para excluir los documentos eliminados por defecto
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

// Export del modelo
const FormModel = mongoose.model<Forms & Document>('Form', FormSchema);

export default FormModel;