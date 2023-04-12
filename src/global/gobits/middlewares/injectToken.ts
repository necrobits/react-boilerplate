import { LStorage } from '~/storage';
import { AUTH_TOKEN } from '~/constants';
import { Middleware } from 'gobits';

function getAccessToken(): string | null {
    return LStorage.getItem(AUTH_TOKEN);
}

export const injectToken: Middleware = (req, _, next) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        req.headers['x-auth-token'] = accessToken;
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return next();
};
