export interface UserModel {
  id: number;
  email: string;
  name: string;
  profilepicture: string;
  location: string;
  createdat: string;
}

export interface UsersState {
  loading: boolean;
  items: UserModel[];
  errors?: string;
}

export interface AuthenticatedUser {
  Id: number;
  Email: string;
  Name: string;
  Roles: string[];
  Token: string;
}

export interface UsersFetchInput {
  page: number;
}

export interface UsersResponse {
  data: UserModel[];
}
