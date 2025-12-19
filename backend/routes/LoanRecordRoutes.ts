import { Router } from 'express';
import LoanRecordController from '../controllers/LoanRecordController';
import { ValidateSchema, Schemas } from '../middlewares/Validation';

const router = Router();

// Получение всех записей о выдаче книг
router.get('/', LoanRecordController.getAllRecords);

// Создание новой записи
router.post(
  '/',
  ValidateSchema(Schemas.loan.create, 'body'),
  LoanRecordController.createRecord
);

// Обновление существующей записи
router.put(
  '/',
  ValidateSchema(Schemas.loan.update, 'body'),
  LoanRecordController.updateRecord
);

// Поиск записей по определённым свойствам
router.post(
  '/query',
  ValidateSchema(Schemas.loan.query, 'body'),
  LoanRecordController.getRecordsByProperty
);

export default router;
