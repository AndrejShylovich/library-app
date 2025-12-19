// Типы пользователей
export type UserType = 'ADMIN' | 'EMPLOYEE' | 'PATRON';

// Интерфейс пользователя
export interface IUser {
  // Роль пользователя
  type: UserType;

  // Имя пользователя
  firstName: string;

  // Фамилия пользователя
  lastName: string;

  // Email пользователя (уникальный)
  email: string;

  // Пароль пользователя
  password: string;
}
