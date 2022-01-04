import { Route, Routes } from 'react-router-dom';
import { routes } from '~/routes/routes';
import { makeRoutes } from '~/routes/make';
import React from 'react';

const Router = () => {
  return (
    <Routes>
      <Route path='/'>{makeRoutes(routes)}</Route>
    </Routes>
  );
  // return (
  //   <Routes>
  //     <Route path='/'>
  //       <Route index element={<Navigate to='/example' />} />
  //       <Route path='login' element={<Login />} />
  //       <Route path='signup' element={<Signup />} />
  //
  //       <Route path='users' element={<ProtectedRoute component={MainLayout} />}>
  //         <Route index element={<Users />} />
  //       </Route>
  //       <Route path='example' element={<Example />} />
  //     </Route>
  //   </Routes>
  // );
};

export default Router;
