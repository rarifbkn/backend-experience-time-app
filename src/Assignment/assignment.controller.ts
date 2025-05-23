import { RequestHandler } from "express";
import * as assignmentService from "./Assignment.services";

type IdParams = { id: string };

const create: RequestHandler = async (req, res) => {
  try {
    const assignment = await assignmentService.createAssignment(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: "Error creating assignment", details: err });
  }
}

const getAll: RequestHandler = async (_req, res) => {
  try {
    const assignments = await assignmentService.getAllAssignments();
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching assignments", details: err });
  }
};

const getById: RequestHandler<IdParams> = async (req, res) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);
    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ error: "Error fetching assignment", details: err });
  }
};

const update: RequestHandler<IdParams> = async (req, res) => {
  try {
    const assignment = await assignmentService.updateAssignment(
      req.params.id,
      req.body
    );
    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ error: "Error updating assignment", details: err });
  }
};

const remove: RequestHandler<IdParams> = async (req, res) => {
  try {
    const assignment = await assignmentService.deleteAssignment(req.params.id);
    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ error: "Error deleting assignment", details: err });
  }
};

const softDelete: RequestHandler<IdParams> = async (req, res) => {
  try {
    const assignment = await assignmentService.softDeleteAssignment(req.params.id);
    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ error: "Error soft deleting assignment", details: err });
  }
}

const getActiveAssignments: RequestHandler = async (_req, res) => {
  try {
    const assignments = await assignmentService.getActiveAssignments();
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching active assignments", details: err });
  }
};

const restore: RequestHandler<IdParams> = async (req, res) => {
  try {
    const assignment = await assignmentService.restoreAssignment(req.params.id);
    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ error: "Error restoring assignment", details: err });
  }
};


export default {
  create,
  getAll,
  getById,
  update,
  remove,
  softDelete,
  getActiveAssignments,
  restore,
};