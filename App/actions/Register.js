import TimerMixin from "react-timer-mixin";
import { Clipboard } from "react-native";
import Api from "../api/api";
import { URL_USER_SIGNUP, URL_USER_OTP } from "../config";
import { Actions } from "react-native-router-flux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Constants from "expo-constants";
import * as Location from "expo-location";

export const UPDATE_VEHICLE_BOOL = "register/UPDATE_VEHICLE_BOOL";
export const UPDATE_CAR_BOOL = "register/UPDATE_CAR_BOOL";
export const UPDATE_HEAVY_VEHICLE_BOOL = "register/UPDATE_HEAVY_VEHICLE_BOOL";
export const UPDATE_TOWING_SERVICE_BOOL = "register/UPDATE_TOWING_SERVICE_BOOL";
export const UPDATE_TYRE_SERVICE_BOOL = "register/UPDATE_TYRE_SERVICE_BOOL";
export const UPDATE_USER_TYPE = "register/UPDATE_USER_TYPE";
export const UPDATE_MOBILE_NO = "register/UPDATE_MOBILE_NO";
export const UPDATE_OTP_TIMEOUT = "register/UPDATE_OTP_TIMEOUT";
export const SET_TIME_OUT = "register/SET_TIME_OUT";
export const ON_OTP_CHANGE = "register/ON_OTP_CHANGE";
export const TOGGLE_MODAL_PROFILE = "register/TOGGLE_MODAL_PROFILE";
export const TOGGLE_MODAL_OTP = "register/TOGGLE_MODAL_OTP";
export const UPDATE_WORSHOP_NAME = "register/UPDATE_WORSHOP_NAME";
export const UPDATE_NAME = "register/UPDATE_NAME";
export const UPDATE_ADDRESS = "register/UPDATE_ADDRESS";
export const UPDATE_EMAIL = "register/UPDATE_EMAIL";
export const UPDATE_MOBILE_NO_PROFILE = "register/UPDATE_MOBILE_NO_PROFILE";
export const UPDATE_DATE_OF_BIRTH = "register/UPDATE_DATE_OF_BIRTH";
export const UPDATE_PASSWORD_PROFILE = "register/UPDATE_PASSWORD_PROFILE";
export const UPDATE_CONFIRM_PASSWORD = "register/UPDATE_CONFIRM_PASSWORD";
export const UPDATE_STATE_AND_CODE = "register/UPDATE_STATE_AND_CODE";
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
export const SET_LOCATION = "register/SET_LOCATION";
export const UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD =
  "register/UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD";
export const UPDATE_REGISTER_DOCUMENT_UPLOAD =
  "register/UPDATE_REGISTER_DOCUMENT_UPLOAD";
export const DELETE_REGISTER_DOCUMENT = "register/DELETE_REGISTER_DOCUMENT";
export const UPDATE_GSTIN = "register/UPDATE_GSTIN";
export const READ_FROM_CLIP_BOARD = "register/READ_FROM_CLIP_BOARD";
export const UPDATE_REFERAL_CODE = "register/UPDATE_REFERAL_CODE";
export const VERIFY_GSTIN_SUCCESS = "register/VERIFY_GSTIN_SUCCESS";
export const VERIFY_GSTIN_FAIL = "register/VERIFY_GSTIN_FAIL";
export const GET_AGREE_CHECKBOX = "register/GET_AGREE_CHECKBOX";

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
export const updateHeavyVehicleBool = () => dispatch => {
  dispatch({
    type: UPDATE_HEAVY_VEHICLE_BOOL
  });
};

export const updateTowingServiceBool = () => async dispatch => {
  dispatch({
    type: UPDATE_TOWING_SERVICE_BOOL
  });
};

export const updateTyreServiceBool = () => async dispatch => {
  dispatch({
    type: UPDATE_TYRE_SERVICE_BOOL
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

export const updateWorkshopName = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_WORSHOP_NAME,
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
      console.log(response);
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

export const onOTPChange = code => dispatch => {
  dispatch({
    type: ON_OTP_CHANGE,
    payload: code
  });
};

export const toggleModalProfile = val => dispatch => {
  dispatch({
    type: TOGGLE_MODAL_PROFILE,
    payload: val
  });
};

export const toggleModalOtp = () => dispatch => {
  dispatch({
    type: TOGGLE_MODAL_OTP,
    payload: true
  });
};

export const updateName = val => dispatch => {
  dispatch({
    type: UPDATE_NAME,
    payload: val
  });
};

export const updateAddress = val => dispatch => {
  dispatch({
    type: UPDATE_ADDRESS,
    payload: val
  });
};

export const updateStateAndCode = index => dispatch => {
  dispatch({
    type: UPDATE_STATE_AND_CODE,
    payload: index
  });
}

export const updateMobileNoProfile = val => dispatch => {
  dispatch({
    type: UPDATE_MOBILE_NO_PROFILE,
    payload: val
  });
};

export const updateEmail = val => dispatch => {
  dispatch({
    type: UPDATE_EMAIL,
    payload: val
  });
};

export const updateGstin = val => dispatch => {
  dispatch({
    type: UPDATE_GSTIN,
    payload: val
  });
  console.log(val.length);
  if(val.length === 15){
    dispatch(verifyGSTIN())
  }
};

export const updateDateOfBirth = val => dispatch => {
  dispatch({
    type: UPDATE_DATE_OF_BIRTH,
    payload: val
  });
};

export const updatePasswordProfile = val => dispatch => {
  dispatch({
    type: UPDATE_PASSWORD_PROFILE,
    payload: val
  });
};

export const updateConfirmPassword = val => dispatch => {
  dispatch({
    type: UPDATE_CONFIRM_PASSWORD,
    payload: val
  });
};

export const updateLanguage = val => dispatch => {
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
    workshop_name,
    gstin,
    name,
    address,
    email,
    password,
    language,
    mobileno,
    isVendor,
    isTwoWheeler,
    isFourWheeler,
    isHeavyVehicle,
    isTowingService,
    isTyreService,
    loadingSignupB,
    locationVendor,
    imageBase64Register,
    documentBase64Register,
    referalCode
  } = getState().register;

  let vehicle_type = [];
  if (isTwoWheeler === true) {
    vehicle_type = vehicle_type.concat("bike");
  }
  if (isFourWheeler === true) {
    vehicle_type = vehicle_type.concat("car");
  }
  if (isHeavyVehicle === true) {
    vehicle_type = vehicle_type.concat("Heavy_Vehicle");
  }
  if (isTowingService === true) {
    vehicle_type = vehicle_type.concat("Towing_Service");
  }
  if (isTyreService === true) {
    vehicle_type = vehicle_type.concat("Tyre_Service");
  }

  let is_vendor = 0;
  if (isVendor === true) {
    is_vendor = 1;
  } else {
    is_vendor = 0;
  }
  vehicle_type = JSON.stringify(vehicle_type);
  var DocumentBase64Register = JSON.stringify(documentBase64Register);
  let test = new FormData();
  test.append("username", mobileno);
  test.append("password", password);
  test.append("device_token", "djhsgdf87sfdfs7dfsfsfs");
  test.append("device_type", "android");
  test.append("first_name", name);
  test.append("last_name", name);
  test.append("mobile", mobileno);
  test.append("address", isVendor?JSON.stringify(address):address);
  test.append("email", email);
  test.append("service_vehicle_type", vehicle_type);
  test.append("is_vendor", is_vendor);
  test.append("profile_image", imageBase64Register);
  test.append("referal_code", referalCode);
  if (isVendor === true) {
    test.append("gstin", gstin);
    test.append("workshop_name", workshop_name);
    test.append("latitude", locationVendor.coords.latitude);
    test.append("longitude", locationVendor.coords.longitude);
    test.append("other_image", DocumentBase64Register);
  }
  console.log(test);
  Api.post(URL_USER_SIGNUP, test)
    .then(response => {
      console.log(response);
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
    aspect: [4, 4],
    key: "123"
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

export const readFromClipboard = () => async dispatch => {
  const content = await Clipboard.getString();
  console.log(content);
  dispatch({
    type: READ_FROM_CLIP_BOARD,
    payload: content
  });
};

export const updateReferalCode = code => dispatch => {
  dispatch({
    type: UPDATE_REFERAL_CODE,
    payload: code
  });
};

export const verifyGSTIN = () => (dispatch,getState) => {
  const {gstin} = getState().register;
  //https://appyflow.in/api/verifyGST?gstNo=24AAECS7339H1Z8&key_secret=KHhy1rgT2NhzI8PFZQrJxvq5f3l1
  let url = `https://appyflow.in/api/verifyGST?gstNo=${gstin}&key_secret=KHhy1rgT2NhzI8PFZQrJxvq5f3l1`
  console.log(url);
  fetch(url).then((res)=>res.json())
  .then(responseJson => {console.log(responseJson);
    if(responseJson.error === true){
      dispatch({
        type:VERIFY_GSTIN_FAIL
      })
    }else {
      console.log(responseJson.taxpayerInfo.lgnm);
      dispatch({
        type:VERIFY_GSTIN_SUCCESS
      })
    }
  })
}

export const getagreeCheckbox = () => (dispatch) => {
  console.log('hhh');
  dispatch({
    type:GET_AGREE_CHECKBOX,
  })
}
