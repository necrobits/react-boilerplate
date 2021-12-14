import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Users from '~/views/Users';
import Login from '~/views/Login';
import Signup from '~/views/Signup';
import Example from '~/views/Example';

// configs

// types
import { IRoutes } from '~/models/routes.model';

// layouts
import MainLayout from '~/layouts/MainLayout';

// route
import ProtectedRoute from '~/routes/ProtectedRoute';
import AuthGuard from '~/guards/AuthGuard';
import PublicGuard from '~/guards/PublicGuard';

// modules
// const Users = lazy(() => import('~/views/Users'));
// const Login = lazy(() => import('~/views/Login'));
// const Signup = lazy(() => import('~/views/Signup'));
// const Example = lazy(() => import('~/views/Example'));

const routesConfig: IRoutes[] = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to='/example' />
  },
  {
    exact: true,
    path: '/login',
    guard: PublicGuard,
    component: Login
  },
  {
    exact: true,
    path: '/signup',
    guard: PublicGuard,
    component: Signup
  },
  {
    exact: true,
    path: '/example',
    component: Example
  },
  {
    path: '/users',
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '',
        component: Users
      }
    ]
  }
];

const renderRoutes = (routes: IRoutes[]) => {
  return (
    <>
      {routes ? (
        <BrowserRouter>
          <Suspense fallback={<div />}>
            <Switch>
              {routes.map((route: IRoutes, idx: number) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;
                const requireRoles = route.requireRoles || [];

                return (
                  <Route
                    key={`routes-${idx}`}
                    path={route.path}
                    exact={route.exact}
                    render={(props: any) => (
                      <Guard>
                        <Layout>
                          {route.routes ? (
                            renderRoutes(route.routes)
                          ) : (
                            <ProtectedRoute requireRoles={requireRoles}>
                              <Component {...props} />
                            </ProtectedRoute>
                          )}
                        </Layout>
                      </Guard>
                    )}
                  />
                );
              })}
            </Switch>
          </Suspense>
        </BrowserRouter>
      ) : null}
    </>
  );
};

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
