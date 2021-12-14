import { AuthenticatedUser } from '~/models/user.model';

export interface AuthState {
  loading: boolean;
  user: AuthenticatedUser | null;
  errors?: string;
  isLoggedIn: boolean;
}

export interface AuthSignInInput {
  email: string;
  password: string;
}

export interface AuthSignUpInput {
  name: string;
  email: string;
  password: string;
}
