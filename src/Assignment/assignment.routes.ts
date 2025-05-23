import { Router } from "express";
import assignmentController from "./assignment.controller";

const router = Router();
router.post("/", assignmentController.create);
router.get("/", assignmentController.getAll);
router.get("/:id", assignmentController.getById);
router.put("/:id", assignmentController.update);
router.delete("/:id", assignmentController.remove);

export default router;