import { call, takeEvery } from 'redux-saga/effects';

import { REQUEST, SagaAction } from '~/actions';
import { UsersFetchInput } from '~/models/user.model';

import { fetchEntity } from '~/app/saga';
import { USERS_TYPES, usersFetchActions } from '~/features/users/users.action';

export const fetchUsers = function* (props: SagaAction<UsersFetchInput>) {
  const request = fetchEntity.bind(null, usersFetchActions);
  yield call(request, {
    url: '/users',
    opts: {
      params: { ...props.payload }
    }
  });
};

export default [takeEvery(USERS_TYPES[REQUEST], fetchUsers)];
