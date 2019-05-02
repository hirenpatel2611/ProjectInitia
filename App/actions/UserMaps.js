import { SET_TIMER, SET_SCORE } from "./types";
import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import { GET_VENDOR, GET_BOOKING, GET_BOOKINGLIST } from "../config";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";

export const GET_VENDORS_START = "usermaps/GET_VENDORS_START";
export const GET_VENDORS_SUCCESS = "usermaps/GET_VENDORS_SUCCESS";
export const GET_USER_LOCATION_FAIL = "usermaps/GET_USER_LOCATION_FAIL";
export const GET_USER_LOCATION_SUCCESS = "usermaps/GET_USER_LOCATION_SUCCESS";
export const IS_MENU_VISIBLE = "usermaps/IS_MENU_VISIBLE";
export const GET_VENDOR_DETAILS = "usermaps/GET_VENDOR_DETAILS";
export const GET_VENDOR_BOOKING = "usermaps/GET_VENDOR_BOOKING";
export const GET_BOOKING_SUCCESS = "usermaps/GET_BOOKING_SUCCESS";
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

export const getVendors = () => (dispatch, getState) => {
  dispatch({
    type: GET_VENDORS_START
  });
  let test = new FormData();
  test.append("service_type", "both");
  Api.post(GET_VENDOR, test)
    .then(response => {
      console.log(response);
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

export const getVendorBooking = () => async (dispatch, getState) => {
  dispatch({
    type: GET_VENDOR_BOOKING
  });
};
export const BookVendor = () => async (dispatch, getState) => {
  dispatch({
    type: GET_VENDOR_BOOKING_START
  });
  const { vendorsData } = getState().usermaps;
  const valueUserId = await AsyncStorage.getItem("user_id");
  let test = new FormData();
  test.append("customer_id", valueUserId);
  test.append("vendor_id", vendorsData.id);
  Api.post(GET_BOOKING, test)
    .then(response => {
      if (response.status === 1) {
        alert(response.message);
        dispatch({
          type: GET_BOOKING_SUCCESS,
          payload: response
        });
      }
    })
    .catch(error => {});
};

export const getBookings = () => async (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_LIST_START
  });
  const valueUserId = await AsyncStorage.getItem("user_id");
  let test = new FormData();
  test.append("customer_id", valueUserId);
  Api.post(GET_BOOKINGLIST, test)
    .then(response => {
      if(response.status === 0){
        dispatch({
          type: GET_BOOKING_LIST_FAIL,
          payload: response
        });
      }else {
        dispatch({
          type: GET_BOOKING_LIST_SUCCESS,
          payload: response
        });
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
