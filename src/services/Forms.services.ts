import FormModel from '../models/Forms';
import { Forms, FormsBase, FormDocument } from '../interfaces/forms.interfaces';
import mongoose from 'mongoose';

export const createForm = async (data: Partial<FormsBase>): Promise<Forms> => {
  try {
    const form = new FormModel(data);
    return await form.save();
  } catch (error) {
    console.error('Error creating form:', error);
    throw new Error('Failed to create form');
  }
};

export const getAllForms = async (): Promise<Forms[]> => {
  try {
    return await FormModel.find();
  } catch (error) {
    console.error('Error fetching all forms:', error);
    throw new Error('Failed to fetch forms');
  }
};

export const getFormById = async (id: string): Promise<Forms | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    return await FormModel.findById(id);
  } catch (error) {
    console.error('Error fetching form by ID:', error);
    throw new Error('Failed to fetch form by ID');
  }
};

export const getFormByToken = async (token: string): Promise<Forms | null> => {
  try {
    return await FormModel.findOne({ token });
  } catch (error) {
    console.error('Error fetching form by token:', error);
    throw new Error('Failed to fetch form by token');
  }
};

export const updateForm = async (
  id: string,
  updates: Partial<FormsBase>
): Promise<Forms | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    return await FormModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
  } catch (error) {
    console.error('Error updating form:', error);
    throw new Error('Failed to update form');
  }
};

export const deleteForm = async (id: string): Promise<Forms | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    
    const form = await FormModel.findById(id) as FormDocument | null;
    if (!form) return null;
    
    return await form.softDelete();
  } catch (error) {
    console.error('Error deleting form:', error);
    throw new Error('Failed to delete form');
  }
};

export const restoreForm = async (id: string): Promise<Forms | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    
    const form = await FormModel.findOne({ _id: id, isDeleted: true }).exec() as FormDocument | null;
    if (!form) return null;
    
    return await form.restore();
  } catch (error) {
    console.error('Error restoring form:', error);
    throw new Error('Failed to restore form');
  }
};

// export const getDeletedForms = async (): Promise<Forms[]> => {
//   try {
//     return await FormModel.withDeleted();
//   } catch (error) {
//     console.error('Error fetching deleted forms:', error);
//     throw new Error('Failed to fetch deleted forms');
//   }
// };