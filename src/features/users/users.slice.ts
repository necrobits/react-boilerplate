import { Reducer } from 'redux';
import { USERS_TYPES } from '~/features/users/users.action';
import { FAILURE, REQUEST, SUCCESS } from '~/actions';
import { UsersState } from '~/models/user.model';

const initialState: UsersState = {
  items: [],
  errors: undefined,
  loading: false
};

export const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case USERS_TYPES[REQUEST]: {
      return { ...state, loading: true };
    }
    case USERS_TYPES[SUCCESS]: {
      return { ...state, loading: false, items: action.payload };
    }
    case USERS_TYPES[FAILURE]: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};
