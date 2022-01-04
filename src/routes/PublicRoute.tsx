import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '~/app/auth';
import { AUTH_TOKEN } from '~/constants';
import { LStorage } from '~/storage';

type Props = {
  component: React.ComponentType;
  redirectPath?: string;
  requireRoles?: string[] | [];
};

const PublicRoute = ({ component: RouteComponent }: Props) => {
  const isLoggedIn = useAuth().isLoggedIn || !!LStorage.getItem(AUTH_TOKEN);

  // const loggedIn = useSelector(isLoggedIn) || !!LStorage.getItem(AUTH_TOKEN);
  const location = useLocation();

  if (isLoggedIn) {
    if (location.state?.referrer) {
      const to = {
        pathname: location.state.referrer.pathname,
        search: location.state.referrer.search
      };

      return <Navigate to={to} />;
    } else if (location.pathname === '/login' || location.pathname === '/signup') {
      return <Navigate to='/' />;
    }
  }
  return <RouteComponent />;
};

export default PublicRoute;
