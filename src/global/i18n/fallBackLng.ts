import { FallbackLng } from 'i18next';
import { Common } from '~/utils';

const fallBackFn = (code: string) => {
    return Common.getShortLang(code);
};

const fallBackLng: FallbackLng = fallBackFn;
export default fallBackLng;
