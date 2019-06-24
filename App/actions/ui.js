import {Asset, SplashScreen,ImagePicker,Font,AppLoading } from "expo";
import { AsyncStorage } from "react-native";
import Api from "../api/api";
import { GET_USER_DATA } from "../config";
import { Actions } from "react-native-router-flux";
import { createSocketChannel } from "./Socket";

export const LOAD_FONT_SUCCESS = "ui/LOAD_FONT_SUCCESS";
export const UPDATE_LOGGED_IN_STATE = "ui/UPDATE_LOGGED_IN_STATE";
export const UPDATE_IS_VENDOR = "user/UPDATE_IS_VENDOR";
export const SET_USER_INFO = "ui/SET_USER_INFO";
export const GET_USER_PROFILE_DATA_START = "ui/GET_USER_PROFILE_DATA_START";
export const GET_USER_PROFILE_DATA = "ui/GET_USER_PROFILE_DATA";
export const GET_USER_BOOKING_STATUS_ACCEPT =
  "ui/GET_USER_BOOKING_STATUS_ACCEPT";
  export const SET_ALL_STATE_TO_INITIAL =
    "ui/SET_ALL_STATE_TO_INITIAL";

export const loadFont = () => async dispatch => {
  await Font.loadAsync({
    "open-sans-italic": require("../../assets/fonts/OpenSans-Italic.ttf"),
    "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "circular-book": require("../../assets/fonts/CircularStd-Book.ttf"),
    "circular-bold": require("../../assets/fonts/CircularStd-Bold.ttf")
  });

  dispatch({
    type: LOAD_FONT_SUCCESS
  });
};

export const updateLoggedInState = bool => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_LOGGED_IN_STATE,
    payload: bool
  });
  const valueUserId = await AsyncStorage.getItem("user_id");
  const valueIsvendor = await AsyncStorage.getItem("is_vendor");

  dispatch({
    type: SET_USER_INFO,
    userId: valueUserId,
    isUserVendor: valueIsvendor
  });
};

export const updateIsVendor = bool => (dispatch, getState) => {
  dispatch({
    type: UPDATE_IS_VENDOR,
    payload: bool
  });
};

var i = 0;
export const getUserData = () => async (dispatch, getState) => {
  dispatch({
    type: GET_USER_PROFILE_DATA_START
  });

  const valueUserId = await AsyncStorage.getItem("user_id");

  let test = new FormData();
  test.append("id", valueUserId);
  Api.post(GET_USER_DATA, test).then(response => {

    if (response.status === 0) {
      if (i < 10) {
        dispatch(getUserData());
        i++;
      }
    }
    dispatch({
      type: GET_USER_PROFILE_DATA,
      payload: response[0]
    });

    const { userCurrentBooking } = getState().user;
    const { vendors, location } = getState().usermaps;

    if (location) {
      SplashScreen.hide();
      switch (response[0].current_booking.status) {
        case "pending":
          var vendorData;
          vendors.map(vendor => {
            if (vendor.id === response[0].current_booking.vendor_id) {
              vendorData = vendor;
            }
          });
          var bookingStatusRes = { type: "PENDING" };
          var booking_id = {
            booking_id: response[0].current_booking.booking_id
          };
          dispatch({
            type: GET_USER_BOOKING_STATUS_ACCEPT,
            payload: { bookingStatusRes, vendorData, response }
          });
          break;

        case "accept":
          var vendorData;
          vendors.map(vendor => {
            if (vendor.id === response[0].current_booking.vendor_id) {
              vendorData = vendor;
            }
          });

          var bookingStatusRes = { type: "ACCEPT" };
          var booking_id = {
            booking_id: response[0].current_booking.booking_id
          };
          dispatch({
            type: GET_USER_BOOKING_STATUS_ACCEPT,
            payload: { bookingStatusRes, vendorData, response }
          });
          break;

        case "on-the-way":
          var vendorData;
          vendors.map(vendor => {
            if (vendor.id === response[0].current_booking.vendor_id) {
              vendorData = vendor;
            }
          });

          var bookingStatusRes = { type: "ON-THE-WAY" };
          var booking_id = {
            booking_id: response[0].current_booking.booking_id
          };
          dispatch({
            type: GET_USER_BOOKING_STATUS_ACCEPT,
            payload: { bookingStatusRes, vendorData, response }
          });
          Actions.NavigationMap();
          break;

        case "reached":
          var vendorData;
          vendors.map(vendor => {
            if (vendor.id === response[0].current_booking.vendor_id) {
              vendorData = vendor;
            }
          });

          var bookingStatusRes = { type: "REACHED" };
          booking_id = { booking_id: response[0].current_booking.booking_id };
          dispatch({
            type: GET_USER_BOOKING_STATUS_ACCEPT,
            payload: { bookingStatusRes, vendorData, response }
          });
          Actions.NavigationMap();
          break;

        default:
      }
    }
  });
};

export const setAllStateToInitial = () =>  (dispatch) => {
  dispatch({
    type:SET_ALL_STATE_TO_INITIAL,
  })
}
