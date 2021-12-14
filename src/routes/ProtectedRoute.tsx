import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Forbidden from '~/components/Forbidden/Forbidden';
import { getAuthenticatedUser } from '~/features/auth/auth.selector';

type Props = {
  requireRoles: string[] | [];
};

const ProtectedRoute: FC<Props> = ({ children, requireRoles = [] }) => {
  const user = useSelector(getAuthenticatedUser);
  const [elem, setElem] = useState(children);

  useEffect(() => {
    const routeRoles = requireRoles.map(role => role.toLowerCase());
    const userRoles = (user?.Roles ?? []).map(role => role.toLowerCase());

    if (userRoles.length === 0 || routeRoles.length === 0) return;

    if (_.intersection(routeRoles, userRoles).length === 0) {
      return setElem(<Forbidden />);
    }
  }, [history, user, requireRoles]);

  return <>{elem}</>;
};

export default ProtectedRoute;
