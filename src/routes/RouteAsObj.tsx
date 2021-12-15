import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// types
import { IRoutes } from '~/models/routes.model';

// layouts
import MainLayout from '~/layouts/MainLayout';

// route
import ProtectedRoute from '~/routes/ProtectedRoute';

// modules
const Users = lazy(() => import('~/views/Users'));
const Login = lazy(() => import('~/views/Login'));
const Signup = lazy(() => import('~/views/Signup'));
const Example = lazy(() => import('~/views/Example'));

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
