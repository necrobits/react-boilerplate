export enum SortDirection {
    ASCEND = 'ascend',
    DESCEND = 'descend'
}

export type SortOrderType = SortDirection.ASCEND | SortDirection.DESCEND | boolean;

export type SortByOrder = {
    [key: string]: SortOrderType;
};
