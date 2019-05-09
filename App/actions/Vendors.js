import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import {AsyncStorage,Alert} from 'react-native';
import {
  GET_FUTURE_BOOKINGLIST,
  BOOKING_UPDATE
} from "../config";

export const GET_FUTURE_BOOKING_LIST_START = "vendors/GET_FUTURE_BOOKING_LIST_START";
export const GET_FUTURE_BOOKING_LIST_SUCCESS = "vendors/GET_FUTURE_BOOKING_LIST_SUCCESS";
export const GET_FUTURE_BOOKING_LIST_FAIL = "vendors/GET_FUTURE_BOOKING_LIST_FAIL";
export const GET_CUSTOMER_DISTANCELIST = "vendors/GET_CUSTOMER_DISTANCELIST";
export const GET_BOOKING_MODAL = "vendors/GET_BOOKING_MODAL";

export const getFutureBookings = () => async (dispatch, getState) => {

  dispatch({
    type: GET_FUTURE_BOOKING_LIST_START
  });
  const valueUserId = await AsyncStorage.getItem("user_id");

  let test = new FormData();
  test.append("vendor_id", valueUserId);
  Api.post(GET_FUTURE_BOOKINGLIST, test)
    .then(response => {
      console.log(response);
      if (response.status === 0) {
        dispatch({
          type: GET_FUTURE_BOOKING_LIST_FAIL,
          payload: response
        });
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
  const {vendorBookingList } = getState().vendors;
  const {vendors} = getState().usermaps;
  const vendorLatitude = await AsyncStorage.getItem("user_latitude");
  const vendorLongitude = await AsyncStorage.getItem("user_longitude");

  var FutureBookingList=[];
  var url = "";
  const APIKEY = "AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw";
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
    vendorLatitude
  },${vendorLongitude}&destinations=${
    vendorBookingList[0].booking_latitude
  },${vendorBookingList[0].booking_longitude}`;
  vendorBookingList.map(customer => {
    url = url +"|" + `${customer.booking_latitude},${customer.booking_longitude}`;
  });

  url = url + `&key=${APIKEY}`;

  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);

      for (i = 0; i < vendorBookingList.length; i++) {
        var disMile = responseJson.rows[0].elements[i].distance
          ? responseJson.rows[0].elements[i].distance.text
          : "0 mi";

        disMile = disMile.split(" ", 2);
        var disUnit = disMile[1];
        var dis=disMile[0];
        if(disUnit !== "mi")
        {
          if(dis>100){
            dis=dis/3280.8;
            dis = parseFloat(dis.toFixed(3)) + ' ' +'km';
          }else {
            dis = responseJson.rows[0].elements[0].distance.text;
          }
        }
        else {
          dis = dis * 1.609;
          dis = parseFloat(dis.toFixed(1))+ ' ' +'km';
        }
        vendorBookingList[i].customer.distance = dis;

      }
      console.log(dis);
    })
    .catch(e => {
      //console.warn(e);
    });
    FutureBookingList= vendorBookingList;
    console.log(FutureBookingList);
  dispatch({
    type: GET_CUSTOMER_DISTANCELIST,
    payload: FutureBookingList
  });
};

export const getBookingModal = val => (dispatch, getState) => {
  dispatch({
    type:GET_BOOKING_MODAL,
    payload:val
  });
}

export const getBookingApprove = () => (dispatch,getState) =>{
const {vendorBookingList } = getState().vendors;
  let test = new FormData();
  test.append("booking_id", vendorBookingList.booking_id);
  test.append("status", "accept");
  Api.post(BOOKING_UPDATE, test)
  .then(response=>{
      console.log(response);
  })
  .catch(err=>{
    console.error(err);
  })
}
