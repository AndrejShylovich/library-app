export type UserType = 'ADMIN' | 'EMPLOYEE' | 'PATRON';

export interface IUser {
  type: UserType;

  firstName: string;

  lastName: string;

  email: string;

  password: string;
}
