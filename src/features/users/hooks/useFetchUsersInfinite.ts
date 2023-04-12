import { useAutoLoadInfinite } from '~/hooks';
import { ErrorResponse, RequestResponse, UsersFetchInput, UserSvc } from '~/services';
import { User } from '~/models';
import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { DEFAULT_AUTO_LOAD_PAGE_SIZE } from '~/constants';

export const useFetchUsersInfinite = (params?: Omit<UsersFetchInput, 'page'>, config?: UseInfiniteQueryOptions<RequestResponse<User>, ErrorResponse>) => {
    let opts: Omit<UsersFetchInput, 'page'> = {
        pageSize: DEFAULT_AUTO_LOAD_PAGE_SIZE
    };
    if (params) {
        opts = { ...opts, ...params };
    }
    return useAutoLoadInfinite<User, UsersFetchInput>(UserSvc.fetchUsers, 'users', opts, { ...config });
};
