import { UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from '~/services';
import { TQueryKey } from './types';
import { useGenericMutation } from './useGenericMutation';

export function useApi<Res, Input>(
    serviceFunc: (input?: Input) => Promise<Res>,
    key: TQueryKey,
    params?: Input,
    updater?: (oldData: Res, newData: Res) => Res,
    config?: UseMutationOptions<Res, ErrorResponse, Input, unknown>
) {
    return useGenericMutation<Res, Input>(serviceFunc, key, params, updater, config);
}
