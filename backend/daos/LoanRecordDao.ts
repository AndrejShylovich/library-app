import mongoose, { Document, Schema } from 'mongoose';
import { ILoanRecord } from '../models/LoanRecord';

export interface ILoanRecordModel extends ILoanRecord, Document {}

export const LoanRecordSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['AVAILABLE', 'LOANED', 'RETURNED'],
      trim: true,
    },
    loanedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnedDate: {
      type: Date,
      default: null,
    },
    patron: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    employeeOut: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    employeeIn: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    item: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Book'
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ILoanRecordModel>('LoanRecord', LoanRecordSchema);
