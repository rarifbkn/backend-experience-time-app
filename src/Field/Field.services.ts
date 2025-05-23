import FieldModel from "./Field";
import { Field, FieldBase, FieldDocument } from "./field.interfaces";
import { validate as isUuid } from "uuid";

export const createField = async (data: Partial<FieldBase>): Promise<Field> => {
  try {
    const field = new FieldModel(data);
    return await field.save();
  } catch (error) {
    console.error("Error creating field:", error);
    throw new Error("Failed to create field");
  }
};

export const getAllFields = async (): Promise<Field[]> => {
  try {
    return await FieldModel.find();
  } catch (error) {
    console.error("Error fetching all fields:", error);
    throw new Error("Failed to fetch fields");
  }
};

export const getFieldById = async (id: string): Promise<Field | null> => {
  try {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID format");
    }
    return await FieldModel.findById(id);
  } catch (error) {
    console.error("Error fetching field by ID:", error);
    throw new Error("Failed to fetch field by ID");
  }
};

export const updateField = async (
  id: string,
  updates: Partial<FieldBase>
): Promise<Field | null> => {
  try {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID format");
    }
    return await FieldModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating field:", error);
    throw new Error("Failed to update field");
  }
};

export const deleteField = async (id: string): Promise<Field | null> => {
  try {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID format");
    }
    return await FieldModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting field:", error);
    throw new Error("Failed to delete field");
  }
};

export const softDeleteField = async (id: string): Promise<Field | null> => {
  try {
    const field = await FieldModel.findById(id) as FieldDocument | null;
    if (!field) return null;
    return await field.softDelete();
  } catch (error) {
    console.error("Error performing soft delete on field:", error);
    throw new Error("Failed to soft delete field");
  }
};


export const restoreField = async (id: string): Promise<Field | null> => {
  try {
    const field = await FieldModel.findOne({ _id: id, deletedAt: { $ne: null } }) as FieldDocument | null;
    if (!field) return null;
    return await field.restore();
  } catch (error) {
    console.error("Error restoring field:", error);
    throw new Error("Failed to restore field");
  }
};


export const getActiveFields = async (): Promise<Field[]> => {
  try {
    return await FieldModel.find({ deletedAt: null });
  } catch (error) {
    console.error("Error fetching active fields:", error);
    throw new Error("Failed to fetch active fields");
  }
};
