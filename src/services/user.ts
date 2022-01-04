import { User } from '~/models/user';
import go from '~/app/gobits';

export interface UsersFetchInput {
  page: number;
}

export interface UsersResponse {
  data: User[];
}

export const fetchUsers = (opts: UsersFetchInput) => {
  return go.get('/users', { query: { ...opts } }).then(res => {
    return res.body.data;
  });
};
