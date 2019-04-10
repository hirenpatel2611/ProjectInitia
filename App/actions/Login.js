
import {
  SET_TIMER,
  SET_SCORE
} from "./types";
import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import {URL_USER_LOGIN} from '../config';
import { Actions } from "react-native-router-flux";


export const UPDATE_PASSWORD = "login/UPDATE_PASSWORD";
export const UPDATE_MOBILE_NUMBER = "login/UPDATE_MOBILE_NUMBER";
export const LOGIN_START = "login/LOGIN_START";
export const LOGIN_FAILED = 'login/LOGIN_FAILED';
export const LOGIN_SUCCESSFUL = 'login/LOGIN_SUCCESSFUL';
export const ON_SUBMEET_LOGIN_FORM = 'login/ON_SUBMEET_LOGIN_FORM';

export const updateMobileNumber = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_MOBILE_NUMBER,
    payload: val
  });
};

export const updatePassword = val => (dispatch, getState) => {
  console.log('action',val);
  dispatch({
    type: UPDATE_PASSWORD,
    payload: val
  });
};

export const loginUser = () => (dispatch, getState) => {

    dispatch({
      type: LOGIN_START
    });
    const {mobileno,password} = getState().login;
    //console.log(mobileno);
    let test = new FormData();
    test.append("username", mobileno);
    test.append("password", password);
    test.append("device_token", 'djhsgdf87sfdfs7dfsfsfs');
    test.append("device_type", "android");
    Api.post(URL_USER_LOGIN, test)
      .then(response => {
          console.log(response);
        dispatch({
          type: LOGIN_SUCCESSFUL,
          payload: response.status
        });
        if(response.status === 1){
          Actions.filter();
        }else {
          alert("Authenticaton Fail!!!");
        }
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAILED,
          payload: error.message
        });
      });

};

export const updateOnSubmeetLoginForm = () => (dispatch, getState) => {
  dispatch({
    type: ON_SUBMEET_LOGIN_FORM,
  });
};
