// Интерфейс пагинации для любых коллекций
export interface IPagination<T> {
  // Общее количество элементов во всей коллекции
  totalCount: number;

  // Текущая страница
  currentPage: number;

  // Общее количество страниц
  totalPages: number;

  // Лимит элементов на страницу
  limit: number;

  // Количество элементов на текущей странице
  pageCount: number;

  // Список элементов текущей страницы
  items: T[];
}
