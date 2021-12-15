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

export type RouteParams = {
  id?: string;
};
