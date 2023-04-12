import { Typography } from '@douyinfe/semi-ui';
import React from 'react';
import './style.scss';

type Props = {
    text: string;
};
export default function Hint({ text }: Props) {
    const { Text } = Typography;

    return <Text className='hint'>{text}</Text>;
}
