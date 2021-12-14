import { put, call, all } from 'redux-saga/effects';
import { ApiAction } from '~/actions';
import httpService from '~/services/httpService';
import auth from '~/features/auth/auth.saga';
import users from '~/features/users/users.saga';

import { IConfig } from '~/services/httpInstance';

export interface RequestInput {
  url: string;
  opts: IConfig;
}

// reusable fetch Subroutine
// entity :  user | repo | starred | stargazers
// action  : RequestInput
export function* fetchEntity<T, N>(entity: ApiAction<T, N>, input: RequestInput) {
  const { url, opts } = input;
  try {
    const response: T = yield call(httpService.get.bind(httpService), url, opts);
    if (response) {
      yield put(entity.success(response));
    }
  } catch (e) {
    yield put(entity.failure(e as string));
  }
}

export default function* rootSaga() {
  yield all([...auth, ...users]);
}
