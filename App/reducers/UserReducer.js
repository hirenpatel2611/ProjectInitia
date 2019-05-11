import {
  LOGIN_SUCCESSFUL,
} from "../actions/Login";

const INITIAL_STATE = {
  userId: "",
  userMobileno: "",
  userFullName: '',
  userAddress: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      {
        return {
          ...state,
          userId: action.payload.user_id,
          userMobileno: action.payload.mobileno,
          userFullName: action.payload.first_name,
          userAddress: action.payload.address,
        };
      }
      break;

    default:
      return state;
      break;
  }
};
