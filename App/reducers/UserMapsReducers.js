import {
  GET_VENDORS_START,
  GET_VENDORS_SUCCESS

} from "../actions/UserMaps";

const INITIAL_STATE = {
  loading : false,
  vendors:[]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VENDORS_START:
      {
        return {
          ...state,
          loading: true,
        };
      }
      break;

      case GET_VENDORS_SUCCESS:
        {
          return {
            ...state,
            loading: false,
            vendors:[]
          };
        }
        break;

    default:
      return state;
      break;
  }
};
