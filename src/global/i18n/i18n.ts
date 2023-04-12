import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { SupportedLanguage } from '~/models';
import languageDetector from './languageDetector';
import interpolation from './interpolation';
import fallBackLng from './fallBackLng';

const createI18n = () => {
    const i18n = i18next.createInstance();

    i18n.use(languageDetector) // detect user language
        .use(
            resourcesToBackend((language, namespace, callback) => {
                import(`../../../locales/${language}/${namespace}.json`)
                    .then(resources => {
                        callback(null, resources);
                    })
                    .catch(error => {
                        callback(error, null);
                    });
            })
        ) //  chain multiple other backends and caches
        .use(initReactI18next); // pass the i18n instance to react-i18next.

    i18n.init({
        ns: ['common', 'validation'],
        supportedLngs: [SupportedLanguage.English, SupportedLanguage.German],
        fallbackLng: fallBackLng,
        load: 'languageOnly',
        debug: false,
        backend: {
            stringify: JSON.stringify
        },
        initImmediate: false,
        interpolation: interpolation,
        react: {
            useSuspense: true //   <---- this will do the magic
        }
    });

    return i18n;
};

const i18n = createI18n();

export default i18n;
