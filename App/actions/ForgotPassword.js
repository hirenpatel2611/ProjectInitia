import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import { Actions } from "react-native-router-flux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Constants, Location, Permissions } from "expo";
import { SEND_FORGOT_PASSWORD_OTP, SEND_FORGOT_PASSWORD } from "../config";

export const UPDATE_FORGOT_MOBILE_NUMBER =
  "register/UPDATE_FORGOT_MOBILE_NUMBER";
export const ON_FORGOT_OTP_REQUEST_START =
  "register/ON_FORGOT_OTP_REQUEST_START";
export const ON_FORGOT_OTP_REQUEST_SUCCESS =
  "register/ON_FORGOT_OTP_REQUEST_SUCCESS";
export const ON_FORGOT_OTP_REQUEST_FAIL = "register/ON_FORGOT_OTP_REQUEST_FAIL";
export const ON_FORGOT_OTP_CHANGE = "register/ON_FORGOT_OTP_CHANGE";
export const UPDATE_SUBMEET_FORGOT_OTP_FORM =
  "register/UPDATE_SUBMEET_FORGOT_OTP_FORM";
export const UPDATE_SUBMEET_FORGOT_ENTER_PASSWORD =
  "register/UPDATE_SUBMEET_FORGOT_ENTER_PASSWORD";
export const UPDATE_SUBMEET_FORGOT_REENTER_PASSWORD =
  "register/UPDATE_SUBMEET_FORGOT_REENTER_PASSWORD";
export const ON_SUBMEET_RESET_PASSWORD_START =
  "register/ON_SUBMEET_RESET_PASSWORD_START";

export const updateForgotMobileNumber = val => dispatch => {
  dispatch({
    type: UPDATE_FORGOT_MOBILE_NUMBER,
    payload: val
  });
};

export const onForgotOtpRequest = () => (dispatch, getState) => {
  dispatch({
    type: ON_FORGOT_OTP_REQUEST_START
  });

  const { forgotMobileNo } = getState().forgot;
  let test = new FormData();
  test.append("mobile", forgotMobileNo);
  Api.post(SEND_FORGOT_PASSWORD_OTP, test).then(response => {
    if (response.message === "Your OTP is created.") {
      dispatch({
        type: ON_FORGOT_OTP_REQUEST_SUCCESS,
        payload: response
      });
      Actions.ForgotOTP();
    } else {
      alert(response.message);
      dispatch({
        type: ON_FORGOT_OTP_REQUEST_FAIL
      });
    }
  });
};

export const updateForgotOTPTimeOut = () => (dispatch, getState) => {
  interval = TimerMixin.setInterval(() => {
    const { otpTimeOut } = getState().register;
    if (otpTimeOut <= 0) {
      clearInterval(interval);
    } else {
      dispatch({
        type: UPDATE_OTP_TIMEOUT
      });
    }
  }, 1000);
};

export const onForgotOTPChange = otp => dispatch => {
  dispatch({
    type: ON_FORGOT_OTP_CHANGE,
    payload: otp
  });
};

export const setForgotOTPTimeOut = () => dispatch => {
  dispatch({
    type: SET_FORGOT_OTP_TIME_OUT
  });
};

export const onSubmeetResetPassword = () => (dispatch, getState) => {
  dispatch({
    type: ON_SUBMEET_RESET_PASSWORD_START
  });
  const {
    forgotEnetrPassword,
    forgotReEnetrPassword,
    userId
  } = getState().forgot;
  if (forgotEnetrPassword === forgotReEnetrPassword) {
    let test = new FormData();
    test.append("password", forgotEnetrPassword);
    test.append("id", userId);
    Api.post(SEND_FORGOT_PASSWORD, test).then(response => {
      if (response.status === 1) {
        Actions.login();
        alert(response.message);
      }
    });
  } else {
    alert("Password not Match!");
  }
};

export const updateSubmeetForgotOtpForm = () => dispatch => {
  dispatch({
    type: UPDATE_SUBMEET_FORGOT_OTP_FORM
  });
};

export const updateForgotEnetrPassword = val => dispatch => {
  dispatch({
    type: UPDATE_SUBMEET_FORGOT_ENTER_PASSWORD,
    payload: val
  });
};

export const updateForgotReEnetrPassword = val => dispatch => {
  dispatch({
    type: UPDATE_SUBMEET_FORGOT_REENTER_PASSWORD,
    payload: val
  });
};
