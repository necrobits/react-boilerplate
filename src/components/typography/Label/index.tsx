import { Typography } from '@douyinfe/semi-ui';
import React from 'react';
import './style.scss';

type Props = {
    text: string;
    className?: string;
};
export default function Label({ text, className }: Props) {
    const { Text } = Typography;

    return <Text className={`custom-label ${className ?? ''}`}>{text}</Text>;
}
