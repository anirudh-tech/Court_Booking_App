import { Schema, model } from "mongoose";
import { UserEntity } from "../entity/userEntity";

const UserSchema = new Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = ;
