import { SET_TIMER, SET_SCORE } from "./types";
import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import { GET_VENDOR,GET_BOOKING } from "../config";
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

export const getVenderDetails = (val) => (dispatch, getState) => {
  dispatch({
    type: GET_VENDOR_DETAILS,
    payload: val
  });
};

export const getVendorBooking = () => async(dispatch, getState) => {
  dispatch({
    type: GET_VENDOR_BOOKING,
  });
    const { vendorsData, } = getState().usermaps;
    const valueUserId = await AsyncStorage.getItem("user_id");

    let test = new FormData();
    test.append("customer_id", valueUserId);
    test.append("vendor_id", vendorsData.id);
    Api.post(GET_BOOKING, test)
      .then(response => {
        console.log(response);
        dispatch({
          type: GET_BOOKING_SUCCESS,
          payload: response
        });
      })
      .catch(error => {});
};
