import { Gobits } from 'gobits';
import Config from '~/config';
import { filterQuery, handleResponse, injectToken } from './middlewares';

const Go = new Gobits({
    baseUrl: Config.serverApi,
    defaultOpts: { cache: 'no-store', credentials: 'include' }
});
Go.use(filterQuery);
Go.use(injectToken);
Go.use(handleResponse);
export default Go;
