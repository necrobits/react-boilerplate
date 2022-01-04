import { put, call, all } from 'redux-saga/effects';
import { ApiAction } from '~/actions';

import go from '~/app/gobits';

export interface RequestInput {
  url: string;
  opts: any;
}

export function* fetchEntity<T, N>(entity: ApiAction<T, N>, input: RequestInput) {
  const { url, opts } = input;
  try {
    const response: T = yield call(go.get.bind(go), url, opts);
    if (response) {
      yield put(entity.success(response));
    }
  } catch (e) {
    yield put(entity.failure(e as string));
  }
}

export default function* rootSaga() {
  yield all([]);
}
