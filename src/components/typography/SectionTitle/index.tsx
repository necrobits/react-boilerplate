import { Divider, Typography } from '@douyinfe/semi-ui';
import React from 'react';
import './style.scss';

type Props = {
    children: React.ReactNode;
    divider?: boolean;
};

export default function SectionTitle(props: Props) {
    const { Title } = Typography;
    return (
        <div className='section-title'>
            <Title heading={5}>{props.children}</Title>
            {props.divider && <Divider />}
        </div>
    );
}
