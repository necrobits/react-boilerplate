import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { LStorage } from '~/storage/storage';
import { AUTH_TOKEN } from '~/constants/storage';
import { isLoggedIn } from '~/features/auth/auth.selector';
import { useLocation } from 'react-router-dom';

const AuthGuard: FC = ({ children }) => {
  const loggedIn = useSelector(isLoggedIn) || !!LStorage.getItem(AUTH_TOKEN);
  const location = useLocation();
  if (!loggedIn)
    return <Redirect to={{ pathname: '/login', state: { referrer: location } }} />;

  return <>{children}</>;
};

export default AuthGuard;
