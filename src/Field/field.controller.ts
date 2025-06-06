import { RequestHandler } from 'express';
import * as fieldService from './Field.services';

type IdParams = { id: string };

const create: RequestHandler = async (req, res) => {
  try {
    const field = await fieldService.createField(req.body);
    res.status(201).json(field);
  } catch (err) {
    res.status(500).json({ error: 'Error creating field', details: err });
  }
};

const getAll: RequestHandler = async (_req, res) => {
  try {
    const fields = await fieldService.getAllFields();
    res.status(200).json(fields);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching fields', details: err });
  }
};

const getActive: RequestHandler = async (_req, res) => {
  try {
    const fields = await fieldService.getActiveFields();
    res.status(200).json(fields);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching active fields', details: err });
  }
};

const getById: RequestHandler<IdParams> = async (req, res) => {
  try {
    const field = await fieldService.getFieldById(req.params.id);
    if (!field) {
      res.status(404).json({ error: 'Field not found' });
      return;
    }
    res.status(200).json(field);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching field', details: err });
  }
};

const update: RequestHandler<IdParams> = async (req, res) => {
  try {
    const field = await fieldService.updateField(req.params.id, req.body);
    if (!field) {
      res.status(404).json({ error: 'Field not found' });
      return;
    }
    res.status(200).json(field);
  } catch (err) {
    res.status(500).json({ error: 'Error updating field', details: err });
  }
};

const remove: RequestHandler<IdParams> = async (req, res) => {
  try {
    const field = await fieldService.deleteField(req.params.id);
    if (!field) {
      res.status(404).json({ error: 'Field not found' });
      return;
    }
    res.status(200).json(field);
  } catch (err) {
    res.status(500).json({ error: 'Error deleting field', details: err });
  }
};

const softDelete: RequestHandler<IdParams> = async (req, res) => {
  try {
    const field = await fieldService.softDeleteField(req.params.id);
    if (!field) {
      res.status(404).json({ error: 'Field not found' });
      return;
    }
    res.status(200).json(field);
  } catch (err) {
    res.status(500).json({ error: 'Error soft deleting field', details: err });
  }
};

const restore: RequestHandler<IdParams> = async (req, res) => {
  try {
    const field = await fieldService.restoreField(req.params.id);
    if (!field) {
      res.status(404).json({ error: 'Field not found or not deleted' });
      return;
    }
    res.status(200).json(field);
  } catch (err) {
    res.status(500).json({ error: 'Error restoring field', details: err });
  }
};

export default {
  create,
  getAll,
  getActive,
  getById,
  update,
  remove,
  softDelete,
  restore,
};

