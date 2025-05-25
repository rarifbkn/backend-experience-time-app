import AnswerModel from "./Answer";
import { Answer, AnswerDocument } from "./answer.interfaces";
import { validate as isUuid } from "uuid";
import * as FieldService from "../Field/Field.services";

interface CreateAnswerInput {
  fieldId: string;
  init_exp: string;
  final_exp: string;
}

export const createAnswer = async (data: CreateAnswerInput): Promise<Answer> => {
  try {
    if (!data.fieldId) {
      throw new Error("Field ID is required");
    }
    const existField = await FieldService.getFieldById(data.fieldId);
    if (!existField) {
      throw new Error("Field with the given ID does not exist");
    }
    
    const answer = new AnswerModel({
      field: data.fieldId, 
      init_exp: data.init_exp,
      final_exp: data.final_exp
    });
    
    const savedAnswer = await answer.save();
    return await savedAnswer.populate('field');
  } catch (error) {
    console.error("Error creating answer:", error);
    throw new Error("Failed to create answer");
  }
};

export const getAllAnswers = async (): Promise<Answer[]> => {
  try {
    const answers = await AnswerModel.find().populate('field');
    return answers as Answer[];
  } catch (error) {
    console.error("Error fetching all answers:", error);
    throw new Error("Failed to fetch answers");
  }
};

export const getAnswerById = async (id: string): Promise<Answer | null> => {
  try {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID format");
    }
    const answer = await AnswerModel.findById(id).populate('field');
    return answer as Answer | null;
  } catch (error) {
    console.error("Error fetching answer by ID:", error);
    throw new Error("Failed to fetch answer by ID");
  }
};

export const updateAnswer = async (
  id: string,
  updates: Partial<CreateAnswerInput>
): Promise<Answer | null> => {
  try {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID format");
    }
    
    if (updates.fieldId) {
      const existField = await FieldService.getFieldById(updates.fieldId);
      if (!existField) {
        throw new Error("Field with the given ID does not exist");
      }
    }
    
    const updateData: any = { ...updates, updatedAt: new Date() };
    if (updates.fieldId) {
      updateData.field = updates.fieldId;
      delete updateData.fieldId;
    }
    
    const answer = await AnswerModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('field');
    return answer as Answer | null;
  } catch (error) {
    console.error("Error updating answer:", error);
    throw new Error("Failed to update answer");
  }
};

export const deleteAnswer = async (id: string): Promise<Answer | null> => {
  try {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID format");
    }
    const answer = await AnswerModel.findByIdAndDelete(id).populate('field');
    return answer as Answer | null;
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw new Error("Failed to delete answer");
  }
};

export const softDeleteAnswer = async (id: string): Promise<Answer | null> => {
  try {
    const answer = await AnswerModel.findById(id) as AnswerDocument | null;
    if (!answer) {
      throw new Error("Answer not found");
    }
    const deletedAnswer = await answer.softDelete();
    const populatedAnswer = await deletedAnswer.populate('field');
    return populatedAnswer as Answer;
  } catch (error) {
    console.error("Error soft deleting answer:", error);
    throw new Error("Failed to soft delete answer");
  }
};

export const restoreAnswer = async (id: string): Promise<Answer | null> => {
  try {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID format");
    }
    const answer = await AnswerModel.findById(id) as AnswerDocument | null;
    if (!answer) {
      throw new Error("Answer not found");
    }
    const restoredAnswer = await answer.restore();
    const populatedAnswer = await restoredAnswer.populate('field');
    return populatedAnswer as Answer;
  } catch (error) {
    console.error("Error restoring answer:", error);
    throw new Error("Failed to restore answer");
  }
};

export const getActiveAnswers = async (): Promise<Answer[]> => {
  try {
    const answers = await AnswerModel.find({ deletedAt: null }).populate('field');
    return answers as Answer[];
  } catch (error) {
    console.error("Error fetching active answers:", error);
    throw new Error("Failed to fetch active answers");
  }
};