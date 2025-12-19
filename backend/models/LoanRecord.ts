// Интерфейс записи о выдаче книги
export interface ILoanRecord {
  // Статус книги: доступна или выдана
  status: 'AVAILABLE' | 'LOANED';

  // Дата выдачи книги
  loanedDate: Date;

  // Срок возврата книги
  dueDate: Date;

  // Дата фактического возврата (опционально)
  returnedDate?: Date;

  // ID пользователя, который взял книгу
  patron: string;

  // ID сотрудника, выдавшего книгу
  employeeOut: string;

  // ID сотрудника, принявшего возвращённую книгу (опционально)
  employeeIn?: string;

  // ID книги или экземпляра
  item: string;
}
