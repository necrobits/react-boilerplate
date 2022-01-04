import React, { Suspense } from 'react';
import '~/App.scss';
import MainRoutes from '~/routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <MainRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
