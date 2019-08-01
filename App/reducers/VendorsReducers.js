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
  BOOKING_LIST_CANCLE_SUCCESS,
  BOOKING_CANCLE_START,
  GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR,
  GET_FUTURE_BOOKING_LIST_NO_FOUND,
  UPDATE_VENDOR_FULL_NAME,
  UPDATE_VENDOR_ADDRESS,
  UPDATE_VENDOR_EMAIL,
  UPDATE_VENDOR_PROFILE_START,
  LOAD_VENDOR_PROFILE,
  UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD,
  UPDATE_VENDOR_PROFILE_SUCCESS,
  UPDATE_VENDOR_PROFILE_FAIL,
  START_MAP_VENDOR_START,
  START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS,
  MECHANIC_OTP_SUBMEET_SUCCESS,
  COMPELETE_BOOKING_BY_VENDOR,
  MECHANIC_OTP_SUBMEET_FAIL,
  GET_CUSTOMER_RATING,
  GET_CUSTOMER_RATING_MODAL,
  GET_RATING_TO_CUSTOMER_START,
  GET_RATING_TO_CUSTOMER_SUCCESS,
  OTP_SHARE,
  OTP_SHARE_SUCCESS,
  VENDOR_NEXT_BOOKING,
  GET_RATING_TO_CUSTOMER_FAIL,
  GET_WALLET_AMOUNT,
  ADD_BALANCE_REQUEST_START,
  ADD_BALANCE_REQUEST_SUCCESS,
  GET_WALLET_PAYMENTID
} from "../actions/Vendors";
import { SET_ALL_STATE_TO_INITIAL } from "../actions/ui";

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
  cancleBookingId: "",
  isConfirmModal: false,
  reasonCheckboxVendor: "",
  cancleReasonVendor: "",
  confirmDisableVendor: false,
  cancelBookingData: null,
  loadingConfirm: false,
  isFutureBookingNoFound: false,
  onSubmeetProfileVendorForm: false,
  fullNameVendor: "",
  addressVendor: "",
  emailVendor: "",
  imageVendorUri: "",
  imageBase64Vendor: "",
  loadingProfileUpdate: false,
  customerDistance: "",
  loadingStartMap: false,
  customerLocation: "",
  mechanicBookedData: "",
  modalCustomerRating: false,
  customerRating: "",
  ratingId: "",
  loadingRating: false,
  bookings: "",
  walletAmount: '',
  loadingAddBalace: false,
  WalletOrderId: "",
  paymentId:''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FUTURE_BOOKING_LIST_START:
      {
        return {
          ...state,
          loadingFutureBookigList: true
        };
      }
      break;
    case GET_FUTURE_BOOKING_LIST_SUCCESS:
      {
        return {
          ...state,
          loadingFutureBookigList: false,
          vendorBookingList: action.payload,
          isFutureBookingNoFound: false
        };
      }
      break;

    case GET_FUTURE_BOOKING_LIST_FAIL:
      {
        return {
          ...state,
          loadingFutureBookigList: false,
          isFutureBookingListFail: true,
          isFutureBookingNoFound: false
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
          bookings: action.payload,
          bookingData: action.payload.bookData,
          bookUserData: action.payload.userData,
          customerDistance: action.payload.vendorDistance,
          customerLocation: action.payload.location
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
          FutureBookingList: [...action.payload.FutureBookingList]
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

          FutureBookingList: [...action.payload]
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
          FutureBookingList: [...action.payload.FutureBookingList]
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
          FutureBookingList: [...action.payload.FutureBookingList],
          isMechanicOtp: false,
          isBooking: false
        };
      }
      break;

    case GET_CANCLE_BOOKING_MODAL:
      {
        return {
          ...state,
          isBooking: false,
          cancelBookingData: action.payload,
          isConfirmModal: true
        };
      }
      break;

    case GET_REASON_CHECKBOX_VENDOR:
      {
        newReasonCheckbox = [false, false, false];
        newReasonCheckbox[action.payload] = true;
        newCancleReason = [
          "I am on another call.",
          "Customer is not done good deal.",
          "Today I m not Present."
        ];
        return {
          ...state,
          reasonCheckboxVendor: newReasonCheckbox,
          cancleReasonVendor: newCancleReason[action.payload],
          confirmDisableVendor: true
        };
      }
      break;

    case BOOKING_LIST_CANCLE_SUCCESS:
      {
        return {
          ...state,
          FutureBookingList: [...action.payload.FutureBookingList],
          isConfirmModal: false,
          cancleReasonVendor: null,
          reasonCheckboxVendor: [false, false, false],
          loadingConfirm: false
        };
      }
      break;

    case BOOKING_CANCLE_START:
      {
        return {
          ...state,
          loadingConfirm: true
        };
      }
      break;

    case GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR:
      {
        return {
          ...state,
          isConfirmModal: false
        };
      }
      break;

    case GET_FUTURE_BOOKING_LIST_NO_FOUND:
      {
        return {
          ...state,
          isFutureBookingNoFound: true,
          loadingFutureBookigList: false
        };
      }
      break;

    case UPDATE_VENDOR_FULL_NAME:
      {
        return {
          ...state,
          fullNameVendor: action.payload,
          onSubmeetProfileVendorForm: false
        };
      }
      break;

    case UPDATE_VENDOR_ADDRESS:
      {
        return {
          ...state,
          addressVendor: action.payload,
          onSubmeetProfileVendorForm: false
        };
      }
      break;

    case UPDATE_VENDOR_EMAIL:
      {
        return {
          ...state,
          emailVendor: action.payload,
          onSubmeetProfileVendorForm: false
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_START:
      {
        return {
          ...state,
          onSubmeetProfileVendorForm: true,
          loadingProfileUpdate: true
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_SUCCESS:
      {
        return {
          ...state,
          loadingProfileUpdate: false
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_FAIL:
      {
        return {
          ...state,
          loadingProfileUpdate: false
        };
      }
      break;

    case LOAD_VENDOR_PROFILE:
      {
        return {
          ...state,
          fullNameVendor: action.payload.userFullName,
          addressVendor: action.payload.userAddress,
          emailVendor: action.payload.userEmail,
          imageVendorUri: action.payload.uri
        };
      }
      break;

    case UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD:
      {
        return {
          ...state,
          imageVendorUri: action.payload.uri,
          imageBase64Vendor: action.payload.base64
        };
      }
      break;

    case START_MAP_VENDOR_START:
      {
        return {
          ...state,
          loadingStartMap: true
        };
      }
      break;

    case START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS:
      {
        return {
          ...state,
          loadingStartMap: false,
          isMechanicOtp: false,
          FutureBookingList: [...action.payload.FutureBookingList]
        };
      }
      break;

    case MECHANIC_OTP_SUBMEET_FAIL:
      {
        return {
          ...state,
          loadingStartMap: false
        };
      }
      break;

    case MECHANIC_OTP_SUBMEET_SUCCESS:
      {
        return {
          ...state,
          mechanicBookedData: action.payload
        };
      }
      break;

    case COMPELETE_BOOKING_BY_VENDOR:
      {
        return {
          ...state,
          FutureBookingList: [...action.payload.FutureBookingList],
          mechanicOTP: "",
          mechanicBookedData: "",
          ratingId: action.payload.val
        };
      }
      break;

    case GET_CUSTOMER_RATING_MODAL:
      {
        return {
          ...state,
          modalCustomerRating: true
        };
      }
      break;

    case GET_CUSTOMER_RATING:
      {
        return {
          ...state,
          customerRating: action.payload
        };
      }
      break;

    case GET_RATING_TO_CUSTOMER_START:
      {
        return {
          ...state,
          loadingRating: true
        };
      }
      break;

    case GET_RATING_TO_CUSTOMER_SUCCESS:
      {
        return {
          ...state,
          modalCustomerRating: false,
          loadingRating: false,
          customerRating: 0
        };
      }
      break;

    case GET_RATING_TO_CUSTOMER_FAIL:
      {
        return {
          ...state,
          loadingRating: false
        };
      }
      break;

    case SET_ALL_STATE_TO_INITIAL:
      {
        return {
          ...state,
          ...INITIAL_STATE
        };
      }
      break;

    case OTP_SHARE:
      {
        return {
          ...state
        };
      }
      break;

    case OTP_SHARE_SUCCESS:
      {
        return {
          ...state,
          isMechanicOtp: false
        };
      }
      break;

    case VENDOR_NEXT_BOOKING:
      {
        return {
          ...state,
          loadingStartMap: false,
          isMechanicOtp: false,
          FutureBookingList: [...action.payload.FutureBookingList],
          bookings: [...action.payload.ar],
          isBooking: true
        };
      }
      break;

    case GET_WALLET_AMOUNT:
      {
        return {
          ...state,
          walletAmount: action.payload
        };
      }
      break;

    case ADD_BALANCE_REQUEST_START:
      {
        return {
          ...state,
          loadingAddBalace: true
        };
      }
      break;

    case ADD_BALANCE_REQUEST_SUCCESS:
      {
        return {
          ...state,
          WalletOrderId: action.payload,
          loadingAddBalace: false
        };
      }
      break;

    case GET_WALLET_PAYMENTID:
    {
      return{
        ...state,
        paymentId:action.payload,
        walletAmount:'',
        WalletOrderId:''
      }
    }
    break;

    default:
      return state;
      break;
  }
};
