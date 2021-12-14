import React from 'react';
import ReactDOM from 'react-dom';
import '~/index.scss';
import App from '~/App';
import httpService from '~/services/httpService';
import { setupInterceptorsTo } from '~/middlewares/httpInterceptors';
import { store } from '~/app/store';
import { Provider } from 'react-redux';

setupInterceptorsTo(httpService.instance);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
