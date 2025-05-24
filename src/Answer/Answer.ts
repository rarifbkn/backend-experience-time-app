import mongoose, { Schema, Document, Types } from 'mongoose';
import { AnswerDocument } from 'src/Answer/answer.interfaces';
import { v4 as uuidv4 } from 'uuid';

const AnswerSchema = new Schema<AnswerDocument>(
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
    init_exp: { 
      type: String 
    },
    final_exp: { 
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

AnswerSchema.methods.softDelete = async function() {
  this.deletedAt = new Date();
  return await this.save();
};

AnswerSchema.methods.restore = async function() {
  this.deletedAt = undefined;
  return await this.save();
};

const AnswerModel = mongoose.model<AnswerDocument>('Answer', AnswerSchema);
export default AnswerModel;