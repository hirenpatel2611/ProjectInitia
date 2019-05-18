import { SET_TIMER, SET_SCORE } from "./types";
import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import {
  GET_VENDOR,
  GET_BOOKING,
  GET_BOOKINGLIST,
  GET_VENDOR_BOOKINGLIST,
  BOOKING_UPDATE
} from "../config";
import { Actions } from "react-native-router-flux";
import { AsyncStorage, Alert } from "react-native";
import { connectTosocket } from "./Socket";

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
export const GET_BOOKING_CANCLE_START = "usermaps/GET_BOOKING_CANCLE_START";
export const GET_BOOKING_CANCLE_SUCCESS = "usermaps/GET_BOOKING_CANCLE_SUCCESS";
export const GET_BOOKING_CANCLE_FAIL = "usermaps/GET_BOOKING_CANCLE_FAIL";
export const GET_BOOKING_STATUS = "usermaps/GET_BOOKING_STATUS";
export const GET_BOOKING_CANCEL_BY_VENDOR =
  "usermaps/GET_BOOKING_CANCEL_BY_VENDOR";
export const GET_MECHANIC_CURREN_LOCATION =
  "usermaps/GET_MECHANIC_CURREN_LOCATION";
export const GET_DISTANCE_BETWEEN_USER_MECHANIC =
  "usermaps/GET_DISTANCE_BETWEEN_USER_MECHANIC";
export const GET_BOOKING_UPDATE_START = "usermaps/GET_BOOKING_UPDATE_START";
export const GET_BOOKING_UPDATE_SUCCESS = "usermaps/GET_BOOKING_UPDATE_SUCCESS";
export const GET_BOOKING_UPDATE_FAIL = "usermaps/GET_BOOKING_UPDATE_FAIL";

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
  console.log(val);
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
  const { vendorsData, location } = getState().usermaps;
  const valueUserId = await AsyncStorage.getItem("user_id");
  let test = new FormData();
  test.append("customer_id", valueUserId);
  test.append("vendor_id", vendorsData.id);
  test.append("latitude", location.coords.latitude);
  test.append("longitude", location.coords.longitude);
  Api.post(GET_BOOKING, test)
    .then(response => {
      if (response.status === 1) {
        alert(response.message);
        dispatch({
          type: GET_BOOKING_SUCCESS,
          payload: response
        });
        dispatch(connectTosocket());
      } else {
        alert(response.message);
        dispatch({
          type: GET_BOOKING_FAIL
        });
      }
    })
    .catch(error => {});
};

export const getBookingCancellation = () => (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_CANCLE_START
  });
  const { bookData } = getState().usermaps;
  let test = new FormData();
  test.append("booking_id", bookData.booking_id);
  test.append("status", "cancle");
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status !== 0) {
        dispatch({
          type: GET_BOOKING_CANCLE_SUCCESS
        });
      } else {
        dispatch({
          type: GET_BOOKING_CANCLE_FAIL
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const getBookings = () => async (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_LIST_START
  });
  const valueUserId = await AsyncStorage.getItem("user_id");
  const valueIsvendor = await AsyncStorage.getItem("is_vendor");

  let test = new FormData();
  test.append("customer_id", valueUserId);
  Api.post(GET_BOOKINGLIST, test)
    .then(response => {
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
      var disMile = responseJson.rows[0].elements[0].distance.text;
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

  //  const list = await vendorList.map( async(vendor) => {

  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
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
    })
    .catch(e => {
      //console.warn(e);
    });
  dispatch({
    type: GET_DISTANCELIST,
    payload: vendorList
  });
};

export const getBookingStatus = val => async (dispatch, getState) => {
  console.log(val);
  dispatch({
    type: GET_BOOKING_STATUS,
    payload: val
  });
  if (val.type === "CANCEL") {
    dispatch({
      type: GET_BOOKING_CANCEL_BY_VENDOR
    });
    alert(
      "Your Booking request is Cancelled by Mechanic, Please Find another Mechanic."
    );
  }
};

export const getMechanicCurrentLocation = val => (dispatch, getState) => {
  dispatch({
    type: GET_MECHANIC_CURREN_LOCATION,
    payload: val
  });
  Actions.NavigationMap();
  const { mechanicCurrentLocation, location } = getState().usermaps;

  var radlat1 =
    (Math.PI * mechanicCurrentLocation.message[0].coords.latitude) / 180;
  var radlat2 = (Math.PI * location.coords.latitude) / 180;
  var theta =
    mechanicCurrentLocation.message[0].coords.longitude -
    location.coords.longitude;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  console.log(dist);
  // if (unit=="K") { dist = dist * 1.609344 }
  // if (unit=="N") { dist = dist * 0.8684 }

  if (dist < 0.1) {
    dispatch({
      type: GET_DISTANCE_BETWEEN_USER_MECHANIC,
      payload: dist
    });
    var sts = "reached";
    dispatch(getBookingUpdateUser(sts));
  }
};

export const getBookingUpdateUser = val => (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_UPDATE_START
  });
  const { bookingStatusRes } = getState().usermaps;
  let test = new FormData();
  test.append("booking_id", bookingStatusRes.message.booking.booking_id);
  test.append("status", val);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status !== 0) {
        dispatch({
          type: GET_BOOKING_UPDATE_SUCCESS
        });
        Actions.NearbyGaraje();
      } else {
        dispatch({
          type: GET_BOOKING_UPDATE_FAIL
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};
