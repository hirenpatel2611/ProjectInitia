import { Font } from "expo";
import {AsyncStorage} from 'react-native';
import Api from "../api/api";
import {GET_USER_DATA} from "../config";

export const LOAD_FONT_SUCCESS = "ui/LOAD_FONT_SUCCESS";
export const UPDATE_LOGGED_IN_STATE = "ui/UPDATE_LOGGED_IN_STATE";
export const UPDATE_IS_VENDOR = "user/UPDATE_IS_VENDOR";
export const SET_USER_INFO = "ui/SET_USER_INFO";
export const GET_USER_PROFILE_DATA_START = "ui/GET_USER_PROFILE_DATA_START";
export const GET_USER_PROFILE_DATA = "ui/GET_USER_PROFILE_DATA";

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
  // console.error(valueUserId);
  dispatch({
    type:SET_USER_INFO,
    userId:valueUserId,
    isUserVendor:valueIsvendor
  });
};

export const updateIsVendor = bool => (dispatch, getState) => {
  dispatch({
    type: UPDATE_IS_VENDOR,
    payload: bool
  });
};

export const getUserData = () => (dispatch, getState) => {
  dispatch({
    type: GET_USER_PROFILE_DATA_START,
  });
  const {userId} = getState().user;
  let test = new FormData();
  test.append("id", userId);
  Api.post(GET_USER_DATA, test)
    .then(response => {
      dispatch({
        type: GET_USER_PROFILE_DATA,
        payload:response[0]
      });
    })
};
