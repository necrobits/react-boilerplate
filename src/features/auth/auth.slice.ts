import { Reducer } from 'redux';
import { AuthState } from '~/models/auth.model';
import {
  AUTH_LOGIN_TYPES,
  AUTH_LOGOUT_TYPE,
  AUTH_REGISTER_TYPES
} from '~/features/auth/auth.action';
import { FAILURE, REQUEST, SUCCESS } from '~/actions';

const initialState: AuthState = {
  user: null,
  errors: undefined,
  loading: false,
  isLoggedIn: false
};

export const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_TYPES[REQUEST]:
    case AUTH_REGISTER_TYPES[REQUEST]: {
      return { ...state, loading: true, isLoggedIn: false };
    }
    case AUTH_LOGIN_TYPES[FAILURE]:
    case AUTH_REGISTER_TYPES[FAILURE]: {
      return { ...state, loading: false, errors: action.payload };
    }
    case AUTH_LOGIN_TYPES[SUCCESS]:
    case AUTH_REGISTER_TYPES[SUCCESS]: {
      return { ...state, loading: false, isLoggedIn: true, user: action.payload };
    }
    case AUTH_LOGOUT_TYPE: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};
