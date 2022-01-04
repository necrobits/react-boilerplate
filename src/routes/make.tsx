import React from 'react';
import { Route } from 'react-router-dom';
import PublicRoute from '~/routes/PublicRoute';
import { IRoutes } from '~/routes/routes';

const makeRoute = (route: IRoutes, id: string) => {
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
        {route.routes ? makeRoutes(route.routes, id) : null}
      </Route>
    );
  }
  return <Route key={`routes-${id}`} {...opts} element={guard} />;
};

export const makeRoutes = (routes: IRoutes[], id?: string) => {
  return (
    <>
      {routes
        ? routes.map((route: IRoutes, idx: number) =>
            makeRoute(route, `${id ? `${id}-${idx}` : idx}`)
          )
        : null}
    </>
  );
};
