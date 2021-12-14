import { AuthenticatedUser } from '~/models/user.model';
import { action, createApiActions, createApiTypes } from '~/actions';
import { AuthSignInInput, AuthSignUpInput } from '~/models/auth.model';

export const AUTH_LOGIN_TYPES = createApiTypes('auth', 'login');
export const AUTH_REGISTER_TYPES = createApiTypes('auth', 'register');
export const AUTH_LOGOUT_TYPE = 'auth/logout';

export const authLoginActions = createApiActions<AuthenticatedUser, AuthSignInInput>(
  AUTH_LOGIN_TYPES
);

export const authRegisterActions = createApiActions<AuthenticatedUser, AuthSignUpInput>(
  AUTH_REGISTER_TYPES
);

export const authLogoutAction = () => action(AUTH_LOGOUT_TYPE);
