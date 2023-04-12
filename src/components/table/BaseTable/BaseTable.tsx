import { Table } from '@douyinfe/semi-ui';
import { TableProps } from '@douyinfe/semi-ui/lib/es/table';
import React, { forwardRef } from 'react';
import EmptyContent from '~/components/EmptyContent';
import './style.scss';
import { BaseTableFilterParams } from '~/services';
import { SortDirection } from '~/models';

type Props = {
    emptyContent?: React.ReactNode;
    emptyText?: string;
    emptyDescription?: string;
    onChange?: (filter: BaseTableFilterParams) => void;
} & Omit<TableProps, 'onChange'>;
const BaseTable = forwardRef<Table, Props>(
    (
        {
            className,
            scroll = { y: 460 },
            virtualized = { itemSize: 57, mode: 'list' },
            pagination,
            dataSource,
            rowSelection,
            emptyText,
            emptyDescription,
            emptyContent,
            loading,
            onChange,
            ...props
        }: Props,
        ref
    ) => {
        const handleChange = ({ pagination, filters, sorter }) => {
            const { currentPage, pageSize } = pagination;
            const { dataIndex, sortOrder } = sorter ?? {};
            const sortBy = !!dataIndex && sortOrder != null && typeof sortOrder !== 'boolean' ? (sortOrder === SortDirection.ASCEND ? dataIndex : `-${dataIndex}`) : null;
            const filterBy = filters.reduce((acc, filter) => {
                acc[filter.dataIndex] = filter.filteredValue;
                return acc;
            }, {});
            if (onChange) {
                onChange({ page: currentPage, pageSize: pageSize, sortBy, ...filterBy });
            }
        };
        return (
            <Table
                className={`base-table ${className}`}
                scroll={scroll}
                loading={loading}
                rowSelection={dataSource && dataSource?.length > 0 ? rowSelection : false}
                dataSource={dataSource}
                empty={
                    <>
                        {!loading && (
                            <EmptyContent title={emptyText} description={emptyDescription}>
                                {emptyContent}
                            </EmptyContent>
                        )}
                    </>
                }
                virtualized={dataSource && dataSource?.length > 0 ? virtualized : false}
                pagination={pagination}
                ref={ref}
                onChange={handleChange}
                {...props}
            />
        );
    }
);

BaseTable.displayName = 'Table';
export default BaseTable;
