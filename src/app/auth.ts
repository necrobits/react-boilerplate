import { loginFn, logoutFn, registerFn, loadUser } from '~/services';
import { AuthProviderConfig, initReactQueryAuth } from '~/context';

const authConfig: AuthProviderConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn
};

const { AuthProvider, AuthConsumer, useAuth } = initReactQueryAuth(authConfig);

export { AuthProvider, AuthConsumer, useAuth };
