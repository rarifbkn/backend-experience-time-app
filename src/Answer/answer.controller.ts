import { RequestHandler } from  "express";
import * as answerService from "./Answer.services";

type IdParams = { id: string };

const create: RequestHandler = async (req, res) => {
  try {
    const answer = await answerService.createAnswer(req.body);
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ error: "Error creating answer", details: err });
  }
}

const getAll: RequestHandler = async (_req, res) => {
  try {
    const answers = await answerService.getAllAnswers();
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching answers", details: err });
  }
};

const getById: RequestHandler<IdParams> = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id);
    if (!answer) {
      res.status(404).json({ error: "Answer not found" });
      return;
    }
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: "Error fetching answer", details: err });
  }
};

const getActive: RequestHandler = async (_req, res) => {
  try {
    const answers = await answerService.getActiveAnswers();
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching active answers", details: err });
  }
}

const update: RequestHandler<IdParams> = async (req, res) => {
  try {
    const answer = await answerService.updateAnswer(
      req.params.id,
      req.body
    );
    if (!answer) {
      res.status(404).json({ error: "Answer not found" });
      return;
    }
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: "Error updating answer", details: err });
  }
};

const remove: RequestHandler<IdParams> = async (req, res) => {
  try {
    const answer = await answerService.deleteAnswer(req.params.id);
    if (!answer) {
      res.status(404).json({ error: "Answer not found" });
      return;
    }
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: "Error deleting answer", details: err });
  }
};

const softDelete: RequestHandler<IdParams> = async (req, res) => {
  try {
    const answer = await answerService.softDeleteAnswer(req.params.id);
    if (!answer) {
      res.status(404).json({ error: "Answer not found" });
      return;
    }
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: "Error soft deleting answer", details: err });
  }
}

const restore: RequestHandler<IdParams> = async (req, res) => {
  try {
    const answer = await answerService.restoreAnswer(req.params.id);
    if (!answer) {
      res.status(404).json({ error: "Answer not found" });
      return;
    }
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: "Error restoring answer", details: err });
  }
};

export default {
  create,
  getAll,
  getById,
  getActive,
  update,
  remove,
  softDelete,
  restore
};