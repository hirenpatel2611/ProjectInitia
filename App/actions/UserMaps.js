
import {
  SET_TIMER,
  SET_SCORE
} from "./types";
import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import {GET_VENDOR} from '../config';
import { Actions } from "react-native-router-flux";
import {AsyncStorage} from 'react-native';


export const GET_VENDORS_START = "login/GET_VENDORS_START";
export const GET_VENDORS_SUCCESS = "login/GET_VENDORS_SUCCESS";

export const getVendors = () => (dispatch, getState) => {

    dispatch({
      type: GET_VENDORS_START
    });
    let test = new FormData();
    test.append("service_type", 'both');
    Api.post(GET_VENDOR, test)
      .then(response => {
        console.log(response);
        dispatch({
          type: GET_VENDORS_SUCCESS,
          payload: response
        });
      })
      .catch(error => {

      });

};
