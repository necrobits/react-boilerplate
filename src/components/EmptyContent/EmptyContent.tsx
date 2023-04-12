import { Empty } from '@douyinfe/semi-ui';
import { EmptyProps } from '@douyinfe/semi-ui/lib/es/empty';
import React from 'react';
import './style.scss';

type Props = { children?: React.ReactNode } & EmptyProps;
export default function EmptyContent({ children, ...props }: Props) {
    return (
        <Empty className='empty-content-wrapper' {...props}>
            {children}
        </Empty>
    );
}
