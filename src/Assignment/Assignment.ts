import mongoose, { Schema, Document } from 'mongoose';
import { AssignmentBase, AssignmentDocument } from "./assignment.interfaces";
import { v4 as uuidv4 } from 'uuid';

const AssignmentSchema = new Schema<AssignmentDocument>(
  {
    _id: {
      type: String,
      default: uuidv4, 
    },
    field: {
      type: String,
      ref: 'Field',
      required: true,
    },
    form: {
      type: String,
      ref: 'Form',
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false,
  }
);

AssignmentSchema.methods.softDelete = async function() {
  this.deletedAt = new Date();
  return await this.save();
};

AssignmentSchema.methods.restore = async function() {
  this.deletedAt = undefined;
  return await this.save();
};

const AssignmentModel = mongoose.model<AssignmentDocument>('Assignment', AssignmentSchema);
export default AssignmentModel;
