import { createSelector } from 'reselect';
import AppState from '~/models/app.model';

const auth = (state: AppState) => state.auth;
export const isAuthing = createSelector(auth, auth => auth.loading);

export const getAuthenticatedUser = createSelector(auth, auth => auth.user);

export const getAuthErrors = createSelector(
  [auth, (_, isSubmitted: boolean) => isSubmitted],
  (auth, isSubmitted) => (isSubmitted ? auth.errors : undefined)
);

export const isLoggedIn = createSelector(auth, auth => auth.isLoggedIn);
