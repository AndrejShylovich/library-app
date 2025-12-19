import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from '../models/User';

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema<IUserModel>(
  {
    type: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User: Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);
export default User;
