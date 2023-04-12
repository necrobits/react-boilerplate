import { useInfiniteQuery, UseInfiniteQueryOptions, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ErrorResponse, RequestResponse } from '~/services';
import { TQueryKey } from './types';

export function useAutoLoadInfinite<T, Input>(
    serviceFunc: (input?: Input) => Promise<RequestResponse<T>>,
    key: string,
    params?: Input,
    config?: UseInfiniteQueryOptions<RequestResponse<T>, ErrorResponse, RequestResponse<T>>
) {
    const [fetching, setFetching] = useState(config?.enabled != undefined ? config.enabled : true);
    const queryClient = useQueryClient();

    let onError;
    if (config) {
        onError = config.onError;
        delete config['onError'];
    } else {
        config = {};
    }

    useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: [key, params as unknown as object] });
        };
    }, []);

    const { fetchNextPage, hasNextPage, isFetchingNextPage, remove, ...rest } = useInfiniteQuery<RequestResponse<T>, Error, RequestResponse<T>, TQueryKey>(
        [key, params as unknown as object],
        ({ pageParam = 1, signal }) => {
            return serviceFunc({ ...params, page: pageParam, signal } as Input);
        },
        {
            ...config,
            onError: e => {
                if (onError) {
                    onError(e);
                }
                setFetching(false);
            },
            structuralSharing: false,
            getPreviousPageParam: firstPage => firstPage.previousId ?? undefined,
            getNextPageParam: lastPage => {
                return lastPage.nextId ?? undefined;
            }
        }
    );
    useEffect(() => {
        if (!isFetchingNextPage && hasNextPage != undefined) {
            if (hasNextPage) {
                setFetching(true);
                fetchNextPage();
            } else {
                setFetching(false);
            }
        }
    }, [isFetchingNextPage, hasNextPage]);

    return { fetchNextPage, hasNextPage, isFetchingNextPage, fetching, ...rest };
}
