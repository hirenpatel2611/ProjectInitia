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
  GET_BOOKING_CANCLE_START,
  GET_BOOKING_CANCLE_SUCCESS,
  GET_BOOKING_CANCLE_FAIL,
  GET_DISTANCE,
  GET_DISTANCELIST,
  GET_BOOKING_STATUS,
  GET_BOOKING_CANCEL_BY_VENDOR,
  GET_MECHANIC_CURREN_LOCATION,
  GET_DISTANCE_BETWEEN_USER_MECHANIC,
  GET_BOOKING_UPDATE_START,
  GET_BOOKING_UPDATE_SUCCESS,
  GET_BOOKING_UPDATE_FAIL,
   GET_REASON_CHECKBOX,
  GET_CANCEL_BOOKING_MODAL,
  SET_DURATION_AND_DISTANCE,
  GET_BOOKING_COMPLETE,
  GET_VENDOR_RATING
} from "../actions/UserMaps";
import {GET_USER_BOOKING_STATUS_ACCEPT} from "../actions/ui";


const INITIAL_STATE = {
  loading: false,
  vendors: [],
  location: "",
  errorMessage: "",
  isBookModalVisible: false,
  vendorsData: "",
  loadingBookig: false,
  loadingBookigList: false,
  isBookingListFail: false,
  vendorList: [],
  isVehicle: false,
  isCar: false,
  rating: 0,
  isChecked1: false,
  isChecked2: false,
  isChecked3: false,
  distance: 10,
  isBookingSuccess: false,
  vendorDistance: '',
  vendorDistanceList: [],
  bookData: "",
  bookingStatusRes: "",
  mechanicCurrentLocation: "",
  distanceBetweenUserMechanic: "",
  reasonCheckbox:[false,false,false],
  cancleReason:'',
  isBookCancelModal:false,
  confirmDisable:false
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
          vendorsData: action.payload,
          isBookModalVisible: true,
        };
      }
      break;

    case CLOSE_VENDOR_DETAIL_MODAL:
      {
        return {
          ...state,
          isBookModalVisible: !state.isBookModalVisible,
          vendorsData:'',
          vendorDistance:''
        };
      }
      break;

    case GET_BOOKING_SUCCESS:
      {
        return {
          ...state,
          loadingBookig: false,
          isBookModalVisible: true,
          isBookingSuccess: true,
          bookData: action.payload,
          bookingStatusRes:{type:'PENDING'}
        };
      }
      break;

    case GET_BOOKING_FAIL:
      {
        return {
          ...state,
          loadingBookig: false,
          isBookModalVisible: true,
          isBookingSuccess: false
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
          isBookingListFail: false
        };
      }
      break;
    case GET_BOOKING_LIST_SUCCESS:
      {
        return {
          ...state,
          loadingBookigList: false,
          vendorList: action.payload
        };
      }
      break;

    case GET_BOOKING_LIST_FAIL:
      {
        return {
          ...state,
          loadingBookigList: false,
          isBookingListFail: true
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
          distance: 10
        };
      }
      break;

    case GET_BOOKING_CANCLE_START:
      {
        return {
          ...state,
          loadingBookig: true
        };
      }
      break;

    case GET_BOOKING_CANCLE_SUCCESS:
      {
        return {
          ...state,
          bookingStatusRes:'',
          loadingBookig: false,
          isBookingSuccess: false,
          isBookCancelModal:false,
          confirmDisable:false,
          reasonCheckbox:[false,false,false]
        };
      }
      break;

    case GET_BOOKING_CANCLE_FAIL:
      {
        return {
          ...state,
          loadingBookig: false
        };
      }
      break;

    case GET_DISTANCE:
      {
        return {
          ...state,
          vendorDistance: action.payload,
        };
      }
      break;

    case GET_BOOKING_STATUS:
      {
        return {
          ...state,
          bookingStatusRes: action.payload
        };
      }
      break;

    case GET_BOOKING_CANCEL_BY_VENDOR:
      {
        return {
          ...state,
          isBookModalVisible: false,
          bookingStatusRes: '',
          isBookingSuccess:false
        };
      }
      break;

    case GET_MECHANIC_CURREN_LOCATION:
      {
        return {
          ...state,
          mechanicCurrentLocation: action.payload
        };
      }
      break;

    case GET_DISTANCE_BETWEEN_USER_MECHANIC:
      {
        return {
          ...state,
          distanceBetweenUserMechanic: action.payload
        };
      }
      break;


    case GET_REASON_CHECKBOX:
    {
      newReasonCheckbox=[false,false,false]
      newReasonCheckbox[action.payload]=true;
      newCancleReason=['Mechanic is not responding on booking.','Mechanic is not done good deal.','I Choose better option.']
      return{
        ...state,
        reasonCheckbox:newReasonCheckbox,
        cancleReason:newCancleReason[action.payload],
        confirmDisable:true
      };
    }
    break;

    case GET_CANCEL_BOOKING_MODAL:
    {
      return{
        ...state,
        isBookModalVisible:false,
        isBookCancelModal:true,
      };
    }
    break;

    case GET_BOOKING_UPDATE_SUCCESS:
    {
      return{
        ...state,
        bookingStatusRes:action.payload
      };
    }
    break;

    case GET_USER_BOOKING_STATUS_ACCEPT:
      {
        return{
          ...state,
          bookingStatusRes:action.payload.bookingStatusRes,
          vendorsData:action.payload.vendorData,
          isBookModalVisible: true,
          isBookingSuccess:true,
          bookData:{booking_id:action.payload.response[0].current_booking.booking_id,
                    vendor_id:action.payload.response[0].current_booking.vendor_id},
        }
      }
      break;

      case SET_DURATION_AND_DISTANCE:
      {
        return{
          ...state,
          mechanicDestance:action.payload.distance,
          mechanicDuration:action.payload.duration,
        };
      }
      break;

      case GET_VENDOR_RATING:
      {
        return{
          ...state,
          vendorRating:action.payload,
        };
      }
      break;

      case GET_BOOKING_COMPLETE:
      {
        return{
          ...state,
          mechanicDestance:'',
          mechanicDuration:'',
          bookingStatusRes:'',
          isBookModalVisible:'',
          isBookingSuccess:false,
          isBookModalVisible:false
        };
      }
      break;

    default:
      return state;
      break;
  }
};
