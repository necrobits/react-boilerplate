import React, { ComponentType } from 'react';

export type Guard =
  | React.LazyExoticComponent<ComponentType<unknown>>
  | (ComponentType<unknown> & {
      roles?: string[];
      redirectLink?: string;
    });
type Route = {
  exact?: boolean;
  path?: string;
  guard?: Guard;
  layout?: React.FunctionComponent;
  component?: any;
  requireRoles?: string[] | [];
};

export type IRoutes = Route & {
  routes?: Route[];
};

export type RouteParams = {
  id?: string;
};
