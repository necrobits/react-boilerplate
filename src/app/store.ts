import { combineReducers, createStore, applyMiddleware, compose, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';

import saga from '~/app/saga';
import { AppState } from '~/models';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const authReducer: Reducer = (state = {}, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

const sagaMiddleware = createSagaMiddleware();

export const reducers = combineReducers<AppState>({
  auth: authReducer
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
