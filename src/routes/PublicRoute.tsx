import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { isLoggedIn } from '~/features/auth/auth.selector';
import { LStorage } from '~/storage/storage';
import { AUTH_TOKEN } from '~/constants/storage';

type Props = {
  component: React.ComponentType;
  redirectPath?: string;
  requireRoles?: string[] | [];
};

const PublicRoute = ({ component: RouteComponent }: Props) => {
  const loggedIn = useSelector(isLoggedIn) || !!LStorage.getItem(AUTH_TOKEN);
  const location = useLocation();

  if (loggedIn) {
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
