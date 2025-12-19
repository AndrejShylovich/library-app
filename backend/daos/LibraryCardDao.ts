import mongoose, { Document, Schema, Types } from 'mongoose';
import { ILibraryCard } from '../models/LibraryCard';

export interface ILibraryCardModel extends ILibraryCard, Document {}

const LibraryCardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ILibraryCardModel>('LibraryCard', LibraryCardSchema);