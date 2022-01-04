export interface User {
  id: number;
  email: string;
  name: string;
  profilepicture: string;
  location: string;
  createdat: string;
}

export interface UsersState {
  loading: boolean;
  items: User[];
  errors?: string;
}

export interface AuthenticatedUser {
  Id: number;
  Email: string;
  Name: string;
  Roles: string[];
  Token: string;
}
