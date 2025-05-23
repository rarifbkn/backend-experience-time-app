import AnswerModel from "./Answer";
import { Answer, AnswerDocument, AnswerBase } from "./answer.interfaces";
import { validate as isUuid } from "uuid";
import * as FieldService from "../Field/Field.services";


export const createAnswer = async (data: Partial<AnswerBase>): Promise<Answer> => {
  try {
    if (!data.fieldId) {
      throw new Error("Field ID is required");
    }
    const existField = await FieldService.getFieldById(data.fieldId);
    if (!existField) {
      throw new Error("Field with the given ID does not exist");
    }
    const answer = new AnswerModel(data);
    return await answer.save();
  } catch (error) {
    console.error("Error creating answer:", error);
    throw new Error("Failed to create answer");
  }
};

export const getAllAnswers = async (): Promise<Answer[]> => {
  try {
    return await AnswerModel.find();
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
    return await AnswerModel.findById(id);
  } catch (error) {
    console.error("Error fetching answer by ID:", error);
    throw new Error("Failed to fetch answer by ID");
  }
};

export const updateAnswer = async (
  id: string,
  updates: Partial<AnswerBase>
): Promise<Answer | null> => {
  try {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID format");
    }
    return await AnswerModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
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
    return await AnswerModel.findByIdAndDelete(id);
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
    return await answer.softDelete();
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
    return await answer.restore();
  } catch (error) {
    console.error("Error restoring answer:", error);
    throw new Error("Failed to restore answer");
  }
};

export const getActiveAnswers = async (): Promise<Answer[]> => {
  try {
    return await AnswerModel.find({ deletedAt: null });
  } catch (error) {
    console.error("Error fetching active answers:", error);
    throw new Error("Failed to fetch active answers");
  }
};