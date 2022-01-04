import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import _ from 'lodash';
import Forbidden from '~/components/Forbidden/Forbidden';
import { LStorage } from '~/storage';
import { AUTH_TOKEN } from '~/constants';
import { useAuth } from '~/app/auth';

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
  const auth = useAuth();

  const { user } = auth;
  const isLoggedIn = auth.isLoggedIn || !!LStorage.getItem(AUTH_TOKEN);

  // const loggedIn = useSelector(isLoggedIn) || !!LStorage.getItem(AUTH_TOKEN);
  const location = useLocation();

  const routeRoles = requireRoles.map(role => role.toLowerCase());
  const userRoles = (user?.Roles ?? []).map(role => role.toLowerCase());

  if (!isLoggedIn) {
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
