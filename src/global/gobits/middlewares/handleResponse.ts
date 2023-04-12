import { Middleware } from 'gobits';
import { ErrorResponse } from '~/services';

export const handleResponse: Middleware = (_, res, next) => {
    if (res.isResponded) {
        if (res.status >= 200 && res.status <= 399) {
            return next();
        }
        throw new ErrorResponse({
            statusCode: res.status,
            message: res.body.message,
            details: res.body.details
                ? res.body.details.reduce((acc, e) => {
                      const key = Object.keys(e)[0];
                      acc[key] = e[key];
                      return acc;
                  }, {})
                : undefined
        });
    }
    return next();
};
