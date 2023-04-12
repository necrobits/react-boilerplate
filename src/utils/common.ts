import _ from 'lodash';
import { isArray, isPlainObject, map } from 'lodash/fp';
import { SupportedLanguage } from '~/models';

export class Common {
    static snakeToCamelCase = Common.createNestedKeyTransformer(_.camelCase);
    static camelToSnakeCase = Common.createNestedKeyTransformer(_.snakeCase);

    static getShortLang(lang: string): SupportedLanguage {
        if (!lang) return SupportedLanguage.English;
        for (const val of Object.values(SupportedLanguage)) {
            if (lang === val || lang.startsWith(`${val}-`)) {
                return val;
            }
        }
        return SupportedLanguage.English;
    }

    static isSomeEnum<T>(e: T): (token: unknown) => token is T[keyof T] {
        const keys = Object.keys(e).filter(k => {
            return !/^\d/.test(k);
        });
        const values = keys.map(k => {
            return (e as any)[k];
        });
        return (token: unknown): token is T[keyof T] => {
            return values.includes(token);
        };
    }

    private static createKeyIteratee(converter, self) {
        return (result, value, key) => _.set(result, converter(key), self(value));
    }

    private static createNestedKeyTransformer(keyConverter) {
        return function t(node) {
            if (isArray(node)) return map(t, node);
            if (isPlainObject(node)) return _.transform(node, Common.createKeyIteratee(keyConverter, t));
            return node;
        };
    }
}
