import { Gobits } from 'gobits';
import Config from '~/config';

const go = new Gobits({ baseUrl: Config.serverUrl });

export default go;
