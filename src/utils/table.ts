import { Sorter, SortOrder } from '@douyinfe/semi-ui/lib/es/table';
import { SortByOrder, SortDirection } from '~/models';

type TableSortProps = {
    sortOrder: SortOrder;
    sorter: Sorter<number>;
};

export class Table {
    static buildSortOrder(sortBy?: string): SortByOrder {
        if (!sortBy) {
            return undefined;
        }
        const matcher = sortBy.match(/[a-zA-Z0-9\\_]+/);
        if (!matcher) {
            return undefined;
        }
        const key = matcher[0];
        return { [key]: sortBy.startsWith('-') ? SortDirection.DESCEND : SortDirection.ASCEND };
    }

    static buildTableSortParams(sorter?: SortByOrder, key?: string): TableSortProps {
        return {
            sorter: (a, b) => a[key].localeCompare(b[key]),
            sortOrder: sorter && key in sorter ? sorter[key] : false
        };
    }
}
