import { User } from '~/models/user';
import Go from '~/global/gobits';
import { BaseFilterParams, RequestResponse } from '~/services/index';
import autoBind from 'auto-bind';
import { UrlManager } from '~/utils';

export type UsersFetchInput = BaseFilterParams;

export interface UsersResponse {
    data: User[];
}

class UserService {
    constructor() {
        autoBind(this);
    }

    async fetchUsers(opts: UsersFetchInput): Promise<RequestResponse<User>> {
        return Go.get<RequestResponse<User>>('/users', { query: { ...UrlManager.paramsToGoQuery(opts) } }).then(res => {
            return res.body;
        });
    }
}

export const UserSvc = new UserService();
