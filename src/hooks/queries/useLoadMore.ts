import { useInfiniteQuery, UseInfiniteQueryOptions, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ErrorResponse, RequestResponse } from '~/services';
import { TQueryKey } from './types';

export function useLoadMore<T, Input>(
    serviceFunc: (input?: Input) => Promise<RequestResponse<T>>,
    key: string,
    params?: Input,
    config?: UseInfiniteQueryOptions<RequestResponse<T>, ErrorResponse, RequestResponse<T>>
) {
    const queryClient = useQueryClient();
    const [itemCount, setItemCount] = useState<number>(Number.MAX_SAFE_INTEGER);

    const { hasNextPage, fetchNextPage, data, ...others } = useInfiniteQuery<RequestResponse<T>, Error, RequestResponse<T>, TQueryKey>(
        [key, params as unknown as object],
        ({ pageParam = 1, signal }) => {
            return serviceFunc({ ...params, page: pageParam, signal } as Input);
        },
        {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            ...config,
            structuralSharing: false,
            getPreviousPageParam: firstPage => firstPage.previousId ?? undefined,
            getNextPageParam: lastPage => {
                return lastPage.nextId ?? undefined;
            }
        }
    );
    const loadMoreItems = (startIndex: number, stopIndex: number): Promise<void> => {
        if (stopIndex >= itemCount || !hasNextPage) {
            return;
        }
        fetchNextPage();
        return;
    };

    React.useEffect(() => {
        if (data && data.pages) {
            const pages = data.pages;
            const lastFetchData = pages[pages.length - 1];
            setItemCount(lastFetchData.total);
        }
    }, [data]);

    React.useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: [key, params as unknown as object] });
        };
    }, []);

    return { data, hasNextPage, fetchNextPage, loadMoreItems, itemCount, ...others };
}
