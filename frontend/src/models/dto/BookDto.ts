import type { LoanRecordDto } from "./LoanRecordDto";
import type { UserDto } from "./UserDto";

export interface BookDto {
  _id: string; 
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: string; 
  publisher: string;
  pages: number;
  genre: string;
  records: LoanRecordDto[];
}

export interface CheckoutBookDto {
  book: BookDto;  
  libraryCard: string;
  employee: UserDto;  
}

export interface CheckinBookDto {
  book: BookDto;
  employee: UserDto;
}