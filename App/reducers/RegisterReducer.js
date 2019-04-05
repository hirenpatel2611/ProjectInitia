import {

  UPDATE_VEHICLE_BOOL,
  UPDATE_CAR_BOOL,
  UPDATE_USER_TYPE,
  UPDATE_MOBILE_NO,
  UPDATE_OTP_TIMEOUT,
  SET_TIME_OUT,
  ON_OTP_CHANGE,
  TOGGLE_MODAL_PROFILE,
  TOGGLE_MODAL_OTP,
  UPDATE_NAME,
  UPDATE_ADDRESS,
  UPDATE_EMAIL,
  UPDATE_MOBILE_NO_PROFILE,
  UPDATE_DATE_OF_BIRTH,
  UPDATE_PASSWORD_PROFILE,
  UPDATE_CONFIRM_PASSWORD,
  UPDATE_LANGUAGE,
  SIGNUP_START,
  SIGNUP_SUCCESSFUL,
  REQUEST_OTP,
  REQUEST_OTP_SUCCESS,
  UPDATE_ON_SUBMEET_OTP,
  UPDATE_ON_SUBMEET_SIGNUP
}
from '../actions/Register';

const INITIAL_STATE = {
  isTwoWheeler: false,
  isFourWheeler: false,
  isVendor: false,
  mobileno: '',
  otpTimeOut: 59,
  isOtpTimedOut: false,
  otp: '',
  visibleModalProfile: false,
  visibleModalOtp: false,
  name: '',
  address: '',
  mobilenoProfile: '',
  email: '',
  dateOfBirth: '',
  password: '',
  confirmPassword: '',
  language: '',
  loadingSignup: false,
  recievedOTP: '',
  loading: false,
  onSubmeetOtpForm: false,
  onSubmeetSignupForm: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_VEHICLE_BOOL:
      {
        return {
          ...state,
          isTwoWheeler: !state.isTwoWheeler
        }
      }
      break;

    case UPDATE_CAR_BOOL:
      {
        return {
          ...state,
          isFourWheeler: !state.isFourWheeler
        }
      }
      break;

    case UPDATE_USER_TYPE:
      {
        return {
          ...state,
          isVendor: action.payload
        }
      }
      break;

    case UPDATE_MOBILE_NO:
      {
        return {
          ...state,
          mobileno: action.payload
        }
      }
      break;

    case UPDATE_OTP_TIMEOUT:
      {
        //console.log(state.otpTimeOut);
        return {
          ...state,
          otpTimeOut: state.otpTimeOut - 1,
          recievedOTP: state.otpTimeOut === 1 ? '' : state.recievedOTP
        }
      }
      break;

    case SET_TIME_OUT:
      {
        return {
          ...state,
          otpTimeOut: INITIAL_STATE.otpTimeOut
        }
      }
      break;

    case ON_OTP_CHANGE:
      {
        return {
          ...state,
          otp: action.payload,
          onSubmeetOtpForm: false
        }
      }
      break;

    case TOGGLE_MODAL_PROFILE:
      {
        return {
          ...state,
          visibleModalProfile: !state.visibleModalProfile
        }
      }
      break;

    case TOGGLE_MODAL_OTP:
      {
        return {
          ...state,
          visibleModalOtp: !state.visibleModalOtp
        }
      }
      break;

    case UPDATE_NAME:
      {
        return {
          ...state,
          name: action.payload,
          onSubmeetSignupForm: false
        }
      }
      break;

    case UPDATE_ADDRESS:
      {
        return {
          ...state,
          address: action.payload,
          onSubmeetSignupForm: false
        }
      }
      break;

    case UPDATE_MOBILE_NO_PROFILE:
      {
        return {
          ...state,
          mobilenoProfile: action.payload,
          onSubmeetSignupForm: false
        }
      }
      break;

    case UPDATE_EMAIL:
      {
        return {
          ...state,
          email: action.payload,
          onSubmeetSignupForm: false
        }
      }
      break;

    case UPDATE_DATE_OF_BIRTH:
      {
        return {
          ...state,
          dateOfBirth: action.payload
        }
      }
      break;

    case UPDATE_PASSWORD_PROFILE:
      {
        return {
          ...state,
          password: action.payload,
          onSubmeetSignupForm: false
        }
      }
      break;

    case UPDATE_CONFIRM_PASSWORD:
      {
        return {
          ...state,
          confirmPassword: action.payload,
          onSubmeetSignupForm: false
        }
      }
      break;

    case UPDATE_LANGUAGE:
      {
        return {
          ...state,
          langauge: action.payload
        }
      }
      break;

    case SIGNUP_START:
      {
        console.log(loadingSignup);
        return {
          ...state,
          loadingSignup: true
        }
      }
      break;

    case SIGNUP_SUCCESSFUL:
      {
        return {
          ...state,
          loadingSignup: true
        }
      }
      break;

    case REQUEST_OTP:
      {
        return {
          ...state,
          loading: true
        }
      }

    case REQUEST_OTP_SUCCESS:
      {

        return {
          ...state,
          recievedOTP: action.payload.toString(),
          loading: false
        }
      }
      break;

    case UPDATE_ON_SUBMEET_OTP:
      {
        return {
          ...state,
          onSubmeetOtpForm: true,
        }
      }
      break;

    case UPDATE_ON_SUBMEET_SIGNUP:
      {
        return {
          ...state,
          onSubmeetSignupForm: true,
        }
      }
      break;

    default:
      return state;
      break;

  }

}
