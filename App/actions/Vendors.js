import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import { AsyncStorage, Alert, Share } from "react-native";
import {
  GET_FUTURE_BOOKINGLIST,
  BOOKING_UPDATE,
  SEND_MECHANIC_OTP,
  UPDATE_PROFILE,
  VERIFY_MECHANIC_OTP,
  RATING_BY_CUSTOMER
} from "../config";
import {
  connectTosocketApprov,
  connectTosocketBookingCancle,
  socketBookingOnTheWay,
  socketVendorCurrentLocation,
  socketBookingCompleted
} from "./Socket";
import {
  Asset,
  SplashScreen,
  ImagePicker,
  Permissions,
  Constants,
  TaskManager,
  Location
} from "expo";
import { Actions } from "react-native-router-flux";
import openMap from "react-native-open-maps";

export const GET_FUTURE_BOOKING_LIST_START =
  "vendors/GET_FUTURE_BOOKING_LIST_START";
export const GET_FUTURE_BOOKING_LIST_SUCCESS =
  "vendors/GET_FUTURE_BOOKING_LIST_SUCCESS";
export const GET_FUTURE_BOOKING_LIST_FAIL =
  "vendors/GET_FUTURE_BOOKING_LIST_FAIL";
export const GET_CUSTOMER_DISTANCELIST = "vendors/GET_CUSTOMER_DISTANCELIST";
export const GET_BOOKING_MODAL = "vendors/GET_BOOKING_MODAL";
export const GET_BOOKING_UAPDATE_START = "vendors/GET_BOOKING_UAPDATE_START";
export const GET_BOOKING_UAPDATE_SUCCESS =
  "vendors/GET_BOOKING_UAPDATE_SUCCESS";
export const GET_BOOKING_UAPDATE_FAIL = "vendors/GET_BOOKING_UAPDATE_FAIL";
export const GET_MECHANIC_OTP = "vendors/GET_MECHANIC_OTP";
export const OTP_DONE = "vendors/OTP_DONE";
export const GET_BOOKINGLIST_APPROVE_START =
  "vendors/GET_BOOKINGLIST_APPROVE_START";
export const GET_BOOKINGLIST_APPROVE_SUCCESS =
  "vendors/GET_BOOKINGLIST_APPROVE_SUCCESS";
export const GET_BOOKINGLIST_APPROVE_FAIL =
  "vendors/GET_BOOKINGLIST_APPROVE_FAIL";
export const GET_BOOKING_VENDOR_STATUS = "vendors/GET_BOOKING_VENDOR_STATUS";
export const GET_CANCLE_BOOKING_MODAL = "vendors/GET_CANCLE_BOOKING_MODAL";
export const GET_REASON_CHECKBOX_VENDOR = "vendors/GET_REASON_CHECKBOX_VENDOR";
export const BOOKING_LIST_CANCLE_SUCCESS =
  "vendors/BOOKING_LIST_CANCLE_SUCCESS";
export const BOOKING_CANCLE_START = "vendors/BOOKING_CANCLE_START";
export const GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR =
  "vendors/GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR";
export const GET_FUTURE_BOOKING_LIST_NO_FOUND =
  "vendors/GET_FUTURE_BOOKING_LIST_NO_FOUND";
export const UPDATE_VENDOR_FULL_NAME = "vendors/UPDATE_VENDOR_FULL_NAME";
export const UPDATE_VENDOR_ADDRESS = "vendors/UPDATE_VENDOR_ADDRESS";
export const UPDATE_VENDOR_EMAIL = "vendors/UPDATE_VENDOR_EMAIL";
export const UPDATE_VENDOR_PROFILE_START =
  "vendors/UPDATE_VENDOR_PROFILE_START";
export const LOAD_VENDOR_PROFILE = "vendors/LOAD_VENDOR_PROFILE";
export const UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD =
  "vendors/UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD";
export const UPDATE_VENDOR_PROFILE_SUCCESS =
  "vendors/UPDATE_VENDOR_PROFILE_SUCCESS";
export const UPDATE_VENDOR_PROFILE_FAIL = "vendors/UPDATE_VENDOR_PROFILE_FAIL";
export const START_MAP_VENDOR_START = "vendors/START_MAP_VENDOR_START";
export const START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS =
  "vendors/START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS";
export const MECHANIC_OTP_SUBMEET_SUCCESS =
  "vendors/MECHANIC_OTP_SUBMEET_SUCCESS";
export const MECHANIC_OTP_SUBMEET_FAIL = "vendors/MECHANIC_OTP_SUBMEET_FAIL";
export const GET_CUSTOMER_RATING = "vendors/GET_CUSTOMER_RATING";
export const GET_CUSTOMER_RATING_MODAL = "vendors/GET_CUSTOMER_RATING_MODAL";
export const COMPELETE_BOOKING_BY_VENDOR =
  "vendors/COMPELETE_BOOKING_BY_VENDOR";
export const GET_RATING_TO_CUSTOMER_START =
  "vendors/GET_RATING_TO_CUSTOMER_START";
export const GET_RATING_TO_CUSTOMER_SUCCESS =
  "vendors/GET_RATING_TO_CUSTOMER_SUCCESS";

export const getFutureBookings = () => async (dispatch, getState) => {
  dispatch({
    type: GET_FUTURE_BOOKING_LIST_START
  });
  const valueUserId = await AsyncStorage.getItem("user_id");

  let test = new FormData();
  test.append("vendor_id", valueUserId);
  Api.post(GET_FUTURE_BOOKINGLIST, test)
    .then(response => {
      if (response.status === 0) {
        if (response.message === "No booking found") {
          dispatch({
            type: GET_FUTURE_BOOKING_LIST_NO_FOUND
          });
          SplashScreen.hide();
        } else {
          dispatch({
            type: GET_FUTURE_BOOKING_LIST_FAIL,
            payload: response.message
          });
          dispatch(getFutureBookings());
        }
      } else {
        dispatch({
          type: GET_FUTURE_BOOKING_LIST_SUCCESS,
          payload: response
        });
        dispatch(getCustomerDistanceList());
      }
    })
    .catch(error => {});
};

export const getCustomerDistanceList = val => async (dispatch, getState) => {
  const { vendorBookingList } = getState().vendors;
  const { userData } = await getState().user;

  var FutureBookingList = [];
  var url = "";
  const APIKEY = "AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw";
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userData.userLatitude},${userData.userLongitude}&destinations=${vendorBookingList[0].booking_latitude},${vendorBookingList[0].booking_longitude}`;
  vendorBookingList.map(customer => {
    url =
      url + "|" + `${customer.booking_latitude},${customer.booking_longitude}`;
  });

  url = url + `&key=${APIKEY}`;

  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      for (i = 0; i < vendorBookingList.length; i++) {
        var disMile = responseJson.rows[0].elements[i].distance
          ? responseJson.rows[0].elements[i].distance.text
          : "0 mi";

        disMile = disMile.split(" ", 2);
        var disUnit = disMile[1];
        var dis = disMile[0];
        if (disUnit !== "mi") {
          if (dis > 100) {
            dis = dis / 3280.8;
            dis = parseFloat(dis.toFixed(3)) + " " + "km";
          } else {
            dis = responseJson.rows[0].elements[0].distance.text;
          }
        } else {
          dis = dis * 1.609;
          dis = parseFloat(dis.toFixed(1)) + " " + "km";
        }
        vendorBookingList[i].customer.distance = dis;
      }
    })
    .catch(e => {
      //console.warn(e);
    });
  FutureBookingList = vendorBookingList;

  dispatch({
    type: GET_CUSTOMER_DISTANCELIST,
    payload: FutureBookingList
  });
  SplashScreen.hide();
};

export const getBookingModal = val => async (dispatch, getState) => {
  Actions.FutureBooking();
  dispatch(getFutureBookings());
  dispatch({
    type: GET_BOOKING_MODAL,
    payload: val
  });
};

export const getBookingUpdate = val => (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_UAPDATE_START
  });
  const { bookingData, FutureBookingList } = getState().vendors;

  let test = new FormData();
  test.append("booking_id", bookingData.booking_id);
  test.append("status", val);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status === 1) {
        if (val === "accept") {
          FutureBookingList.map(booking => {
            if (booking.booking_id === bookingData.booking_id) {
              booking.status = "accept";
            }
          });
          dispatch(getMechanicOtp(bookingData.booking_id));
        }

        dispatch({
          type: GET_BOOKING_UAPDATE_SUCCESS,
          payload: { val, FutureBookingList }
        });
      } else {
        dispatch({
          type: GET_BOOKING_UAPDATE_FAIL
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const getMechanicOtp = val => (dispatch, getState) => {
  const { bookingData, FutureBookingList } = getState().vendors;
  let testOtp = new FormData();
  testOtp.append("booking_id", val);
  Api.post(SEND_MECHANIC_OTP, testOtp)
    .then(response => {
      if (response.status !== 0) {
        dispatch({
          type: GET_MECHANIC_OTP,
          payload: response.OTP
        });
        FutureBookingList.map(booking => {
          if (booking.booking_id === val) {
            booking.booking_otp = response.OTP;
          }
        });
        dispatch({
          type: OTP_DONE,
          payload: FutureBookingList
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const BookingListCancle = () => (dispatch, getState) => {
  dispatch({
    type: BOOKING_CANCLE_START
  });
  const {
    cancleReasonVendor,
    FutureBookingList,
    cancelBookingData
  } = getState().vendors;

  let test = new FormData();
  test.append("booking_id", cancelBookingData.booking_id);
  test.append("status", "cancle");
  test.append("reason", cancleReasonVendor);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status === 1) {
        dispatch(connectTosocketBookingCancle(cancelBookingData.customer_id));
        FutureBookingList.map(booking => {
          if (booking.booking_id === cancelBookingData.booking_id) {
            booking.status = "cancle";
          }
        });
        dispatch({
          type: BOOKING_LIST_CANCLE_SUCCESS,
          payload: FutureBookingList
        });
      } else {
        if (response.message === "something went wrong") {
          BookingListCancle();
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const BookingListApprove = val => (dispatch, getState) => {
  dispatch({
    type: GET_BOOKINGLIST_APPROVE_START
  });
  const { FutureBookingList } = getState().vendors;
  console.log(val);
  let test = new FormData();
  test.append("booking_id", val.booking_id);
  test.append("status", "accept");
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      console.log(response);
      if (response.status === 1) {
        dispatch(getMechanicOtp(val.booking_id));
        dispatch(connectTosocketApprov(val.customer_id));
        FutureBookingList.map(booking => {
          if (booking.booking_id === val.booking_id) {
            booking.status = "accept";
          }
        });
        dispatch({
          type: GET_BOOKINGLIST_APPROVE_SUCCESS,
          payload: { val, FutureBookingList }
        });
      } else {
        dispatch({
          type: GET_BOOKINGLIST_APPROVE_FAIL
        });
      }
      // dispatch(getFutureBookings());
    })
    .catch(err => {
      console.error(err);
    });
};

export const otpDone = val => (dispatch, getState) => {
  const { FutureBookingList, bookingData, mechanicOTP } = getState().vendors;
  Share.share({
    message: "Your OTP is " + `${val}`
  }).then(response => {
    console.log(response);
  });
};

export const getBookingVendorStatus = data => (dispatch, getState) => {
  const { FutureBookingList } = getState().vendors;

  FutureBookingList.map(booking => {
    if (booking.booking_id === data.message.booking_id) {
      if (data.type === "CANCEL") {
        booking.status = "cancle";
      }
      if (data.type === "REACHED") {
        booking.status = "reached";
      }
      if (data.type === "ON-THE-WAY") {
        booking.status = "on-the-way";
      }
    }
    if (data.type === "COMPLETED") {
      if (booking.booking_id === data.message.booking.booking_id) {
        booking.status = "completed";
      }
    }
  });
  dispatch({
    type: GET_BOOKING_VENDOR_STATUS,
    payload: { data, FutureBookingList }
  });
};

export const getCancleBookingModal = index => dispatch => {
  dispatch({
    type: GET_CANCLE_BOOKING_MODAL,
    payload: index
  });
};

export const getReasonCheckboxVendor = index => dispatch => {
  dispatch({
    type: GET_REASON_CHECKBOX_VENDOR,
    payload: index
  });
};

export const getCancelBookingModalCloseVendor = () => dispatch => {
  dispatch({
    type: GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR
  });
};

export const updateVendorFullName = val => dispatch => {
  dispatch({
    type: UPDATE_VENDOR_FULL_NAME,
    payload: val
  });
};
export const updateVendorAddress = val => dispatch => {
  dispatch({
    type: UPDATE_VENDOR_ADDRESS,
    payload: val
  });
};
export const updateVendorEmail = val => dispatch => {
  dispatch({
    type: UPDATE_VENDOR_EMAIL,
    payload: val
  });
};

export const updateVendorProfile = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_VENDOR_PROFILE_START
  });
  const {
    fullNameVendor,
    addressVendor,
    emailVendor,
    imageBase64Vendor
  } = getState().vendors;
  const { userData } = getState().user;
  let test = new FormData();
  test.append("id", userData.userId);
  test.append("first_name", fullNameVendor);
  test.append("address", addressVendor);
  test.append("profile_image", imageBase64Vendor);
  Api.post(UPDATE_PROFILE, test).then(response => {
    if (response.status === 1) {
      dispatch({
        type: UPDATE_VENDOR_PROFILE_SUCCESS
      });
      alert(response.message);
    } else {
      dispatch({
        type: UPDATE_VENDOR_PROFILE_FAIL
      });
    }
  });
};

export const loadVendorProfile = () => (dispatch, getState) => {
  const { userData } = getState().user;
  dispatch({
    type: LOAD_VENDOR_PROFILE,
    payload: userData
  });
};

export const upadteVendorProfileImage = () => async dispatch => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    base64: true,
    allowsEditing: true,
    aspect: [4, 4]
  });

  if (!result.cancelled) {
    dispatch({
      type: UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD,
      payload: result
    });
  }
};

export const startMapVendor = startMapData => (dispatch, getState) => {
  dispatch({
    type: START_MAP_VENDOR_START
  });

  const { FutureBookingList, mechanicOTP } = getState().vendors;
  console.log(startMapData);
  let test1 = new FormData();
  test1.append("otp", startMapData.otp);
  Api.post(VERIFY_MECHANIC_OTP, test1).then(async response => {
    console.log(response);
    if (response.status === 1) {
      dispatch({
        type: MECHANIC_OTP_SUBMEET_SUCCESS,
        payload: response
      });
      startMapData = {
        booking_id: response.booking.booking_id,
        customer_id: response.booking.customer.customer_id
      };
      console.log(startMapData);
      let test = new FormData();
      test.append("booking_id", startMapData.booking_id);
      test.append("status", "on-the-way");
      Api.post(BOOKING_UPDATE, test).then(response => {
        console.log(response);
        if (response.status === 1) {
          dispatch(socketBookingOnTheWay(startMapData));
          dispatch(socketVendorCurrentLocation());
          FutureBookingList.map(booking => {
            if (booking.booking_id === startMapData.booking_id) {
              booking.status = "on-the-way";
            }
          });
          dispatch({
            type: START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS,
            payload: FutureBookingList
          });
        }
      });
    } else {
      dispatch({
        type: MECHANIC_OTP_SUBMEET_FAIL
      });
    }
  });
};

export const goToMap = () => async (dispatch, getState) => {
  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation
  });
  const { mechanicBookedData } = getState().vendors;
  let startLat = location.coords.latitude + "," + location.coords.longitude;
  let endLat =
    mechanicBookedData.booking.booking_latitude +
    "," +
    mechanicBookedData.booking.booking_longitude;

  openMap({ start: [startLat.toString()], end: [endLat.toString()] });
};

export const getCustomerRating = rating => dispatch => {
  dispatch({
    type: GET_CUSTOMER_RATING,
    payload: rating
  });
};

export const getCustomerRatingModal = val => (dispatch, getState) => {
  const { FutureBookingList } = getState().vendors;
  dispatch({
    type: GET_CUSTOMER_RATING_MODAL
  });
  dispatch(socketBookingCompleted(val));
  FutureBookingList.map(booking => {
    if (booking.booking_id === val.booking_id) {
      (booking.status = "completed"), (booking.booking_otp = null);
    }
  });
  dispatch({
    type: COMPELETE_BOOKING_BY_VENDOR,
    payload: {
      FutureBookingList: FutureBookingList,
      val: val.customer.customer_id
    }
  });
};

export const getRatingToCustomer = val => (dispatch, getState) => {
  dispatch({
    type: GET_RATING_TO_CUSTOMER_START
  });
  const { customerRating, ratingId } = getState().vendors;
  let test = new FormData();
  test.append("vendor_id", ratingId);
  test.append("rating", customerRating);
  Api.post(RATING_BY_CUSTOMER, test).then(response => {
    if (response.status === 1) {
      dispatch({
        type: GET_RATING_TO_CUSTOMER_SUCCESS
      });
    }
  });
};
