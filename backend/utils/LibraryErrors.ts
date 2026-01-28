export class LibraryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; 
    Error.captureStackTrace(this, this.constructor); 
  }
}

export class UnableToSaveUserError extends LibraryError {}
export class InvalidUsernameOrPasswordError extends LibraryError {}
export class UserDoesNotExistError extends LibraryError {}

export class BookDoesNotExistError extends LibraryError {}
export class LibraryCardDoesNotExistError extends LibraryError {}
export class LoanRecordDoesNotExistError extends LibraryError {}

export class EmailAlreadyExistsError extends LibraryError {}
