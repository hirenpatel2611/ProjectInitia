import {
        GET_FUTURE_BOOKING_LIST_START,
        GET_FUTURE_BOOKING_LIST_SUCCESS,
        GET_FUTURE_BOOKING_LIST_FAIL,
        GET_CUSTOMER_DISTANCELIST,
        GET_BOOKING_MODAL,
        GET_BOOKING_APPROV,
        GET_MECHANIC_OTP,
        OTP_DONE
} from '../actions/Vendors'

const INITIAL_STATE = {
  loadingFutureBookigList: false,
  isFutureBookingListFail:false,
  vendorBookingList:[],
  FutureBookingList:[],
  isBooking:false,
  bookingData:'',
  mechanicOTP:'',
  isMechanicOtp:false,
  bookingStatus:''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

        case GET_FUTURE_BOOKING_LIST_START:
          {
            return {
              ...state,
              loadingFutureBookigList: true,
              isFutureBookingListFail:false
            };
          }
          break;
        case GET_FUTURE_BOOKING_LIST_SUCCESS:
          {
            return {
              ...state,
              loadingFutureBookigList: false,
              vendorBookingList: action.payload,
            };
          }
          break;

          case GET_FUTURE_BOOKING_LIST_FAIL:
            {
              return {
                ...state,
                loadingFutureBookigList: false,
                isFutureBookingListFail:true
              };
            }
            break;

            case GET_CUSTOMER_DISTANCELIST:
            {
              return{
                ...state,
                FutureBookingList:action.payload
                }
            }
            break;

            case GET_BOOKING_MODAL:
            {
              return{
                ...state,
                isBooking:true,
                bookingData:action.payload
                }
            }
            break;

            case GET_BOOKING_APPROV:
            {
              return{
                ...state,
                bookingStatus:action.payload
                }
            }
            break;

            case  GET_MECHANIC_OTP:
            {
              return{
                ...state,
                mechanicOTP:action.payload,
                isBooking:false,
                isMechanicOtp:true
              }

            }
              break;

              case  OTP_DONE:
              {
                return{
                  ...state,
                  isMechanicOtp:false
                }

              }
                break;

            default:
              return state;
              break;
  }
};
