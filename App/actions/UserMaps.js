import { SET_TIMER, SET_SCORE } from "./types";
import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import {
  GET_VENDOR,
  GET_BOOKING,
  GET_BOOKINGLIST,
  GET_VENDOR_BOOKINGLIST
} from "../config";
import { Actions } from "react-native-router-flux";
import { AsyncStorage, Alert } from "react-native";

export const GET_VENDORS_START = "usermaps/GET_VENDORS_START";
export const GET_VENDORS_SUCCESS = "usermaps/GET_VENDORS_SUCCESS";
export const GET_USER_LOCATION_FAIL = "usermaps/GET_USER_LOCATION_FAIL";
export const GET_USER_LOCATION_SUCCESS = "usermaps/GET_USER_LOCATION_SUCCESS";
export const IS_MENU_VISIBLE = "usermaps/IS_MENU_VISIBLE";
export const GET_VENDOR_DETAILS = "usermaps/GET_VENDOR_DETAILS";
export const CLOSE_VENDOR_DETAIL_MODAL = "usermaps/closeVendorDetailModal";
export const GET_BOOKING_SUCCESS = "usermaps/GET_BOOKING_SUCCESS";
export const GET_BOOKING_FAIL = "usermaps/GET_BOOKING_FAIL";
export const GET_VENDOR_BOOKING_START = "usermaps/GET_VENDOR_BOOKING_START";
export const GET_BOOKING_LIST_START = "usermaps/GET_BOOKING_LIST_START";
export const GET_BOOKING_LIST_SUCCESS = "usermaps/GET_BOOKING_LIST_SUCCESS";
export const GET_BOOKING_LIST_FAIL = "usermaps/GET_BOOKING_LIST_FAIL";
export const UPDATE_FILTER_VEHICLE_BOOL = "usermaps/UPDATE_FILTER_VEHICLE_BOOL";
export const UPDATE_FILTER_CAR_BOOL = "usermaps/UPDATE_FILTER_CAR_BOOL";
export const UPDATE_FILTER_RATING = "usermaps/UPDATE_FILTER_RATING";
export const UPDATE_FILTER_CHECKED1 = "usermaps/UPDATE_FILTER_CHECKED1";
export const UPDATE_FILTER_CHECKED2 = "usermaps/UPDATE_FILTER_CHECKED2";
export const UPDATE_FILTER_CHECKED3 = "usermaps/UPDATE_FILTER_CHECKED3";
export const UPDATE_FILTER_DISTANCE = "usermaps/UPDATE_FILTER_DISTANCE";
export const RESET_FILTER = "usermaps/RESET_FILTER";
export const VENDOR_DISTANCE = "usermaps/VENDOR_DISTANCE";
export const GET_DISTANCE = "usermaps/GET_DISTANCE";
export const GET_DISTANCELIST = "usermaps/GET_DISTANCELIST";
export const GET_BOOKING_CANCLE = "usermaps/GET_BOOKING_CANCLE";

export const getVendors = () => (dispatch, getState) => {
  dispatch({
    type: GET_VENDORS_START
  });
  let test = new FormData();
  test.append("service_type", "both");
  Api.post(GET_VENDOR, test)
    .then(response => {
      dispatch({
        type: GET_VENDORS_SUCCESS,
        payload: response
      });
    })
    .catch(error => {});
};

export const getUserLocationFail = () => (dispatch, getState) => {
  dispatch({
    type: GET_USER_LOCATION_FAIL,
    payload: "Permission to access location was denied"
  });
};

export const getUserLocationSuccess = location => (dispatch, getState) => {
  dispatch({
    type: GET_USER_LOCATION_SUCCESS,
    payload: location
  });
};

export const getVenderDetails = val => (dispatch, getState) => {
  dispatch({
    type: GET_VENDOR_DETAILS,
    payload: val
  });
};


export const closeVendorDetailModal = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VENDOR_DETAIL_MODAL
  });
};



export const BookVendor = () => async (dispatch, getState) => {
  dispatch({
    type: GET_VENDOR_BOOKING_START
  });
  const { vendorsData,location } = getState().usermaps;
  const valueUserId = await AsyncStorage.getItem("user_id");
  let test = new FormData();
  test.append("customer_id", valueUserId);
  test.append("vendor_id", vendorsData.id);
  test.append("latitude",location.coords.latitude);
  test.append("longitude",location.coords.longitude);
  Api.post(GET_BOOKING, test)
    .then(response => {
      if (response.status === 1) {
        alert(response.message);
        dispatch({
          type: GET_BOOKING_SUCCESS,
          payload: response
        });
      } else {
        alert(response.message);
        dispatch({
          type: GET_BOOKING_FAIL
        });
      }
    })
    .catch(error => {});
};

export const getBookingCancellation = () => dispatch => {
  dispatch({
    type: GET_BOOKING_CANCLE
  });
};

export const getBookings = () => async (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_LIST_START
  });
  const valueUserId = await AsyncStorage.getItem("user_id");
  const valueIsvendor = await AsyncStorage.getItem("is_vendor");
  if (valueIsvendor === "1") {
    var postApi = GET_VENDOR_BOOKINGLIST;
    var parameter = "vendor_id";
  } else {
    postApi = GET_BOOKINGLIST;
    parameter = "customer_id";
  }
  let test = new FormData();
  test.append(parameter, valueUserId);
  Api.post(postApi, test)
    .then(response => {
      console.log(response);
      if (response.status === 0) {
        dispatch({
          type: GET_BOOKING_LIST_FAIL,
          payload: response
        });
      } else {
        dispatch({
          type: GET_BOOKING_LIST_SUCCESS,
          payload: response
        });
        dispatch(getDistanceList());
      }
    })
    .catch(error => {});
};

export const updateFilterVehicleBool = () => dispatch => {
  dispatch({
    type: UPDATE_FILTER_VEHICLE_BOOL
  });
};

export const updateFilterCarBool = () => async dispatch => {
  dispatch({
    type: UPDATE_FILTER_CAR_BOOL
  });
};

export const getFilterRating = val => async dispatch => {
  dispatch({
    type: UPDATE_FILTER_RATING,
    payload: val
  });
};

export const getFilterCheckBox1 = () => async dispatch => {
  dispatch({
    type: UPDATE_FILTER_CHECKED1
  });
};

export const getFilterCheckBox2 = () => async dispatch => {
  dispatch({
    type: UPDATE_FILTER_CHECKED2
  });
};

export const getFilterCheckBox3 = () => async dispatch => {
  dispatch({
    type: UPDATE_FILTER_CHECKED3
  });
};

export const getFilterDistance = val => async dispatch => {
  dispatch({
    type: UPDATE_FILTER_DISTANCE,
    payload: val
  });
};

export const resetFilter = val => async dispatch => {
  dispatch({
    type: RESET_FILTER,
    payload: val
  });
};

export const getDistance = () => async (dispatch, getState) => {
  const { vendorsData, location } = getState().usermaps;

  const mode = "driving"; // 'walking';
  const origin = location.coords;
  const destination = {
    latitude: vendorsData.latitude,
    longitude: vendorsData.longitude
  };
  const APIKEY = "AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw";
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
    origin.latitude
  },${origin.longitude}&destinations=${destination.latitude},${
    destination.longitude
  }&key=${APIKEY}`;

  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      var disMile = responseJson.rows[0].elements[0].distance.text;
      disMile = disMile.split(" ", 2);
      var dis = disMile[0];
      dis = dis * 1.609;
      console.log(dis);
      dis = parseFloat(dis.toFixed(1));
      dispatch({
        type: GET_DISTANCE,
        payload: dis
      });
    })
    .catch(e => {
      //console.warn(e);
    });
};

export const getDistanceList = val => async (dispatch, getState) => {
  const { vendorList, location } = getState().usermaps;

  const mode = "driving"; // 'walking';
  const origin = location.coords;
  var destinationList = [];
  var originList = [];
  var url = "";
  const APIKEY = "AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw";
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
    location.coords.latitude
  },${location.coords.longitude}&destinations=${
    vendorList[0].vendor.latitude
  },${vendorList[0].vendor.latitude}`;
  vendorList.map(vendor => {
    url = url + "|" + `${vendor.vendor.latitude},${vendor.vendor.longitude}`;
  });

  url = url + `&key=${APIKEY}`;
  console.log(url);

  //  const list = await vendorList.map( async(vendor) => {

  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);

      for (i = 0; i < vendorList.length; i++) {
        var disMile = responseJson.rows[0].elements[i].distance
          ? responseJson.rows[0].elements[i].distance.text
          : "0 mi";

        disMile = disMile.split(" ", 2);
        var dis = disMile[0];
        dis = dis * 1.609;

        dis = parseFloat(dis.toFixed(1));

        vendorList[i].vendor.distance = dis;
      }

      console.log(dis);
    })
    .catch(e => {
      //console.warn(e);
    });
  dispatch({
    type: GET_DISTANCELIST,
    payload: vendorList
  });
};
