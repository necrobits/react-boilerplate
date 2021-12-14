import { createSelector } from 'reselect';
import AppState from '~/models/app.model';

export const isLoadingUsers = createSelector(
  (state: AppState) => state.users,
  users => users.loading
);

export const getUsers = createSelector(
  (state: AppState) => state.users,
  users => users.items
);
export const getUsersErrors = createSelector(
  (state: AppState) => state.users,
  users => users.errors
);
