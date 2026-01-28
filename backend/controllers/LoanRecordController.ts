import { Request, Response } from "express";
import {
  findAllRecords,
  generateRecord,
  modifyRecord,
  queryRecords,
} from "../services/LoanRecordService";
import { LoanRecordDoesNotExistError } from "../utils/LibraryErrors";

function handleError(res: Response, error: any, notFoundMessage: string) {
  if (error instanceof LoanRecordDoesNotExistError) {
    return res.status(404).json({
      message: notFoundMessage,
      error: error.message,
    });
  }

  return res.status(500).json({
    message: error.message || "Internal server error",
  });
}

export async function createRecord(req: Request, res: Response) {
  const record = req.body;

  try {
    const createdRecord = await generateRecord(record);
    res.status(201).json({
      message: "New record generated",
      record: createdRecord,
    });
  } catch (error) {
    handleError(res, error, "Unable to create record");
  }
}

export async function updateRecord(req: Request, res: Response) {
  const record = req.body;

  try {
    const updatedRecord = await modifyRecord(record);
    res.status(200).json({
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    handleError(res, error, "Unable to modify record");
  }
}

export async function getAllRecords(req: Request, res: Response) {
  try {
    const records = await findAllRecords();
    res.status(200).json({
      message: "Retrieved all records",
      records,
    });
  } catch (error) {
    handleError(res, error, "Unable to retrieve records at this time");
  }
}

export async function getRecordsByProperty(req: Request, res: Response) {
  const param = req.body;

  try {
    const records = await queryRecords(param);
    res.status(200).json({
      message: "Retrieved records from your query",
      records,
    });
  } catch (error) {
    handleError(res, error, "Unable to retrieve records at this time");
  }
}

export default {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordsByProperty,
};
