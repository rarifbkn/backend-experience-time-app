import AssignmentModel from "./Assignment";
import { Assignment, AssignmentBase } from "./assignment.interfaces";
import mongoose from 'mongoose';
import * as FieldService from "../Field/Field.services";
import * as FormService from "../Forms/Forms.services";

export const createAssignment = async (assignmentData: AssignmentBase): Promise<Assignment> => {
    try {
        const existingField = await FieldService.getFieldById(assignmentData.id_field);
        if (!existingField) {
            throw new Error('Field with the given ID does not exist');
        }

        const existingForm = await FormService.getFormById(assignmentData.id_form);
        if (!existingForm) {
            throw new Error('Form with the given ID does not exist');
        }

        const assignment = new AssignmentModel(assignmentData);
        return await assignment.save();


    } catch (error) {
        console.error('Error creating assignment:', error);
        throw new Error('Failed to create assignment');
    }
}

export const getAllAssignments = async (): Promise<Assignment[]> => {
    try {
        return await AssignmentModel.find();
    } catch (error) {
        console.error('Error fetching all assignments:', error);
        throw new Error('Failed to fetch assignments');
    }
}

export const getAssignmentById = async (id: string): Promise<Assignment | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return await AssignmentModel.findById(id);
    } catch (error) {
        console.error('Error fetching assignment by ID:', error);
        throw new Error('Failed to fetch assignment by ID');
    }
}

export const updateAssignment = async (
    id: string,
    updates: Partial<AssignmentBase>
): Promise<Assignment | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return await AssignmentModel.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: new Date() },
            { new: true }
        );
    } catch (error) {
        console.error('Error updating assignment:', error);
        throw new Error('Failed to update assignment');
    }
}

export const deleteAssignment = async (id: string): Promise<Assignment | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return await AssignmentModel.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting assignment:', error);
        throw new Error('Failed to delete assignment');
    }
}

export const softDeleteAssignment = async (id: string): Promise<Assignment | null> => {
    try {
        const assignment = await AssignmentModel.findById(id);
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        return await assignment.softDelete();
    } catch (error) {
        console.error('Error soft deleting assignment:', error);
        throw new Error('Failed to soft delete assignment');
    }
}

export const restoreAssignment = async (id: string): Promise<Assignment | null> => {
    try {
        const assignment = await AssignmentModel.findById(id);
        if (!assignment) {
            throw new Error('Assignment not found or not deleted');
        }
        return await assignment.restore();
    } catch (error) {
        console.error('Error restoring assignment:', error);
        throw new Error('Failed to restore assignment');
    }
}

// export const getAssignmentsWithDeleted = async (): Promise<Assignment[]> => {
//     try {
//         return await AssignmentModel.withDeleted();
//     } catch (error) {
//         console.error('Error fetching assignments with deleted:', error);
//         throw new Error('Failed to fetch assignments with deleted');
//     }
// }

export const getActiveAssignments = async (): Promise<Assignment[]> => {
    try {
        return await AssignmentModel.find({ deletedAt: null });
    } catch (error) {
        console.error('Error fetching active assignments:', error);
        throw new Error('Failed to fetch active assignments');
    }
}