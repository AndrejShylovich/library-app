// Интерфейс библиотечной карты
export interface ILibraryCard {
  // ID пользователя, которому принадлежит карта
  user: string;

  // (Опционально) Дата создания карты
  createdAt?: Date;

  // (Опционально) Активна ли карта
  isActive?: boolean;
}
