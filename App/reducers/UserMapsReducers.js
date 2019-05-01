import {
  GET_VENDORS_START,
  GET_VENDORS_SUCCESS,
  GET_USER_LOCATION_FAIL,
  GET_USER_LOCATION_SUCCESS,
  GET_BOOKING_SUCCESS,
  GET_VENDOR_DETAILS,
  GET_VENDOR_BOOKING,
  GET_VENDOR_BOOKING_START,
  GET_BOOKING_LIST_START,
  GET_BOOKING_LIST_SUCCESS
} from "../actions/UserMaps";

const INITIAL_STATE = {
  loading: false,
  vendors: [],
  location: "",
  errorMessage: "",
  isBookModalVisible: false,
  vendorsData: "",
  loadingBookig: false,
  loadingBookigList:false,
  vendorList:[],
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
          vendors: action.payload
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

    case GET_VENDOR_DETAILS:
      {
        return {
          ...state,
          isBookModalVisible: true,
          vendorsData: action.payload
        };
      }
      break;

    case GET_VENDOR_BOOKING:
      {
        return {
          ...state,
          isBookModalVisible: !state.isBookModalVisible
        };
      }
      break;

    case GET_BOOKING_SUCCESS:
      {
        return {
          ...state,
          loadingBookig: false,
          isBookModalVisible: false
        };
      }
      break;

    case GET_VENDOR_BOOKING_START:
      {
        return {
          ...state,
          loadingBookig: true
        };
      }
      break;

      case GET_BOOKING_LIST_START:
        {
          return {
            ...state,
            loadingBookigList:true,
          };
        }
        break;
        case GET_BOOKING_LIST_SUCCESS:
          {
            return {
              ...state,
              loadingBookigList:false,
              vendorList:action.payload
            };
          }
          break;

    default:
      return state;
      break;
  }
};
