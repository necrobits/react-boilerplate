import { AuthenticatedUser } from '~/models/user';

export interface AuthState {
  loading: boolean;
  user: AuthenticatedUser | null;
  errors?: string;
  isLoggedIn: boolean;
}
