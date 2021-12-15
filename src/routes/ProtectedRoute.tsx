import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import _ from 'lodash';
import Forbidden from '~/components/Forbidden/Forbidden';
import { getAuthenticatedUser, isLoggedIn } from '~/features/auth/auth.selector';
import { LStorage } from '~/storage/storage';
import { AUTH_TOKEN } from '~/constants/storage';

type Props = {
  component: React.ComponentType;
  redirectPath?: string;
  requireRoles?: string[] | [];
};

const ProtectedRoute: React.FC<Props> = ({
  component: RouteComponent,
  redirectPath = '/login',
  requireRoles = []
}: Props) => {
  const loggedIn = useSelector(isLoggedIn) || !!LStorage.getItem(AUTH_TOKEN);
  const location = useLocation();

  const user = useSelector(getAuthenticatedUser);
  const routeRoles = requireRoles.map(role => role.toLowerCase());
  const userRoles = (user?.Roles ?? []).map(role => role.toLowerCase());

  if (!loggedIn) {
    return <Navigate to={redirectPath} state={{ referrer: location }} />;
  }

  if (routeRoles.length > 0) {
    if (_.intersection(routeRoles, userRoles).length === 0) {
      return <Forbidden />;
    }
  }

  return <RouteComponent />;
};

export default ProtectedRoute;
