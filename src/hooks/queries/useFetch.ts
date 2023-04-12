import React from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { TQueryKey } from './types';
import { ErrorResponse } from '~/services';

export function useFetch<Res, Selector = Res>(serviceFunc: () => Promise<Res>, key: TQueryKey, config?: UseQueryOptions<Res, ErrorResponse, Selector, TQueryKey>) {
    const queryClient = useQueryClient();

    if (!config) {
        config = {};
    }

    React.useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: key });
        };
    }, []);
    return useQuery<Res, ErrorResponse, Selector, TQueryKey>(key, () => serviceFunc(), {
        enabled: true,
        retry: 1,
        ...config
    });
}
