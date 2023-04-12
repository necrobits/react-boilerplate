import { useApi } from '~/hooks';
import { AuthSignInInput, AuthSvc, ErrorResponse } from '~/services';
import { UseMutationOptions } from '@tanstack/react-query';
import { User } from '~/models';

export const useLogin = (config?: UseMutationOptions<User, ErrorResponse, AuthSignInInput>) => {
    return useApi<User, AuthSignInInput>(AuthSvc.login, ['login'], null, null, config);
};
