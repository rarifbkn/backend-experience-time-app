import { Request, Response } from "express";
import User from "../models/User.model";

export const userController = {
  //createUser
  createUser: async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "El email ya esta registrado" });
    }
  },
};
