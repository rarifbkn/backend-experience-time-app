import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class Field {
  @prop({ required: true })
  public name?: string;
}

const FieldModel = getModelForClass(Field);
