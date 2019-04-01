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
  UPDATE_DATE_OF_BIRTH,
  UPDATE_PASSWORD_PROFILE,
  UPDATE_LANGUAGE
}
from '../actions/Register';

const INITIAL_STATE = {
  isTwoWheeler: false,
  isFourWheeler: false,
  isVendor: false,
  mobileno: '',
  otpTimeOut: 5,
  isOtpTimedOut: false,
  otp: '',
  visibleModalProfile: false,
  visibleModalOtp: false,
  name: '',
  address: '',
  email: '',
  dateOfBirth: '',
  password: '',
  language: ''
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
        return {
          ...state,
          otpTimeOut: state.otpTimeOut - 1
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
          otp: action.payload
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
          name: action.payload
        }
      }
      break;

    case UPDATE_ADDRESS:
      {
        return {
          ...state,
          address: action.payload
        }
      }
      break;

    case UPDATE_EMAIL:
      {
        return {
          ...state,
          email: action.payload
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
          password: action.payload
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

    default:
      return state;
      break;

  }

}
