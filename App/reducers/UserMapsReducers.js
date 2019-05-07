import {
  GET_VENDORS_START,
  GET_VENDORS_SUCCESS,
  GET_USER_LOCATION_FAIL,
  GET_USER_LOCATION_SUCCESS,
  GET_BOOKING_SUCCESS,
  GET_BOOKING_FAIL,
  GET_VENDOR_DETAILS,
  CLOSE_VENDOR_DETAIL_MODAL,
  GET_VENDOR_BOOKING_START,
  GET_BOOKING_LIST_START,
  GET_BOOKING_LIST_SUCCESS,
  GET_BOOKING_LIST_FAIL,
  UPDATE_FILTER_VEHICLE_BOOL,
  UPDATE_FILTER_CAR_BOOL,
  UPDATE_FILTER_RATING,
  UPDATE_FILTER_CHECKED1,
  UPDATE_FILTER_CHECKED2,
  UPDATE_FILTER_CHECKED3,
  UPDATE_FILTER_DISTANCE,
  RESET_FILTER,
  GET_BOOKING_CANCLE,
  GET_DISTANCE,
  GET_DISTANCELIST
} from "../actions/UserMaps";

const INITIAL_STATE = {
  loading: false,
  vendors: [],
  location: "",
  errorMessage: "",
  isBookModalVisible: false,
  vendorsData: "",
  loadingBookig: false,
  loadingBookigList: false,
  isBookingListFail:false,
  vendorList: [],
  isVehicle: false,
  isCar: false,
  rating: 0,
  isChecked1: false,
  isChecked2: false,
  isChecked3: false,
  distance: 10,
  isBookingSuccess:false,
  vendorDistance:[],
  vendorDistanceList:[],
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

    case CLOSE_VENDOR_DETAIL_MODAL:
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
          isBookModalVisible: true,
          isBookingSuccess:true
        };
      }
      break;

      case GET_BOOKING_FAIL:
        {
          return {
            ...state,
            loadingBookig: false,
            isBookModalVisible: true,
            isBookingSuccess:false
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
          loadingBookigList: true,
          isBookingListFail:false
        };
      }
      break;
    case GET_BOOKING_LIST_SUCCESS:
      {
        return {
          ...state,
          loadingBookigList: false,
          vendorList: action.payload,
        };
      }
      break;

      case GET_BOOKING_LIST_FAIL:
        {
          return {
            ...state,
            loadingBookigList: false,
            isBookingListFail:true
          };
        }
        break;

    case UPDATE_FILTER_VEHICLE_BOOL:
      {
        return {
          ...state,
          isVehicle: !state.isVehicle
        };
      }
      break;
    case UPDATE_FILTER_CAR_BOOL:
      {
        return {
          ...state,
          isCar: !state.isCar
        };
      }
      break;

    case UPDATE_FILTER_RATING:
      {
        return {
          ...state,
          rating: action.payload
        };
      }
      break;

    case UPDATE_FILTER_CHECKED1:
      {
        return {
          ...state,
          isChecked1: !state.isChecked1
        };
      }
      break;

    case UPDATE_FILTER_CHECKED2:
      {
        return {
          ...state,
          isChecked2: !state.isChecked2
        };
      }
      break;

    case UPDATE_FILTER_CHECKED3:
      {
        return {
          ...state,
          isChecked3: !state.isChecked3
        };
      }
      break;

    case UPDATE_FILTER_DISTANCE:
      {
        return {
          ...state,
          distance: action.payload
        };
      }
      break;

      case RESET_FILTER:
        {
          return {
            ...state,
            isVehicle: false,
            isCar: false,
            rating: "",
            isChecked1: false,
            isChecked2: false,
            isChecked3: false,
            distance: 10,
          };
        }
        break;

    case GET_BOOKING_CANCLE:
    {
      return{
        ...state,
        loadingBookig: false,
        isBookModalVisible: false,
        isBookingSuccess:false
      }
    }
    break;

    case GET_DISTANCE:
    {
      return{
        ...state,
        vendorDistance:action.payload
      }
    }
    break;

    case GET_DISTANCELIST:
    {
      return{
        ...state,
        vendorList:action.payload
        }
    }
    break;

    default:
      return state;
      break;
  }
};
