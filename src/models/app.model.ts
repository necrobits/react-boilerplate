import { AuthState } from '~/models/auth.model';
import { UsersState } from '~/models/user.model';

export default interface AppState {
  users: UsersState;
  auth: AuthState;
}
