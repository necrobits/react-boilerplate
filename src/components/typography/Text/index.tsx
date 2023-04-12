import { Typography } from '@douyinfe/semi-ui';
import React from 'react';
import './style.scss';

type Props = {
    text: string | number;
    className?: string;
};
export default function CustomText({ text, className }: Props) {
    const { Text: T } = Typography;

    return <T className={`custom-text ${className ?? ''}`}>{text}</T>;
}
