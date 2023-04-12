import { format as formatDate, formatDistance, formatRelative, isDate } from 'date-fns';
import { de, enGB } from 'date-fns/locale';
import { SupportedLanguage } from '~/models';
import { Time } from '~/utils';

type LocaleMap = {
    [key in SupportedLanguage]: Locale;
};
const locales: LocaleMap = { [SupportedLanguage.English]: enGB, de }; // used to look up the required locale
const handleDate = (date: Date, format = 'short', lng: string) => {
    let locale = locales[SupportedLanguage.English];
    if (lng !== SupportedLanguage.English) {
        locale = locales[lng];
    }

    if (format === 'short') return formatDate(date, 'P', { locale });
    if (format === 'long') return formatDate(date, 'PPPP', { locale });
    if (format === 'relative') return formatRelative(date, new Date(), { locale });
    if (format === 'ago')
        return formatDistance(date, new Date(), {
            locale,
            addSuffix: true
        });

    return formatDate(date, format, { locale });
};

const handleUpperCase = (val: string, lng: string) => {
    if (typeof val !== 'string') {
        return val;
    }
    return val.toUpperCase();
};

const handleLowerCase = (val: string, lng: string) => {
    return val.toLowerCase();
};

const handleRequired = (val: boolean, lng: string) => {
    if (typeof val !== 'boolean') {
        return val;
    }
    return val;
};

const handleMapper = {
    uppercase: handleUpperCase,
    lowercase: handleLowerCase,
    required: handleRequired
};

const interpolation = {
    escapeValue: false,
    format: (value, format = 'short', lng, edit) => {
        if (!lng) return value;
        if (isDate(value)) {
            return handleDate(value, format, lng);
        } else {
            if (format in handleMapper) {
                return handleMapper[format](value, lng);
            }
            try {
                const date = Time.fromISO(value);
                return handleDate(date, format, lng);
            } catch (e) {
                return value;
            }
        }
    }
};

export default interpolation;
