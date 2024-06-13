import { Schema, model } from "mongoose";

const SportSchema = new Schema(
  {
    sportName: {
      type: String,
      required: true,
    },
    court : [{
      type: Schema.Types.ObjectId,
      ref: "Court",
    }]
  },
  {
    timestamps: true,
  }
);

export const Sport = model("Sport", SportSchema);
