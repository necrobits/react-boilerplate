import { InfiniteData } from '@tanstack/react-query';
import _ from 'lodash';
import { RequestResponse } from '~/services';

export function getResultsFromInfiniteFetch<T>(data: InfiniteData<RequestResponse<T>> | undefined): T[] {
    if (!data) {
        return [];
    }
    return _.flatten(
        data.pages.map(page => {
            return page.results;
        })
    );
}
