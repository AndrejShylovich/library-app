export interface UserDto {
  _id: string;
  type: "ADMIN" | "EMPLOYEE" | "PATRON";
  firstName: string;
  lastName: string;
  email: string;
  password?: string; 
}

export interface LoginUserDto {  
  email: string;
  password: string;
}

export interface RegisterUserDto {  
  type: 'ADMIN' | 'EMPLOYEE' | 'PATRON';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface FetchUserDto {  
  userId: string;  
  property: 'loggedInUser' | 'profileUser';
}

