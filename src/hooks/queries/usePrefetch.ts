import { useQueryClient } from '@tanstack/react-query';
import { ErrorResponse } from '~/services';
import { TQueryKey } from './types';

export async function usePrefetch<Res, Selector = Res>(func: () => Promise<Res>, key: TQueryKey) {
    const queryClient = useQueryClient();
    return queryClient.prefetchQuery<Res, ErrorResponse, Selector, TQueryKey>(key, () => func());
}
