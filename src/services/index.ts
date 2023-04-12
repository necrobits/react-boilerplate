export * from './user';
export * from './auth';

export type NameParams = {
    name?: string;
};

export type PaginationParams = {
    page?: number;
    pageSize?: number;
};

export type SortFilterParams = {
    sortBy?: string;
    filterBy?: string;
};

export type BaseTableFilterParams = PaginationParams & SortFilterParams;

export type BaseFilterParams = {
    signal?: AbortSignal;
} & NameParams &
    PaginationParams &
    SortFilterParams;

export class ErrorResponse {
    readonly statusCode?: number;
    readonly message?: string;
    readonly details?: Record<string, string>;

    constructor(error?: Partial<ErrorResponse>) {
        this.statusCode = error?.statusCode;
        this.message = error?.message;
        this.details = error?.details;
    }
}

export interface RequestResponse<T> {
    nextId?: number;
    previousId?: number;
    total: number;
    results: T[];
}

export interface MessageResponse {
    responseCode?: string;
    message: string;
}
