import { useApi } from '~/hooks';
import { AuthSignUpInput, AuthSvc, ErrorResponse } from '~/services';
import { UseMutationOptions } from '@tanstack/react-query';
import { User } from '~/models';

export const useRegister = (config?: UseMutationOptions<User, ErrorResponse, AuthSignUpInput>) => {
    return useApi<User, AuthSignUpInput>(AuthSvc.register, ['register'], null, null, config);
};
