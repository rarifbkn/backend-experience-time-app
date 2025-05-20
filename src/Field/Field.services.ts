import FieldModel from "./FIeld";
import {Field, FieldDocument, FieldBase} from "./field.interfaces";
import mongoose from 'mongoose';

export const createField = async (data: Partial<FieldBase>): Promise<Field> => {
    try {
        const field = new FieldModel(data);
        return await field.save();
    } catch (error) {
        console.error('Error creating field:', error);
        throw new Error('Failed to create field');
    }
}

export const getAllFields = async (): Promise<Field[]> => {
    try {
        return await FieldModel.find();
    } catch (error) {
        console.error('Error fetching all fields:', error);
        throw new Error('Failed to fetch fields');
    }
}

export const getFieldById = async (id: string): Promise<Field | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return await FieldModel.findById(id);
    } catch (error) {
        console.error('Error fetching field by ID:', error);
        throw new Error('Failed to fetch field by ID');
    }
}

export const updateField = async (
    id: string,
    updates: Partial<FieldBase>
): Promise<Field | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return await FieldModel.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: new Date() },
            { new: true }
        );
    } catch (error) {
        console.error('Error updating field:', error);
        throw new Error('Failed to update field');
    }
}

export const deleteField = async (id: string): Promise<Field | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return await FieldModel.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting field:', error);
        throw new Error('Failed to delete field');
    }
}