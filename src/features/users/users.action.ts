import { createApiActions, createApiTypes } from '~/actions';
import { UsersFetchInput, UsersResponse } from '~/models/user.model';

export const USERS_TYPES = createApiTypes('users', 'fetch');

export const usersFetchActions = createApiActions<UsersResponse, UsersFetchInput>(
  USERS_TYPES
);
