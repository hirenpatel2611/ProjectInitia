import TimerMixin from "react-timer-mixin";
import Api from "../api/api";

export const UPDATE_VEHICLE_BOOL = "register/UPDATE_VEHICLE_BOOL";
export const UPDATE_CAR_BOOL = "register/UPDATE_CAR_BOOL";
export const UPDATE_USER_TYPE = "register/UPDATE_USER_TYPE";
export const UPDATE_MOBILE_NO = "register/UPDATE_MOBILE_NO";
export const UPDATE_OTP_TIMEOUT = "register/UPDATE_OTP_TIMEOUT";
export const SET_TIME_OUT = "register/SET_TIME_OUT";
export const ON_OTP_CHANGE = 'register/ON_OTP_CHANGE';
export const TOGGLE_MODAL_PROFILE = "register/TOGGLE_MODAL_PROFILE";
export const TOGGLE_MODAL_OTP = "register/TOGGLE_MODAL_OTP";
export const UPDATE_NAME= 'register/UPDATE_NAME';
export const UPDATE_ADDRESS= 'register/UPDATE_ADDRESS';

export const updateVehicleBool = () => dispatch => {
  dispatch({
    type: UPDATE_VEHICLE_BOOL
  });
};

export const updateCarBool = () => dispatch => {
  dispatch({
    type: UPDATE_CAR_BOOL
  });
};

export const updateUserType = bool => dispatch => {
  dispatch({
    type: UPDATE_USER_TYPE,
    payload: bool
  });
};

export const updateMobileNo = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_MOBILE_NO,
    payload: val
  });
};
export const setTimeOut=() => (dispatch) => {
  dispatch({
    type: SET_TIME_OUT
  })
}
export const updateOTPTimeOut = () => (dispatch, getState) => {
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

export const onOTPChange = (code) => (dispatch, getState)=>{
  console.log(code);
  dispatch({
    type:ON_OTP_CHANGE,
    payload:code
  })
}

export const toggleModalProfile = () => (dispatch, getState)=>{
  dispatch({
    type:TOGGLE_MODAL_PROFILE,
    payload:true
  })
}

export const toggleModalOtp = () => (dispatch, getState)=>{
  dispatch({
    type:TOGGLE_MODAL_OTP,
    payload:true
  })
}

export const updateName = val => (dispatch, getState)=>{
  dispatch({
    type:UPDATE_NAME,
    payload:val
  })
}

export const updateAddress = val => (dispatch, getState)=>{
  dispatch({
    type:UPDATE_ADDRESS,
    payload:val
  })
}

export const updateEmail = val => (dispatch, getState)=>{
  dispatch({
    type:UPDATE_EMAIL,
    payload:val
  })
}

export const signupUser = () => (dispatch, getState)=>{
  dispatch({
    type:SIGNUP_START,
  })
}
