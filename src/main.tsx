import React from 'react';
import ReactDOM from 'react-dom';
import '~/index.scss';
import App from '~/App';
import { store } from '~/app/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './app/auth';
import go from '~/app/gobits';
import { simpleAuth } from '~/middlewares';

const queryClient = new QueryClient();

go.use(simpleAuth);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
