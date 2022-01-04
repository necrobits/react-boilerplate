import { AuthenticatedUser } from '~/models/user';

export interface AuthSignInInput {
  email: string;
  password: string;
}

export interface AuthSignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  code: number;
  message: any;
  data: AuthenticatedUser | undefined;
}
