import { SET_TIMER, SET_SCORE } from "./types";
import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import { GET_VENDOR } from "../config";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";

export const GET_VENDORS_START = "usermaps/GET_VENDORS_START";
export const GET_VENDORS_SUCCESS = "usermaps/GET_VENDORS_SUCCESS";
export const GET_USER_LOCATION_FAIL = "usermaps/GET_USER_LOCATION_FAIL";
export const GET_USER_LOCATION_SUCCESS = "usermaps/GET_USER_LOCATION_SUCCESS";
export const IS_MENU_VISIBLE = "usermaps/IS_MENU_VISIBLE";

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
  console.log(location);
  dispatch({
    type: GET_USER_LOCATION_SUCCESS,
    payload: location
  });
};

export const isMenuVisible = (bool) => (dispatch, getState) => {
  dispatch({
    type: IS_MENU_VISIBLE,
    payload: bool
  });
};
