import { Action } from 'redux';

export const REQUEST = 'Request';
export const SUCCESS = 'Success';
export const FAILURE = 'Failure';

export type SagaAction<T> = {
  type: string;
  payload: T;
};

export type ApiActionTypes = {
  [REQUEST]: string;
  [SUCCESS]: string;
  [FAILURE]: string;
};

export interface ApiAction<T, Payload> {
  request(payload: Payload): SagaAction<Payload>;

  success(response: T): SagaAction<T>;

  failure(error: string): Action<string>;
}

export function createApiTypes(base: string, action: string): ApiActionTypes {
  return <ApiActionTypes>[REQUEST, SUCCESS, FAILURE].reduce(
    (acc: { [key: string]: string }, type) => {
      const actionType = `${action}${type}`;
      acc[type] = `${base}/${actionType}`;
      return acc;
    },
    {}
  );
}

export function action<T>(type: string, payload?: T): SagaAction<T> | Action {
  if (payload) return { type, payload } as SagaAction<T>;
  return { type } as Action<string>;
}

export function createApiActions<T, K>(actions: ApiActionTypes): ApiAction<T, K> {
  return {
    request: (payload: K) => action(actions[REQUEST], payload) as SagaAction<K>,
    success: (response: T) => action(actions[SUCCESS], response) as SagaAction<T>,
    failure: (error: string) => action(actions[FAILURE], error)
  };
}
