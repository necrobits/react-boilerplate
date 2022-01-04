import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// layouts
import MainLayout from '~/layouts/MainLayout';

// route
import ProtectedRoute from '~/routes/ProtectedRoute';

// modules
const Users = lazy(() => import('~/views/Users'));
const Login = lazy(() => import('~/views/Login'));
const Signup = lazy(() => import('~/views/Signup'));
const Example = lazy(() => import('~/views/Example'));

type Route = {
  exact?: boolean;
  path?: string;
  guard?: any;
  component?: any;
  requireRoles?: string[] | [];
};

export type IRoutes = Route & {
  routes?: Route[];
};

export const routes: IRoutes[] = [
  {
    exact: true,
    component: () => <Navigate to='example' />
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/example',
    component: Example
  },
  {
    path: '/users',
    guard: ProtectedRoute,
    component: MainLayout,
    routes: [
      {
        exact: true,
        component: Users
      }
    ]
  }
];
