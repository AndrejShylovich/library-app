// Базовый класс для всех ошибок библиотеки
export class LibraryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // Автоматически ставим имя класса
    Error.captureStackTrace(this, this.constructor); // Корректный стек вызовов
  }
}

// Пользовательские ошибки
export class UnableToSaveUserError extends LibraryError {}
export class InvalidUsernameOrPasswordError extends LibraryError {}
export class UserDoesNotExistError extends LibraryError {}

// Ошибки библиотеки
export class BookDoesNotExistError extends LibraryError {}
export class LibraryCardDoesNotExistError extends LibraryError {}
export class LoanRecordDoesNotExistError extends LibraryError {}

export class EmailAlreadyExistsError extends LibraryError {}
