import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../../components/typography';

export default function Example() {
    const { t } = useTranslation('example');
    return <SectionTitle>{t('title')}</SectionTitle>;
}
