import { Router } from 'express';
import BookController from '../controllers/BookController';
import { Schemas, ValidateSchema } from '../middlewares/Validation';

const router = Router();

// Получение всех книг
router.get('/', BookController.getAllBooks);

// Создание книги
router.post(
  '/',
  ValidateSchema(Schemas.book.create, 'body'),
  BookController.createBook
);

// Обновление книги
router.put(
  '/',
  ValidateSchema(Schemas.book.update, 'body'),
  BookController.updateBook
);

// Удаление книги по штрихкоду
router.delete(
  '/:barcode',
  ValidateSchema(Schemas.book.delete, 'params'),
  BookController.deleteBook
);

// Поиск книг по query-параметрам
router.get('/query', BookController.searchForBooksByQuery);

export default router;
