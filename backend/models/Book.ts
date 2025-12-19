import { ILoanRecord } from "./LoanRecord";

export interface IBook {
  // Уникальный штрихкод книги
  barcode: string;

  // URL обложки книги
  cover: string;

  // Название книги
  title: string;

  // Список авторов
  authors: string[];

  // Описание книги
  description: string;

  // Тематики книги
  subjects: string[];

  // Дата публикации
  publicationDate: Date;

  // Издательство
  publisher: string;

  // Количество страниц
  pages: number;

  // Жанр книги
  genre: string;

  // Записи о выдаче книги
  records: ILoanRecord[];
}
