import { LStorage } from '~/storage';
import { AUTH_TOKEN } from '~/constants';
import { AuthenticatedUser } from '~/models/user';
import go from '~/app/gobits';
import { AuthResponse, AuthSignInInput, AuthSignUpInput } from '~/services';

export async function login(opts: AuthSignInInput): Promise<AuthenticatedUser> {
  return new Promise<AuthenticatedUser>((resolve, reject) => {
    go.post<AuthResponse>('/authaccount/login', { body: { ...opts } }).then(res => {
      const body = res.body;

      if (body?.data != null) {
        console.log(' OK', body.data);
        resolve(body.data);
      }
      console.log('NOT OK');
      reject(res.body?.message);
    });
  });
}

export async function register(opts: AuthSignUpInput): Promise<AuthenticatedUser> {
  return new Promise<AuthenticatedUser>((resolve, reject) => {
    go.post<AuthResponse>('/authaccount/registration', { body: { ...opts } }).then(
      res => {
        // return res.body?.data;
        const body = res.body;

        if (body?.data != null) {
          console.log(' OK', body.data);
          resolve(body.data);
        }
        console.log('NOT OK');
        reject(res.body?.message);
      }
    );
  });
}

export async function getUserProfile(): Promise<AuthenticatedUser | undefined> {
  // return await go.get<AuthResponse>('/auth/me').then(res => res.body?.data);\
  return undefined;
}

function handleUserResponse(user: AuthenticatedUser) {
  if (user) {
    LStorage.setItem(AUTH_TOKEN, user.Token);
  }
  return user;
}

export async function loadUser(): Promise<AuthenticatedUser | undefined> {
  let user = undefined;
  if (LStorage.getItem(AUTH_TOKEN)) {
    user = await getUserProfile();
  }
  return user;
}

export async function loginFn(data: AuthSignInInput): Promise<AuthenticatedUser> {
  const user = await login(data);
  await handleUserResponse(user);
  return user;
}

export async function registerFn(data: AuthSignUpInput): Promise<AuthenticatedUser> {
  const user = await register(data);
  await handleUserResponse(user);
  return user;
}

export async function logoutFn() {
  await LStorage.removeItem(AUTH_TOKEN);
}
