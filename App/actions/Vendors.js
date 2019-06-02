import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import { AsyncStorage, Alert } from "react-native";
import {
  GET_FUTURE_BOOKINGLIST,
  BOOKING_UPDATE,
  SEND_MECHANIC_OTP
} from "../config";
import {connectTosocketApprov,connectTosocketBookingCancle} from "./Socket";
import { Asset, SplashScreen } from "expo";
import { Actions } from "react-native-router-flux";

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
export const BOOKING_LIST_CANCLE = "vendors/BOOKING_LIST_CANCLE";
export const BOOKING_CANCLE_START = "vendors/BOOKING_CANCLE_START";


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
            type: GET_FUTURE_BOOKING_LIST_FAIL,
            payload: response.message
          });
          SplashScreen.hide();
        } else {
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
  const { vendors } = getState().usermaps;
  const vendorLatitude = await AsyncStorage.getItem("user_latitude");
  const vendorLongitude = await AsyncStorage.getItem("user_longitude");

  var FutureBookingList = [];
  var url = "";
  const APIKEY = "AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw";
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${vendorLatitude},${vendorLongitude}&destinations=${
    vendorBookingList[0].booking_latitude
  },${vendorBookingList[0].booking_longitude}`;
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
  const { bookingData,FutureBookingList } = getState().vendors;
  let test = new FormData();
  test.append("booking_id", bookingData.booking_id);
  test.append("status", val);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status === 1) {
        FutureBookingList.map(booking => {
          if (booking.booking_id === bookingData.booking_id) {
            booking.status = "accept";
          }
        });
        dispatch({
          type: GET_BOOKING_UAPDATE_SUCCESS,
          payload: {val,FutureBookingList}
        });
        if (val === "accept") {

          dispatch(getMechanicOtp(bookingData.booking_id));
        }
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
  const { bookingData } = getState().vendors;
  let testOtp = new FormData();
  testOtp.append("booking_id", val);
  Api.post(SEND_MECHANIC_OTP, testOtp)
    .then(response => {
      if (response.status !== 0) {
        dispatch({
          type: GET_MECHANIC_OTP,
          payload: response.OTP
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const BookingListCancle = () => (dispatch, getState) => {

  dispatch({
    type:BOOKING_CANCLE_START,

  })
  const { cancleReasonVendor,FutureBookingList,cancelBookingData } = getState().vendors;

  let test = new FormData();
  test.append("booking_id", cancelBookingData.booking_id);
  test.append("status", "cancle");
  test.append("reason", cancleReasonVendor);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if(response.status === 1){
        FutureBookingList.map(booking => {
          if (booking.booking_id === cancelBookingData.booking_id) {
            booking.status = "cancle";
          }
        });
        dispatch({
          type:BOOKING_LIST_CANCLE,
          payload:FutureBookingList
        });
        dispatch(connectTosocketBookingCancle(cancelBookingData.customer_id))
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

  let test = new FormData();
  test.append("booking_id", val);
  test.append("status", "accept");
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status === 1) {
        FutureBookingList.map(booking => {
          if (booking.booking_id === val) {
            booking.status = "accept";
          }
        });
        dispatch({
          type: GET_BOOKINGLIST_APPROVE_SUCCESS,
          payload: {val,FutureBookingList}
        });
        dispatch(getMechanicOtp(val));

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

export const otpDone = () => (dispatch, getState) => {
  dispatch({
    type: OTP_DONE
  });
};

export const getBookingVendorStatus = data => (dispatch,getState) => {
  const {FutureBookingList} = getState().vendors;

    FutureBookingList.map(booking => {
      if (booking.booking_id === data.message.booking_id) {
        if(data.type === 'CANCEL'){
        booking.status = "cancle";
       }
        if(data.type === 'REACHED'){
          booking.status = "reached";
        }
        if(data.type === 'ON-THE-WAY'){
          booking.status = "on-the-way";
        }
      } else
      if(booking.booking_id === data.message.booking.booking_id)
      {
        if(data.type === 'COMPLETED'){
          booking.status = "completed";
        }
      }
    });
  dispatch({
    type: GET_BOOKING_VENDOR_STATUS,
    payload: {data,FutureBookingList}
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
