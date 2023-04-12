import _ from 'lodash';
import { stringify } from 'qs';
import { Common } from './common';

type GoQueryParams = {
    [paramName: string]: string | number;
};

export class UrlManager {
    static paramsToQueryString(params: any): string {
        if (_.isPlainObject(params)) {
            params = Common.camelToSnakeCase(params);
        }
        return stringify(params, {
            filter: (_, value) => value || undefined,
            encode: true,
            arrayFormat: 'comma',
            addQueryPrefix: true
        });
    }

    static paramsToGoQuery(params: object): GoQueryParams {
        const modifiedParams: GoQueryParams = {};
        if (params) {
            Object.keys(params).forEach(key => {
                const val = params[key];
                if (val != undefined || val != null) {
                    if (_.isArray(val)) {
                        modifiedParams[key] = val.join(',');
                    } else if (_.isBoolean(val)) {
                        modifiedParams[key] = val ? 'true' : 'false';
                    } else {
                        modifiedParams[key] = val;
                    }
                }
            });
        }
        return modifiedParams;
    }
}
