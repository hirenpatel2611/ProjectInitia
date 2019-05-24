import {
  LOAD_FONT_SUCCESS,
  UPDATE_LOGGED_IN_STATE,
} from "../actions/ui";

const INITIAL_STATE = {
  fontLoaded: false,
  isLoggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FONT_SUCCESS:
      return { ...state, fontLoaded: true };
      break;

    case UPDATE_LOGGED_IN_STATE:
      return { ...state, isLoggedIn: action.payload };
      break;


    default:
      return state;
      break;
  }
};
