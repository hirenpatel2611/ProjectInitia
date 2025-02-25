import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import { URL_USER_SIGNUP, URL_USER_OTP } from "../config";
import { Actions } from "react-native-router-flux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { ImagePicker, Permissions, Constants } from "expo";

export const UPDATE_VEHICLE_BOOL = "register/UPDATE_VEHICLE_BOOL";
export const UPDATE_CAR_BOOL = "register/UPDATE_CAR_BOOL";
export const UPDATE_USER_TYPE = "register/UPDATE_USER_TYPE";
export const UPDATE_MOBILE_NO = "register/UPDATE_MOBILE_NO";
export const UPDATE_OTP_TIMEOUT = "register/UPDATE_OTP_TIMEOUT";
export const SET_TIME_OUT = "register/SET_TIME_OUT";
export const ON_OTP_CHANGE = "register/ON_OTP_CHANGE";
export const TOGGLE_MODAL_PROFILE = "register/TOGGLE_MODAL_PROFILE";
export const TOGGLE_MODAL_OTP = "register/TOGGLE_MODAL_OTP";
export const UPDATE_NAME = "register/UPDATE_NAME";
export const UPDATE_ADDRESS = "register/UPDATE_ADDRESS";
export const UPDATE_EMAIL = "register/UPDATE_EMAIL";
export const UPDATE_MOBILE_NO_PROFILE = "register/UPDATE_MOBILE_NO_PROFILE";
export const UPDATE_DATE_OF_BIRTH = "register/UPDATE_DATE_OF_BIRTH";
export const UPDATE_PASSWORD_PROFILE = "register/UPDATE_PASSWORD_PROFILE";
export const UPDATE_CONFIRM_PASSWORD = "register/UPDATE_CONFIRM_PASSWORD";
export const UPDATE_LANGUAGE = "register/UPDATE_LANGUAGE";
export const SIGNUP_START = "register/SIGNUP_START";
export const SIGNUP_SUCCESSFUL = "register/SIGNUP_SUCCESSFUL";
export const SIGNUP_FAIL = "register/SIGNUP_FAIL";
export const REQUEST_OTP = "register/REQUEST_OTP";
export const REQUEST_OTP_SUCCESS = "register/REQUEST_OTP_SUCCESS";
export const REQUEST_OTP_FAIL = "register/REQUEST_OTP_FAIL";
export const UPDATE_ON_SUBMEET_OTP = "register/UPDATE_ON_SUBMEET_OTP";
export const UPDATE_ON_SUBMEET_SIGNUP = "register/UPDATE_ON_SUBMEET_SIGNUP";
export const GET_LOCATION_FAIL = "register/GET_LOCATION_FAIL";
export const GET_LOCATION_SUCCESS = "register/GET_LOCATION_SUCCESS";
export const SET_LOCATION_VISIBILITY = "register/SET_LOCATION_VISIBILITY";
export const SET_LOCATION = "register/SET_LOCATION";
export const UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD =
  "register/UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD";
export const UPDATE_REGISTER_DOCUMENT_UPLOAD =
  "register/UPDATE_REGISTER_DOCUMENT_UPLOAD";
export const DELETE_REGISTER_DOCUMENT = "register/DELETE_REGISTER_DOCUMENT";

export const updateVehicleBool = () => dispatch => {
  dispatch({
    type: UPDATE_VEHICLE_BOOL
  });
};

export const updateCarBool = () => async dispatch => {
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

export const requestOtp = () => (dispatch, getState) => {
  dispatch({
    type: REQUEST_OTP
  });

  const { mobileno, loading, requestOtpSuccess } = getState().register;
  let test = new FormData();
  test.append("mobile", mobileno);
  Api.post(URL_USER_OTP, test)
    .then(response => {
      if (response.loggedIn === 1) {
        dispatch({
          type: REQUEST_OTP_SUCCESS,
          payload: response.OTP
        });
        Actions.registerOTP();
      } else {
        dispatch({
          type: REQUEST_OTP_FAIL,
          payload: response.message
        });
        //alert(response.message);
      }
    })
    .catch(err => {});
};

export const setTimeOut = () => dispatch => {
  dispatch({
    type: SET_TIME_OUT
  });
};
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

export const onOTPChange = code => (dispatch, getState) => {
  dispatch({
    type: ON_OTP_CHANGE,
    payload: code
  });
};

export const toggleModalProfile = val => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_MODAL_PROFILE,
    payload: val
  });
};

export const toggleModalOtp = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_MODAL_OTP,
    payload: true
  });
};

export const updateName = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_NAME,
    payload: val
  });
};

export const updateAddress = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_ADDRESS,
    payload: val
  });
};

export const updateMobileNoProfile = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_MOBILE_NO_PROFILE,
    payload: val
  });
};

export const updateEmail = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_EMAIL,
    payload: val
  });
};

export const updateDateOfBirth = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_DATE_OF_BIRTH,
    payload: val
  });
};

export const updatePasswordProfile = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PASSWORD_PROFILE,
    payload: val
  });
};

export const updateConfirmPassword = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_CONFIRM_PASSWORD,
    payload: val
  });
};

export const updateLanguage = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_LANGUAGE,
    payload: val
  });
};

export const signupUser = () => (dispatch, getState) => {
  dispatch({
    type: SIGNUP_START,
    payload: true
  });
  const {
    name,
    address,
    email,
    password,
    language,
    mobileno,
    isVendor,
    isTwoWheeler,
    isFourWheeler,
    loadingSignupB,
    location,
    imageBase64Register,
    documentBase64Register
  } = getState().register;
  let vehicle_type = "";
  if (isTwoWheeler === true && isFourWheeler === false) {
    vehicle_type = "bike";
  } else if (isTwoWheeler === false && isFourWheeler === true) {
    vehicle_type = "Car";
  } else if (isTwoWheeler === true && isFourWheeler === true) {
    vehicle_type = "Both";
  }

  let is_vendor = 0;
  if (isVendor === true) {
    is_vendor = 1;
  } else {
    is_vendor = 0;
  }

  let test = new FormData();

  test.append("username", mobileno);
  test.append("password", password);
  test.append("device_token", "djhsgdf87sfdfs7dfsfsfs");
  test.append("device_type", "android");
  test.append("first_name", name);
  test.append("last_name", name);
  test.append("mobile", mobileno);
  test.append("email", email);
  test.append("address", address);
  test.append("service_vehicle_type", vehicle_type);
  test.append("is_vendor", is_vendor);
  test.append("profile_image", imageBase64Register);
  if (isVendor === true) {
    test.append("latitude", location.coords.latitude);
    test.append("longitude", location.coords.longitude);
  }
  Api.post(URL_USER_SIGNUP, test)
    .then(response => {
      if (response.status === 1) {
        dispatch({
          type: SIGNUP_SUCCESSFUL,
          payload: response
        });
      } else {
        dispatch({
          type: SIGNUP_FAIL,
          payload: response.message
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateOnSubmeetOtp = () => (dispatch, getState) => {
  dispatch({
    type: UPDATE_ON_SUBMEET_OTP
  });
};

export const updateOnSubmeetSignup = () => (dispatch, getState) => {
  dispatch({
    type: UPDATE_ON_SUBMEET_SIGNUP
  });
};

export const getLocationFail = () => (dispatch, getState) => {
  dispatch({
    type: GET_LOCATION_FAIL,
    payload: "Permission to access location was denied"
  });
};

export const getLocationSuccess = location => (dispatch, getState) => {
  dispatch({
    type: GET_LOCATION_SUCCESS,
    payload: location
  });
};

export const setLocation = () => (dispatch, getState) => {
  dispatch({
    type: SET_LOCATION
  });
};

export const upadteRegisterProfileImage = () => async dispatch => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true,
    allowsEditing: true,
    aspect: [4, 4]
  });
  //
  // console.log(result);

  if (!result.cancelled) {
    dispatch({
      type: UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD,
      payload: result
    });
  }
};

export const addDocument = () => async dispatch => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true,
    allowsEditing: true,
    aspect: [4, 4]
  });

  // console.log(result);

  if (!result.cancelled) {
    dispatch({
      type: UPDATE_REGISTER_DOCUMENT_UPLOAD,
      payload: result
    });
  }
};

export const deleteRegisterDocument = documnet => (dispatch, getState) => {
  const { documentRegisterUri } = getState().register;
  var index = documentRegisterUri.indexOf(documnet);
  documentRegisterUri.splice(index, 1);
  dispatch({
    type: DELETE_REGISTER_DOCUMENT,
    payload: documentRegisterUri
  });
};
