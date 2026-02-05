import type { DomainLoanRecord } from "./LoanRecord";
import type { DomainUser } from "./User";

export interface DomainBook {
  id: string; 
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: Date;
  publisher: string;
  pages: number;
  genre: string;
  records: DomainLoanRecord[]; 
}

export interface DomainCheckoutBookPayload {
  book: DomainBook;  
  libraryCard: string;
  employee: DomainUser;
}

export interface DomainCheckinBookPayload {
  book: DomainBook;
  employee: DomainUser;
}