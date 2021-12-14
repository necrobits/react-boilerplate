import { put, call, takeLatest, cancel } from 'redux-saga/effects';

import httpService from '~/services/httpService';
import { REQUEST, SagaAction } from '~/actions';
import { LStorage } from '~/storage/storage';
import { AUTH_TOKEN } from '~/constants/storage';
import { AuthenticatedUser } from '~/models/user.model';
import { AuthSignInInput, AuthSignUpInput } from '~/models/auth.model';
import {
  AUTH_LOGIN_TYPES,
  AUTH_REGISTER_TYPES,
  authLoginActions,
  authRegisterActions
} from '~/features/auth/auth.action';

export function* login(props: SagaAction<AuthSignInInput>) {
  const { email, password } = props.payload;
  try {
    const res: AuthenticatedUser = yield call(
      httpService.post.bind(httpService),
      '/authaccount/login',
      {
        data: { email, password }
      }
    );
    if (res) {
      yield call(storeToken, res.Token);
      yield put(authLoginActions.success(res));
    }
  } catch (error) {
    yield put(authLoginActions.failure(error as string));
  }
}

export function* signup(props: SagaAction<AuthSignUpInput>) {
  if (!props.payload) yield cancel();
  const { name, email, password } = props.payload;
  try {
    const res: AuthenticatedUser = yield call(
      httpService.post.bind(httpService),
      '/authaccount/registration',
      {
        data: { name, email, password }
      }
    );
    if (res) {
      yield call(storeToken, res.Token);
      yield put(authRegisterActions.success(res));
    }
  } catch (error) {
    yield put(authRegisterActions.failure(error as string));
  }
}

function storeToken(token: string) {
  LStorage.setItem(AUTH_TOKEN, token);
}

export default [
  takeLatest(AUTH_LOGIN_TYPES[REQUEST], login),
  takeLatest(AUTH_REGISTER_TYPES[REQUEST], signup)
];
