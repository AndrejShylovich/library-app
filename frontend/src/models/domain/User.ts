export interface DomainUser {
  id: string;
  type: "ADMIN" | "EMPLOYEE" | "PATRON";
  firstName: string;
  lastName: string;
  email: string;
}

export interface DomainLoginUserPayload {
  email: string;
  password: string;  
}

export interface DomainRegisterUserPayload {
  type: 'ADMIN' | 'EMPLOYEE' | 'PATRON';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface DomainFetchUserPayload {
  userId: string;  
  property: 'loggedInUser' | 'profileUser';
}