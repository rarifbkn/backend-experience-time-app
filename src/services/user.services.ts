import { IUser } from "../";
import User from "../models/User.model";

export const createUser = async (
  userData: Omit<IUser, "createdAt" | "updatedAt">
): Promise<IUser> => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error}`);
  }
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(`Error al buscar usuario: ${error}`);
  }
};
