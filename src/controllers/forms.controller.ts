import { RequestHandler } from 'express';
import * as formService from '../services/Forms.services';

type IdParams = { id: string };
type TokenParams = { token: string };

const create: RequestHandler = async (req, res) => {
  try {
    const form = await formService.createForm(req.body);
    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ error: 'Error creating form', details: err });
  }
};

const getAll: RequestHandler = async (_req, res) => {
  try {
    const forms = await formService.getAllForms();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching forms', details: err });
  }
};

const getById: RequestHandler<IdParams> = async (req, res) => {
  try {
    const form = await formService.getFormById(req.params.id);
    if (!form) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching form', details: err });
  }
};

const getByToken: RequestHandler<TokenParams> = async (req, res) => {
  try {
    const form = await formService.getFormByToken(req.params.token);
    if (!form) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching form by token', details: err });
  }
};

const update: RequestHandler<IdParams> = async (req, res) => {
  try {
    const form = await formService.updateForm(req.params.id, req.body);
    if (!form) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ error: 'Error updating form', details: err });
  }
};

const softDelete: RequestHandler<IdParams> = async (req, res) => {
  try {
    const form = await formService.deleteForm(req.params.id);
    if (!form) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }
    res.status(200).json({ message: 'Form soft deleted', form });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting form', details: err });
  }
};

const restore: RequestHandler<IdParams> = async (req, res) => {
  try {
    const form = await formService.restoreForm(req.params.id);
    if (!form) {
      res.status(404).json({ error: 'Form not found' });
      return;
    }
    res.status(200).json({ message: 'Form restored', form });
  } catch (err) {
    res.status(500).json({ error: 'Error restoring form', details: err });
  }
};

// const getDeleted: RequestHandler = async (_req, res) => {
//   try {
//     const forms = await formService.getDeletedForms();
//     res.status(200).json(forms);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching deleted forms', details: err });
//   }
// };

export default {
  create,
  getAll,
  getById,
  getByToken,
  update,
  softDelete,
  restore,
  // getDeleted,
};
