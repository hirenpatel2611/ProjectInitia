import {
  GET_VENDORS_START,
  GET_VENDORS_SUCCESS,
  GET_USER_LOCATION_FAIL,
  GET_USER_LOCATION_SUCCESS,
  IS_MENU_VISIBLE
} from "../actions/UserMaps";

const INITIAL_STATE = {
  loading: false,
  vendors: [],
  location: "",
  errorMessage: "",
  isMenuModalVisible:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VENDORS_START:
      {
        return {
          ...state,
          loading: true
        };
      }
      break;


      case GET_VENDORS_SUCCESS:
        {
          return {
            ...state,
            loading: false,
            vendors:action.payload
          };
        }
        break;


    case GET_USER_LOCATION_FAIL:
      {
        return {
          ...state,
          errorMessage: action.payload
        };
      }
      break;

    case GET_USER_LOCATION_SUCCESS:
      {
        return {
          ...state,
          location: action.payload
        };
      }
      break;

      case IS_MENU_VISIBLE:
        {
          return {
            ...state,
            isMenuModalVisible: action.payload
          };
        }
        break;

    default:
      return state;
      break;
  }
};
