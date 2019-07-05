import {
  UPDATE_FORGOT_MOBILE_NUMBER,
  ON_FORGOT_OTP_REQUEST_START,
  ON_FORGOT_OTP_REQUEST_SUCCESS,
  ON_FORGOT_OTP_REQUEST_FAIL,
  ON_FORGOT_OTP_CHANGE,
  UPDATE_SUBMEET_FORGOT_OTP_FORM,
  UPDATE_SUBMEET_FORGOT_ENTER_PASSWORD,
  UPDATE_SUBMEET_FORGOT_REENTER_PASSWORD,
  ON_SUBMEET_RESET_PASSWORD_START
} from "../actions/ForgotPassword";
import { SET_ALL_STATE_TO_INITIAL } from "../actions/ui";

const INITIAL_STATE = {
  forgotMobileNo: "",
  loadingForgotMobile: false,
  recievedForgotOTP: "",
  onSubmeetForgotOtpForm: false,
  forgotOTP: "",
  forgotEnetrPassword: "",
  forgotReEnetrPassword: "",
  userId: "",
  forgotPasswordLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FORGOT_MOBILE_NUMBER:
      {
        return {
          ...state,
          forgotMobileNo: action.payload
        };
      }
      break;

    case ON_FORGOT_OTP_REQUEST_START:
      {
        return {
          ...state,
          loadingForgotMobile: true
        };
      }
      break;

    case ON_FORGOT_OTP_REQUEST_SUCCESS:
      {
        return {
          ...state,
          loadingForgotMobile: false,
          recievedForgotOTP: action.payload.OTP,
          userId: action.payload.userId
        };
      }
      break;

    case ON_FORGOT_OTP_REQUEST_FAIL:
      {
        return {
          ...state,
          loadingForgotMobile: false
        };
      }
      break;

    case ON_FORGOT_OTP_CHANGE:
      {
        return {
          ...state,
          forgotOTP: action.payload,
          onSubmeetForgotOtpForm: false
        };
      }
      break;
    case UPDATE_SUBMEET_FORGOT_OTP_FORM:
      {
        return {
          ...state,
          onSubmeetForgotOtpForm: true
        };
      }
      break;

    case UPDATE_SUBMEET_FORGOT_ENTER_PASSWORD:
      {
        return {
          ...state,
          forgotEnetrPassword: action.payload
        };
      }
      break;

    case UPDATE_SUBMEET_FORGOT_REENTER_PASSWORD:
      {
        return {
          ...state,
          forgotReEnetrPassword: action.payload
        };
      }
      break;

    case ON_SUBMEET_RESET_PASSWORD_START:
      {
        return {
          ...state,
          forgotPasswordLoading: true
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
    default:
      return state;
      break;
  }
};
