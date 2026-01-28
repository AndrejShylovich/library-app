import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { IUser } from "../models/User";
import { IUserModel } from "../daos/UserDao";
import { IBook } from "../models/Book";
import { IBookModel } from "../daos/BookDao";
import { ILibraryCard } from "../models/LibraryCard";
import { ILoanRecord } from "../models/LoanRecord";
import { ILoanRecordModel } from "../daos/LoanRecordDao";

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const barcodeRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

export function ValidateSchema(schema: ObjectSchema, property: keyof Request) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req[property]);

      next();
    } catch (error) {
      next(error);
    }
  };
}

const userBase = {
  type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().required(),
};

const idField = { _id: Joi.string().regex(objectIdRegex).required() };
const userIdField = { userId: Joi.string().regex(objectIdRegex).required() };
const libraryCardIdField = { cardId: Joi.string().regex(objectIdRegex).required() };
const itemIdField = { item: Joi.string().regex(objectIdRegex).required() };
const employeeIdField = { employeeOut: Joi.string().regex(objectIdRegex).required(), employeeIn: Joi.string().regex(objectIdRegex) };
const patronIdField = { patron: Joi.string().regex(objectIdRegex).required() };
const barcodeField = { barcode: Joi.string().regex(barcodeRegex).required() };

export const Schemas = {
  user: {
    create: Joi.object<IUser>(userBase),
    login: Joi.object<{ email: string; password: string }>({
      email: Joi.string().regex(emailRegex).required(),
      password: Joi.string().required(),
    }),
    userId: Joi.object(userIdField),
    update: Joi.object<IUserModel>({
      ...idField,
      ...userBase,
    }).unknown(true),
  },

  book: {
    create: Joi.object<IBook>({
      ...barcodeField,
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required(),
    }),
    update: Joi.object<IBookModel>({ ...idField, ...{
      ...barcodeField,
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required(),
    }}),
    delete: Joi.object(barcodeField),
  },

  libraryCard: {
    create: Joi.object<ILibraryCard>({ user: Joi.string().regex(objectIdRegex).required() }),
    get: Joi.object(libraryCardIdField),
  },

  loan: {
    create: Joi.object<ILoanRecord>({
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      
      ...patronIdField,
      ...employeeIdField,
      ...itemIdField,
    }),
    update: Joi.object<ILoanRecordModel>({
      ...idField,
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      ...patronIdField,
      ...employeeIdField,
      ...itemIdField,
    }).unknown(true),
    query: Joi.object<{ property: string; value: string | Date }>({
      property: Joi.string().valid(
        "_id",
        "status",
        "loanedDate",
        "dueDate",
        "returnedDate",
        "patron",
        "employeeOut",
        "employeeIn",
        "item"
      ).required(),
      value: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    }),
  },
};
