import LanguageDetector, { DetectorOptions } from 'i18next-browser-languagedetector';
import { USER_LANGUAGE } from '~/constants';

const options: DetectorOptions = {
    lookupLocalStorage: USER_LANGUAGE,
    lookupSessionStorage: USER_LANGUAGE,
    order: ['querystring', 'sessionStorage', 'localStorage', 'navigator'],
    caches: ['localStorage'],
    lookupQuerystring: 'lang'
};

const languageDetector = new LanguageDetector(null, options);

export default languageDetector;
