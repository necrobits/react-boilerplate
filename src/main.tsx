import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import '~/global/gobits';
import i18n from '~/global/i18n';
import { store } from '~/global/store';

import Config from '~/config';
import { LanguageProvider, TimeManagerProvider } from '~/context';
import App from '~/App';
import '~/index.scss';

const queryClient = new QueryClient();
const element = document.getElementById('root');
const root = createRoot(element!);

i18n.on('initialized', () => {
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <LanguageProvider>
                        <TimeManagerProvider>
                            <App />
                        </TimeManagerProvider>
                    </LanguageProvider>
                    <ReactQueryDevtools initialIsOpen={Config.isDev} />
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    );
});
