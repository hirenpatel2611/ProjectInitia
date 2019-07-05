import {
  LOAD_FONT_SUCCESS,
  UPDATE_LOGGED_IN_STATE,
  SET_ALL_STATE_TO_INITIAL
} from "../actions/ui";

const INITIAL_STATE = {
  fontLoaded: false,
  isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FONT_SUCCESS:
      return { ...state, fontLoaded: true };
      break;

    case UPDATE_LOGGED_IN_STATE:
      return { ...state, isLoggedIn: action.payload };
      break;

    case SET_ALL_STATE_TO_INITIAL:
      {
        return {
          ...state,
          isLoggedIn: false
        };
      }
      break;

    default:
      return state;
      break;
  }
};
