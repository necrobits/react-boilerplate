import { Middleware } from 'gobits';

export const filterQuery: Middleware = (req, res, next, responding) => {
    if (!responding) {
        req.query = Object.keys(req.query).reduce((acc, key) => {
            if (req.query[key]) {
                acc[key] = req.query[key];
            }
            return acc;
        }, {});
    }

    return next();
};
