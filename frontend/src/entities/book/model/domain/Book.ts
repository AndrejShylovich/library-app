import type { DomainLoanRecord } from "../../../loan-record/model/domain/LoanRecord";
import type { DomainUser } from "../../../user/model/domain/User";

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
