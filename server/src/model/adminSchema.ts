import { Schema, model } from "mongoose";
import { UserEntity } from "../entity/userEntity";

const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export const Admin = model("User", AdminSchema);
