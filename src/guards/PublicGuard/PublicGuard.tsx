import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { LStorage } from '~/storage/storage';
import { AUTH_TOKEN } from '~/constants/storage';
import { isLoggedIn } from '~/features/auth/auth.selector';
import { useLocation } from 'react-router-dom';

const PublicGuard: FC = ({ children }) => {
  const loggedIn = useSelector(isLoggedIn) || !!LStorage.getItem(AUTH_TOKEN);
  const location = useLocation();

  if (loggedIn && location.state?.referrer) {
    const to = {
      pathname: location.state.referrer.pathname,
      search: location.state.referrer.search,
      state: {
        referrer: {
          pathname: location.pathname,
          search: location.search
        }
      }
    };
    return <Redirect to={to} />;
  }
  return <>{children}</>;
};

export default PublicGuard;
