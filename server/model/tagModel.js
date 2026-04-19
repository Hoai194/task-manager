import { Schema, model, Types } from "mongoose";

const tagSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    name:    { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default model("Tag", tagSchema);