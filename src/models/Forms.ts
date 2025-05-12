import mongoose, { Document, Model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Forms } from '../interfaces/forms.interfaces';

export interface FormsDocument extends Forms, Document {
  softDelete(): Promise<FormsDocument>;
  restore(): Promise<FormsDocument>;
}

export interface FormsModel extends Model<FormsDocument> {
  withDeleted(): mongoose.Query<FormsDocument[], FormsDocument>;
}

const formsSchema = new Schema<FormsDocument, FormsModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    expire_date: { type: Date, required: true },
    token: {
        type: String,
        default: () => uuidv4(), 
        unique: true
      },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    deletedAt: {
      type: Date,
      default: null
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'forms',
    versionKey: '__v',
    timestamps: false
  }
);

formsSchema.pre('save', function (next) {
    this.set('updatedAt', new Date());
  });
  

formsSchema.methods.softDelete = function (): Promise<FormsDocument> {
  this.deletedAt = new Date();
  this.isDeleted = true;
  return this.save();
};

formsSchema.methods.restore = function (): Promise<FormsDocument> {
  this.deletedAt = null;
  this.isDeleted = false;
  return this.save();
};

formsSchema.statics.withDeleted = function () {
  return this.find({ isDeleted: true });
};

const FormModel = mongoose.model<FormsDocument, FormsModel>('Forms', formsSchema);
export default FormModel;
