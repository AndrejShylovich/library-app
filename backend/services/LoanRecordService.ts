import LoanRecordDao, { ILoanRecordModel } from "../daos/LoanRecordDao";
import { findBookById, modifyBook } from "./BookService";
import { ILoanRecord } from "../models/LoanRecord";
import { LoanRecordDoesNotExistError } from "../utils/LibraryErrors";

export async function generateRecord(
  record: ILoanRecord
): Promise<ILoanRecordModel> {
  try {
    const createdRecord = await LoanRecordDao.create(record);

    const book = await findBookById(record.item);

    // добавляем новую запись в начало массива
    book.records.unshift(createdRecord as any);
    await modifyBook(book);

    return createdRecord;
  } catch (error) {
    throw error;
  }
}

export async function modifyRecord(
  record: ILoanRecordModel
): Promise<ILoanRecordModel> {
  try {
    const updatedRecord = await LoanRecordDao.findByIdAndUpdate(
      record._id,
      record,
      { new: true }
    );

    if (!updatedRecord) {
      throw new LoanRecordDoesNotExistError("The record does not exist");
    }

    const book = await findBookById(String(record.item));

    const index = book.records.findIndex(
      (r: any) => String(r._id) === String(updatedRecord._id)
    );

    if (index !== -1) {
      book.records[index] = updatedRecord as any;
      await modifyBook(book);
    }

    return updatedRecord;
  } catch (error) {
    throw error;
  }
}

export async function findAllRecords(): Promise<ILoanRecordModel[]> {
  try {
    const records = await LoanRecordDao.find().populate("item");
    return records;
  } catch (error) {
    throw error;
  }
}

export async function queryRecords(params: {
  property: string;
  value: string | Date;
}): Promise<ILoanRecordModel[]> {
  try {
    const records = await LoanRecordDao.find({
      [params.property]: params.value,
    })
      .populate("item")
      .sort({ loanedDate: -1 });

    return records;
  } catch (error) {
    throw error;
  }
}
