import mongoose, { Schema, Document } from 'mongoose';
import { AssignmentBase, AssignmentDocument } from "./assignment.interfaces";
import { v4 as uuidv4 } from 'uuid';

const AssignmentSchema = new Schema<AssignmentDocument>(
  {
    _id: {
      type: String,
      default: uuidv4, 
    },
    id_field: {
      type: String,
      required: true,
    },
    id_form: {
      type: String,
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
