import React, { useEffect } from 'react';
import { TIMEZONE } from '~/constants';
import { Common, TimeManagerWithTimezone } from '~/utils';
import { useTranslation } from 'react-i18next';

export const TimeManagerContext = React.createContext<TimeManagerWithTimezone>(null);

type Props = {
    children: React.ReactNode;
};

export function TimeManagerProvider({ children }: Props) {
    const { i18n } = useTranslation();

    const [timeManager, setTimeManager] = React.useState<TimeManagerWithTimezone>(null);

    useEffect(() => {
        setTimeManager(new TimeManagerWithTimezone(TIMEZONE, Common.getShortLang(i18n.language) || 'en'));
    }, [i18n.language]);

    return <TimeManagerContext.Provider value={timeManager}>{children}</TimeManagerContext.Provider>;
}
