import FormModel from '../models/Forms';
import { Forms, FormsBase } from '../interfaces/forms.interfaces';

export const createForm = async (data: Partial<FormsBase>): Promise<Forms> => {
    const form = new FormModel(data);
    return await form.save();
  };
  
export const getAllForms = async (): Promise<Forms[]> => {
  return await FormModel.find({ isDeleted: false });
};

export const getFormById = async (id: string): Promise<Forms | null> => {
  return await FormModel.findById(id);
};

export const getFormByToken = async (token: string): Promise<Forms | null> => {
  return await FormModel.findOne({ token });
};

export const updateForm = async (
  id: string,
  updates: Partial<Forms>
): Promise<Forms | null> => {
  return await FormModel.findByIdAndUpdate(
    id,
    { ...updates, updatedAt: new Date() },
    { new: true }
  );
};

export const deleteForm = async (id: string): Promise<Forms | null> => {
  const form = await FormModel.findById(id);
  if (!form) return null;
  return await form.softDelete();
};

export const restoreForm = async (id: string): Promise<Forms | null> => {
  const form = await FormModel.findById(id);
  if (!form) return null;
  return await form.restore();
};

export const getDeletedForms = async (): Promise<Forms[]> => {
  return await FormModel.withDeleted();
};
