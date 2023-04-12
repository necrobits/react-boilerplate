import React from 'react';
import { ConfigProvider, LocaleProvider } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import de from '@douyinfe/semi-ui/lib/es/locale/source/de';

import { Common } from '~/utils';
import { SupportedLanguage } from '~/models';

type Props = {
    language?: SupportedLanguage;
    children?: React.ReactNode;
};

export const LanguageContext = React.createContext<Props | null>(null);

const getLocale = (lang: string) => {
    const shortLang = Common.getShortLang(lang);
    if (shortLang === SupportedLanguage.English) return en_GB;
    if (lang === SupportedLanguage.German) return de;
    return en_GB;
};

export function LanguageProvider({ children }: Props) {
    const { i18n } = useTranslation();

    return (
        <LanguageContext.Provider value={{ language: Common.getShortLang(i18n.language) }}>
            <LocaleProvider locale={getLocale(i18n.language)}>
                <ConfigProvider locale={getLocale(i18n.language)}>{children}</ConfigProvider>
            </LocaleProvider>
        </LanguageContext.Provider>
    );
}
