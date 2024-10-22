import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  fullName: string;
  email: string;
  password: string;
  role: "teacher" | "student";
  ethereumAddress?: string; // Added ethereumAddress as an optional field
}

const UserSchema: Schema<User> = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    required: [true, "Role is required"],
  },
  ethereumAddress: {
    type: String,
    unique: true,
    sparse: true, // This allows the field to be optional while still maintaining uniqueness
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;