import {
  GET_FUTURE_BOOKING_LIST_START,
  GET_FUTURE_BOOKING_LIST_SUCCESS,
  GET_FUTURE_BOOKING_LIST_FAIL,
  GET_CUSTOMER_DISTANCELIST,
  GET_BOOKING_MODAL,
  GET_BOOKING_UAPDATE_START,
  GET_BOOKING_UAPDATE_SUCCESS,
  GET_BOOKING_UAPDATE_FAIL,
  GET_MECHANIC_OTP,
  OTP_DONE,
  GET_BOOKINGLIST_APPROVE_START,
  GET_BOOKINGLIST_APPROVE_SUCCESS,
  GET_BOOKINGLIST_APPROVE_FAIL,
  GET_BOOKING_VENDOR_STATUS,
  GET_CANCLE_BOOKING_MODAL,
  GET_REASON_CHECKBOX_VENDOR,
  BOOKING_LIST_CANCLE,
  BOOKING_CANCLE_START
} from "../actions/Vendors";

const INITIAL_STATE = {
  loadingFutureBookigList: false,
  isFutureBookingListFail: false,
  vendorBookingList: [],
  FutureBookingList: [],
  isBooking: false,
  bookingData: "",
  loadingBookigUpdate: false,
  mechanicOTP: "",
  isMechanicOtp: false,
  bookingStatus: "",
  bookUserData: "",
  bookingVendorStatus: "",
  cancleBookingId:'',
  isConfirmModal:false,
  reasonCheckboxVendor:'',
  cancleReasonVendor:'',
  confirmDisableVendor:false,
  cancelBookingData:null

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FUTURE_BOOKING_LIST_START:
      {
        return {
          ...state,
          loadingFutureBookigList: true,

        };
      }
      break;
    case GET_FUTURE_BOOKING_LIST_SUCCESS:
      {
        return {
          ...state,
          loadingFutureBookigList: false,
          vendorBookingList: action.payload
        };
      }
      break;

    case GET_FUTURE_BOOKING_LIST_FAIL:
      {

        return {
          ...state,
          loadingFutureBookigList: false,
          isFutureBookingListFail: true
        };
      }
      break;

    case GET_CUSTOMER_DISTANCELIST:
      {
        return {
          ...state,
          FutureBookingList: action.payload
        };
      }
      break;

    case GET_BOOKING_MODAL:
      // let newFuturBookingList = state.FutureBookingList;

      {
        return {
          ...state,
          isBooking: true,

          bookingData: action.payload.bookData,
          bookUserData: action.payload.userData
        };
      }
      break;

    case GET_BOOKING_UAPDATE_SUCCESS:
      {
        return {
          ...state,
          loadingBookigUpdate: false,
          bookingStatus: action.payload,
          isBooking: false,
          FutureBookingList:action.payload.FutureBookingList
        };
      }
      break;

    case GET_BOOKING_UAPDATE_FAIL:
      {
        return {
          ...state,
          loadingBookigUpdate: false
        };
      }
      break;

    case GET_BOOKING_UAPDATE_START:
      {
        return {
          ...state,
          loadingBookigUpdate: true
        };
      }
      break;

    case GET_MECHANIC_OTP:
      {
        return {
          ...state,
          mechanicOTP: action.payload,
          isBooking: false,
          isMechanicOtp: true
        };
      }
      break;

    case OTP_DONE:
      {
        return {
          ...state,
          isMechanicOtp: false
        };
      }
      break;

    case GET_BOOKINGLIST_APPROVE_START:
      {
        return {
          ...state,
          loadingBookigUpdate: true
        };
      }
      break;

    case GET_BOOKINGLIST_APPROVE_SUCCESS:
      {
        return {
          ...state,
          loadingBookigUpdate: false,
          FutureBookingList:action.payload.FutureBookingList
        };
      }
      break;

    case GET_BOOKINGLIST_APPROVE_FAIL:
      {
        return {
          ...state,
          loadingBookigUpdate: false
        };
      }
      break;

    case GET_BOOKING_VENDOR_STATUS:
      {
        return {
          ...state,
          bookingVendorStatus: action.payload.data,
          FutureBookingList:[...action.payload.FutureBookingList],
          isBooking:false,
          isMechanicOtp:false
        };
      }
      break;

      case GET_CANCLE_BOOKING_MODAL:
        {
          return {
            ...state,
            isBooking:false,
            cancelBookingData: action.payload,
            isConfirmModal:true,
          };
        }
        break;

        case GET_REASON_CHECKBOX_VENDOR:
          {
            newReasonCheckbox=[false,false,false]
            newReasonCheckbox[action.payload]=true;
            newCancleReason=['Mechanic is not responding on booking.','Mechanic is not done good deal.','I Choose better option.']
            return{
              ...state,
              reasonCheckboxVendor:newReasonCheckbox,
              cancleReasonVendor:newCancleReason[action.payload],
              confirmDisableVendor:true
            };
          }
          break;

          case BOOKING_LIST_CANCLE:
            {
              return {
                ...state,
                FutureBookingList: action.payload,
                isConfirmModal:false,
                cancleReasonVendor:null,
                reasonCheckboxVendor:[false,false,false],
                loadingBookig:false,

              };
            }
            break;

            case BOOKING_CANCLE_START:
              {
                return {
                  ...state,
                  loadingBookig:true
                };
              }
              break;

    default:
      return state;
      break;
  }
};
