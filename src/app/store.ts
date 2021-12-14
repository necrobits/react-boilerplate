import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as UserReducer } from '~/features/users/users.slice';
import { reducer as AuthReducer } from '~/features/auth/auth.slice';

import saga from '~/app/saga';
import AppState from '~/models/app.model';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

export const reducers = combineReducers<AppState>({
  users: UserReducer,
  auth: AuthReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware /*other middleware*/)
  /* other store enhancers if any */
);

export const store = createStore(reducers, enhancer);
sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
