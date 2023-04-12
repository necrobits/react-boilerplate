import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { TQueryKey } from '~/hooks/queries/types';

import { ErrorResponse } from '~/services';

export function useGenericMutation<Res, Input = unknown>(
    func: (input?: Input) => Promise<Res>,
    key: TQueryKey,
    params?: Input,
    updater?: ((oldData: Res, newData: Res) => Res) | undefined,
    config?: UseMutationOptions<Res, ErrorResponse, Input, unknown>
) {
    const queryClient = useQueryClient();
    let onError, onSettled;
    if (config) {
        onError = config.onError;
        onSettled = config.onSettled;
        delete config['onError'];
        delete config['onSettled'];
    } else {
        config = {};
    }
    const mutationKey = params ? [...key, params] : key;
    return useMutation<Res, ErrorResponse, Input, unknown>({
        retry: false,
        mutationKey,
        mutationFn: (input?: Input) => func(input ? input : params),
        onMutate: async newData => {
            await queryClient.cancelQueries(mutationKey);

            const previousData = queryClient.getQueryData<Res>(mutationKey);

            if (previousData) {
                // Optimistically update to the new value
                queryClient.setQueryData<Res>(mutationKey, oldData => {
                    return updater ? updater(oldData!, newData as unknown as Res) : oldData;
                });
            }

            return previousData;
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (error, variables, context) => {
            queryClient.setQueryData(mutationKey, context);
            if (onError) {
                onError(error, variables, context);
            }
        },
        onSettled: async (data, error, variables, context) => {
            await queryClient.invalidateQueries(mutationKey);
            if (onSettled) {
                onSettled(data, error, variables, context);
            }
        },
        ...config
    });
}
