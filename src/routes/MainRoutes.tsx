import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { IRoutes } from '~/models/routes.model';
import { routes } from '~/routes/RouteAsObj';
import PublicRoute from '~/routes/PublicRoute';

const renderRoute = (route: IRoutes, id: string) => {
  const Guard = route.guard || PublicRoute;
  const Component = route.component;
  const requireRoles = route.requireRoles || [];
  const opts: any = {};
  if (route.exact) {
    opts.index = true;
  } else {
    opts.path = route.path;
  }
  const guard = <Guard requireRoles={requireRoles} component={Component} />;
  if (route.routes && route.routes.length > 0) {
    return (
      <Route key={`routes-${id}`} {...opts} element={guard}>
        {route.routes ? renderRoutes(route.routes, id) : null}
      </Route>
    );
  }
  return <Route key={`routes-${id}`} {...opts} element={guard} />;
};

const renderRoutes = (routes: IRoutes[], id?: string) => {
  return (
    <>
      {routes
        ? routes.map((route: IRoutes, idx: number) =>
            renderRoute(route, `${id ? `${id}-${idx}` : idx}`)
          )
        : null}
    </>
  );
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/'>{renderRoutes(routes)}</Route>
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

export default MainRoutes;
