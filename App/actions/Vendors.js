import Api from "../api/api";
import { AsyncStorage, Alert, Share } from "react-native";
import {
  GET_FUTURE_BOOKINGLIST,
  BOOKING_UPDATE,
  SEND_MECHANIC_OTP,
  UPDATE_PROFILE,
  VERIFY_MECHANIC_OTP,
  RATING_BY_CUSTOMER,
  GET_WALLET_AMOUNT,
  ADD_PAYMENT,
  UPDATE_WALLET_AMOUNT,
  VENDOR_STATUS,
  FETCH_LEDGER_HISTORY
} from "../config";
import {
  connectTosocketApprov,
  connectTosocketBookingCancle,
  socketBookingOnTheWay,
  socketVendorCurrentLocation,
  socketBookingCompleted,
  socketLeaveClubRoom
} from "./Socket";
import { SplashScreen } from "expo";
import { Actions } from "react-native-router-flux";
import openMap from "react-native-open-maps";
import * as Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";

export const GET_FUTURE_BOOKING_LIST_START =
  "vendors/GET_FUTURE_BOOKING_LIST_START";
export const GET_FUTURE_BOOKING_LIST_SUCCESS =
  "vendors/GET_FUTURE_BOOKING_LIST_SUCCESS";
export const GET_FUTURE_BOOKING_LIST_FAIL =
  "vendors/GET_FUTURE_BOOKING_LIST_FAIL";
export const GET_CUSTOMER_DISTANCELIST = "vendors/GET_CUSTOMER_DISTANCELIST";
export const GET_BOOKING_MODAL = "vendors/GET_BOOKING_MODAL";
export const GET_CUSTOMER_CURRENT_DISTANCE =
  "vendors/GET_CUSTOMER_CURRENT_DISTANCE";
export const GET_BOOKING_UAPDATE_START = "vendors/GET_BOOKING_UAPDATE_START";
export const GET_BOOKING_UAPDATE_SUCCESS =
  "vendors/GET_BOOKING_UAPDATE_SUCCESS";
export const GET_BOOKING_UAPDATE_FAIL = "vendors/GET_BOOKING_UAPDATE_FAIL";
export const GET_MECHANIC_OTP = "vendors/GET_MECHANIC_OTP";
export const OTP_DONE = "vendors/OTP_DONE";
export const GET_BOOKINGLIST_APPROVE_START =
  "vendors/GET_BOOKINGLIST_APPROVE_START";
export const GET_BOOKINGLIST_APPROVE_SUCCESS =
  "vendors/GET_BOOKINGLIST_APPROVE_SUCCESS";
export const GET_BOOKINGLIST_APPROVE_FAIL =
  "vendors/GET_BOOKINGLIST_APPROVE_FAIL";
export const GET_BOOKING_VENDOR_STATUS = "vendors/GET_BOOKING_VENDOR_STATUS";
export const GET_CANCLE_BOOKING_MODAL = "vendors/GET_CANCLE_BOOKING_MODAL";
export const GET_REASON_CHECKBOX_VENDOR = "vendors/GET_REASON_CHECKBOX_VENDOR";
export const BOOKING_LIST_CANCLE_SUCCESS =
  "vendors/BOOKING_LIST_CANCLE_SUCCESS";
  export const BOOKING_LIST_CANCLE_FAIL =
    "vendors/BOOKING_LIST_CANCLE_FAIL";
export const BOOKING_CANCLE_START = "vendors/BOOKING_CANCLE_START";
export const GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR =
  "vendors/GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR";
export const GET_FUTURE_BOOKING_LIST_NO_FOUND =
  "vendors/GET_FUTURE_BOOKING_LIST_NO_FOUND";
export const UPDATE_VENDOR_FULL_NAME = "vendors/UPDATE_VENDOR_FULL_NAME";
export const UPDATE_VENDOR_ADDRESS = "vendors/UPDATE_VENDOR_ADDRESS";
export const UPDATE_VENDOR_STATE_AND_CODE = "vendors/UPDATE_VENDOR_STATE_AND_CODE";
export const UPDATE_VENDOR_EMAIL = "vendors/UPDATE_VENDOR_EMAIL";
export const UPDATE_VENDOR_PROFILE_START =
  "vendors/UPDATE_VENDOR_PROFILE_START";
export const LOAD_VENDOR_PROFILE = "vendors/LOAD_VENDOR_PROFILE";
export const UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD =
  "vendors/UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD";
export const UPDATE_VENDOR_PROFILE_SUCCESS =
  "vendors/UPDATE_VENDOR_PROFILE_SUCCESS";
export const UPDATE_VENDOR_PROFILE_FAIL = "vendors/UPDATE_VENDOR_PROFILE_FAIL";
export const START_MAP_VENDOR_START = "vendors/START_MAP_VENDOR_START";
export const START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS =
  "vendors/START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS";
export const MECHANIC_OTP_SUBMEET_SUCCESS =
  "vendors/MECHANIC_OTP_SUBMEET_SUCCESS";
export const MECHANIC_OTP_SUBMEET_FAIL = "vendors/MECHANIC_OTP_SUBMEET_FAIL";
export const GET_CUSTOMER_RATING = "vendors/GET_CUSTOMER_RATING";
export const GET_CUSTOMER_RATING_MODAL = "vendors/GET_CUSTOMER_RATING_MODAL";
export const COMPELETE_BOOKING_BY_VENDOR =
  "vendors/COMPELETE_BOOKING_BY_VENDOR";
export const GET_RATING_TO_CUSTOMER_START =
  "vendors/GET_RATING_TO_CUSTOMER_START";
export const GET_RATING_TO_CUSTOMER_SUCCESS =
  "vendors/GET_RATING_TO_CUSTOMER_SUCCESS";
export const GET_RATING_TO_CUSTOMER_FAIL =
  "vendors/GET_RATING_TO_CUSTOMER_FAIL";
export const OTP_SHARE = "vendors/OTP_SHARE";
export const OTP_SHARE_SUCCESS = "vendors/OTP_SHARE_SUCCESS";
export const VENDOR_NEXT_BOOKING = "vendors/VENDOR_NEXT_BOOKING";
export const GET_INPUT_WALLET_AMOUNT = "vendors/GET_INPUT_WALLET_AMOUNT";
export const ADD_BALANCE_REQUEST_START = "vendors/ADD_BALANCE_REQUEST_START";
export const ADD_BALANCE_REQUEST_SUCCESS =
  "vendors/ADD_BALANCE_REQUEST_SUCCESS";
export const GET_WALLET_PAYMENTID = "vendors/GET_WALLET_PAYMENTID";
export const PAYMENT_SUCCESS_OK = "vendors/PAYMENT_SUCCESS_OK";
export const GET_WALLET_AMOUNT_START = "vendors/GET_WALLET_AMOUNT_START";
export const GET_WALLET_AMOUNT_SUCCESS = "vendors/GET_WALLET_AMOUNT_SUCCESS";
export const ADD_WALLET_PAYMENT_SUCCESS = "vendors/ADD_WALLET_PAYMENT_SUCCESS";
export const LOAD_MORE_BOOKING_LIST = "vendors/LOAD_MORE_BOOKING_LIST";
export const UPDATE_VENDOR_WORSHOP_NAME = "vendors/UPDATE_VENDOR_WORSHOP_NAME";
export const UPDATE_VENDOR_PROFILE_VEHICLE_BOOL =
  "vendors/UPDATE_VENDOR_PROFILE_VEHICLE_BOOL";
export const UPDATE_VENDOR_PROFILE_CAR_BOOL =
  "vendors/UPDATE_VENDOR_PROFILE_CAR_BOOL";
export const UPDATE_VENDOR_PROFILE_HEAVYVEHICLE_BOOL =
  "vendors/UPDATE_VENDOR_PROFILE_HEAVYVEHICLE_BOOL";
export const GET_VENDOR_STATUS ="vendors/GET_VENDOR_STATUS";
export const VENDER_ACTIVATION_SUCCESS ="vendors/VENDER_ACTIVATION_SUCCESS";
export const VENDER_ACTIVATION_FAIL ="vendors/VENDER_ACTIVATION_FAIL";
export const CLOSE_PAYMENT_PAGE ="vendors/CLOSE_PAYMENT_PAGE";
export const FETCH_LEDGER_HISTORY_SUCCESS ="vendors/FETCH_LEDGER_HISTORY_SUCCESS";
export const HISTORY_DROPDOWN_FILTER ="vendors/HISTORY_DROPDOWN_FILTER";

export const getFutureBookings = () => async (dispatch, getState) => {
  dispatch({
    type: GET_FUTURE_BOOKING_LIST_START
  });
  const valueUserId = await AsyncStorage.getItem("user_id");
  const { pages, vendorBookingList, paginate } = getState().vendors;
  let test = new FormData();
  test.append("vendor_id", valueUserId);
  test.append("page", pages);
  Api.post(GET_FUTURE_BOOKINGLIST, test)
    .then(response => {
      if (response.status === 0) {
        if (response.message === "No booking found") {
          if (pages === 1) {
            dispatch({
              type: GET_FUTURE_BOOKING_LIST_NO_FOUND
            });
            SplashScreen.hide();
          } else {
            dispatch({
              type: GET_FUTURE_BOOKING_LIST_SUCCESS,
              payload: vendorBookingList
            });
          }
        } else {
          dispatch({
            type: GET_FUTURE_BOOKING_LIST_FAIL,
            payload: response.message
          });
          dispatch(getFutureBookings());
        }
      } else {
        var VendorBookingList = paginate
          ? vendorBookingList.concat(response)
          : response;
        dispatch({
          type: GET_FUTURE_BOOKING_LIST_SUCCESS,
          payload: VendorBookingList
        });

        dispatch(getCustomerDistanceList());
      }
    })
    .catch(error => {});
};

export const getCustomerDistanceList = val => async (dispatch, getState) => {
  const { vendorBookingList } = getState().vendors;
  const { userData } = await getState().user;

  var FutureBookingList = [];
  var url = "";
  const APIKEY = "AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw";
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userData.userLatitude},${userData.userLongitude}&destinations=${vendorBookingList[0].booking_latitude},${vendorBookingList[0].booking_longitude}`;
  vendorBookingList.map(customer => {
    url =
      url + "|" + `${customer.booking_latitude},${customer.booking_longitude}`;
  });

  url = url + `&key=${APIKEY}`;

  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      for (i = 0; i < vendorBookingList.length; i++) {
        var disMile = responseJson.rows[0].elements[i].distance
          ? responseJson.rows[0].elements[i].distance.text
          : "0 mi";

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
        vendorBookingList[i].customer.distance = dis;
      }
    })
    .catch(e => {
      //console.warn(e);
    });
  FutureBookingList = vendorBookingList;

  dispatch({
    type: GET_CUSTOMER_DISTANCELIST,
    payload: FutureBookingList
  });
  SplashScreen.hide();
};

export const getBookingModal = val => async (dispatch, getState) => {
  Actions.FutureBooking();
  dispatch(getFutureBookings());

  dispatch({
    type: GET_BOOKING_MODAL,
    payload: val
  });
  const { customerLocation } = getState().vendors;
  let locations = [
    await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    })
  ];
  var radlat1 = (Math.PI * customerLocation.coords.latitude) / 180;

  var radlat2 = (Math.PI * locations[0].coords.latitude) / 180;
  var theta = customerLocation.coords.longitude - locations[0].coords.longitude;

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
  dist = parseFloat(dist.toFixed(3));
  dispatch({
    type: GET_CUSTOMER_CURRENT_DISTANCE,
    payload: dist
  });
};

export const getBookingUpdate = (val,completedData) => (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_UAPDATE_START
  });
  console.log("this is complete",completedData);
  const { bookingData, FutureBookingList, bookings } = getState().vendors;
  const { userData } = getState().user;
  let test = new FormData();
  test.append("booking_id", val.Id);
  test.append("status", val.status);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      console.log(response);
      if (response.status === 1) {
        if (val.status === "accept") {

          FutureBookingList.map(booking => {
            if (booking.booking_id === val.Id) {
              booking.status = "accept";
            }
          });
          dispatch(getMechanicOtp(val.Id));
          dispatch(updateWalletAmount(val.referralId))
          dispatch(connectTosocketApprov(val))
          dispatch(getWalletAmount());
          var message = "Booking is Approve by "+ userData.userFullName;
          dispatch(smsSendByVendor(val.customer_Mobile,message))
        }
        if (val.status === "completed") {
            dispatch(socketBookingCompleted(completedData));
          FutureBookingList.map(booking => {
            if (booking.booking_id === val.Id) {
              booking.status = "completed";
            }
          });
          var message = "Booking is Complete by "+ userData.userFullName;
          dispatch(smsSendByVendor(completedData.customer.mobile,message))
        }

        dispatch({
          type: GET_BOOKING_UAPDATE_SUCCESS,
          payload: { val, FutureBookingList }
        });
      } else {
        dispatch({
          type: GET_BOOKING_UAPDATE_FAIL
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const getMechanicOtp = val => (dispatch, getState) => {
  const { bookingData, FutureBookingList } = getState().vendors;
  let testOtp = new FormData();
  testOtp.append("booking_id", val);
  Api.post(SEND_MECHANIC_OTP, testOtp)
    .then(response => {
      if (response.status !== 0) {
        dispatch({
          type: GET_MECHANIC_OTP,
          payload: response.OTP
        });
        FutureBookingList.map(booking => {
          if (booking.booking_id === val) {
            booking.booking_otp = response.OTP;
          }
        });
        dispatch({
          type: OTP_DONE,
          payload: FutureBookingList
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const BookingListCancle = () => (dispatch, getState) => {
  dispatch({
    type: BOOKING_CANCLE_START
  });
  const {
    cancleReasonVendor,
    FutureBookingList,
    cancelBookingData
  } = getState().vendors;
  const {userData} = getState().user;

  let test = new FormData();
  test.append("booking_id", cancelBookingData.booking_id);
  test.append("status", "cancle");
  test.append("reason", cancleReasonVendor);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      console.log(response);
      if (response.status === 1) {
        var cancelData = {
          customer_id: cancelBookingData.customer_id,
          toToken: cancelBookingData.customerToken,
          sender_id:userData.userId
        };
        FutureBookingList.map(booking => {
          if (booking.booking_id === cancelBookingData.booking_id) {
            booking.status = "cancle";
          }
        });
        var message = "Booking is cancle by "+ userData.userFullName + " for this reason : " + cancleReasonVendor;
        dispatch(smsSendByVendor(cancelBookingData.customer_Mobile,message))
        dispatch(connectTosocketBookingCancle(cancelData));

        dispatch({
          type: BOOKING_LIST_CANCLE_SUCCESS,
          payload: { FutureBookingList }
        });
      } else {
        dispatch({
          type: BOOKING_LIST_CANCLE_FAIL,
        });
        if (response.message === "something went wrong") {
          BookingListCancle();
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const BookingListApprove = val => (dispatch, getState) => {
  dispatch({
    type: GET_BOOKINGLIST_APPROVE_START
  });
  const { FutureBookingList } = getState().vendors;
  const {userData} = getState().user;
  let test = new FormData();
  test.append("booking_id", val.booking_id);
  test.append("status", "accept");
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status === 1) {
        dispatch(getMechanicOtp(val.booking_id));
        dispatch(connectTosocketApprov(val));
        dispatch(updateWalletAmount(val.customer_id))
        dispatch(getWalletAmount());
        FutureBookingList.map(booking => {
          if (booking.booking_id === val.booking_id) {
            if(booking.status !== "cancle" || booking.status !== "completed"){
            booking.status = "accept";
            }
          }
        });

        var message = "Booking is Approve by "+ userData.userFullName;
        dispatch(smsSendByVendor(val.customer_Mobile,message))
        dispatch({
          type: GET_BOOKINGLIST_APPROVE_SUCCESS,
          payload: { val, FutureBookingList }
        });
      } else {
        dispatch({
          type: GET_BOOKINGLIST_APPROVE_FAIL
        });
      }
      // dispatch(getFutureBookings());
    })
    .catch(err => {
      console.error(err);
    });
};

export const otpShare = val => (dispatch, getState) => {
  const { bookings, FutureBookingList } = getState().vendors;
  Share.share({
    message: "Your OTP is " + `${val}`
  }).then(response => {
    dispatch({
      type: OTP_SHARE_SUCCESS
    });
  });

  dispatch({
    type: OTP_SHARE
  });
};

export const getBookingVendorStatus = data => (dispatch, getState) => {
  const { FutureBookingList, bookings } = getState().vendors;
  FutureBookingList.map(booking => {
    if (booking.booking_id === data.message.booking_id) {
      if(booking.status !== "cancle" || booking.status !== "completed"){
      if (data.type === "CANCEL") {
        booking.status = "cancle";
        dispatch(socketLeaveClubRoom({receiver_id:data.message.customer_id,sender_id:data.message.vendor_id}))
      }
      if (data.type === "REACHED") {
        booking.status = "reached";
      }
      if (data.type === "ON-THE-WAY") {
        booking.status = "on-the-way";
      }
    }
    }
    if (data.type === "COMPLETED") {
      if (booking.booking_id === data.message.booking.booking_id) {
        booking.status = "completed";
      }
    }
  });
  dispatch({
    type: GET_BOOKING_VENDOR_STATUS,
    payload: { data, FutureBookingList }
  });
};

export const getCancleBookingModal = index => dispatch => {
  dispatch({
    type: GET_CANCLE_BOOKING_MODAL,
    payload: index
  });
};

export const getReasonCheckboxVendor = index => dispatch => {
  dispatch({
    type: GET_REASON_CHECKBOX_VENDOR,
    payload: index
  });
};

export const getCancelBookingModalCloseVendor = () => dispatch => {
  dispatch({
    type: GET_CANCEL_BOOKING_MODAL_CLOSE_VENDOR
  });
};

export const updateVendorWorkshopName = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_VENDOR_WORSHOP_NAME,
    payload: val
  });
};

export const updateVendorFullName = val => dispatch => {
  dispatch({
    type: UPDATE_VENDOR_FULL_NAME,
    payload: val
  });
};

export const updateVendorAddress = val => dispatch => {
  dispatch({
    type: UPDATE_VENDOR_ADDRESS,
    payload: val
  });
};

export const updateVendorStateAndCode = index => dispatch => {
  dispatch({
    type: UPDATE_VENDOR_STATE_AND_CODE,
    payload: index
  });
};

export const updateVendorEmail = val => dispatch => {
  dispatch({
    type: UPDATE_VENDOR_EMAIL,
    payload: val
  });
};

export const updateVendorProfile = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_VENDOR_PROFILE_START
  });
  const {
    fullNameVendor,
    addressVendor,
    emailVendor,
    imageBase64Vendor,
    workshop_nameVendor,
    vendorProfileServiceType
  } = getState().vendors;
  var service_type = [
    "bike",
    "car",
    "Heavy_Vehicle",
    "Towing_Service",
    "Tyre_Service"
  ];
  var service_vehicle_type = [];
  for (var i = 0; i < vendorProfileServiceType.length; i++) {
    if (vendorProfileServiceType[i] === true) {
      service_vehicle_type.push(service_type[i]);
    }
  }
  service_vehicle_type = JSON.stringify(service_vehicle_type);
  const { userData } = getState().user;
  let test = new FormData();
  test.append("id", userData.userId);
  test.append("first_name", fullNameVendor);
  test.append("address", JSON.stringify(addressVendor));
  test.append("profile_image", imageBase64Vendor);
  test.append("workshop_name", workshop_nameVendor);
  test.append("service_vehicle_type", service_vehicle_type);
  Api.post(UPDATE_PROFILE, test).then(response => {
    if (response.status === 1) {
      dispatch({
        type: UPDATE_VENDOR_PROFILE_SUCCESS
      });
      showMessage({
        message: "SUCCESS",
        description: response.message,
        type: "default"
      });
      //alert(response.message);
    } else {
      dispatch({
        type: UPDATE_VENDOR_PROFILE_FAIL
      });
      showMessage({
        message: "FAIL",
        description: response.message,
        type: "default"
      });
    }
  });
};

export const loadVendorProfile = () => (dispatch, getState) => {
  const { userData } = getState().user;

  dispatch({
    type: LOAD_VENDOR_PROFILE,
    payload: userData
  });
};

export const upadteVendorProfileImage = () => async dispatch => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true,
    allowsEditing: true,
    aspect: [4, 4]
  });
  if (!result.cancelled) {
    dispatch({
      type: UPDATE_VENDOR_PROFILE_IMAGE_UPLOAD,
      payload: result
    });
  }
};

export const startMapVendor = startMapData => (dispatch, getState) => {
  dispatch({
    type: START_MAP_VENDOR_START
  });

  const { FutureBookingList, mechanicOTP, bookings } = getState().vendors;

  let test1 = new FormData();
  test1.append("otp", startMapData.otp);
  Api.post(VERIFY_MECHANIC_OTP, test1).then(async response => {
    if (response.status === 1) {
      dispatch({
        type: MECHANIC_OTP_SUBMEET_SUCCESS,
        payload: response
      });
      startMapData = {
        booking_id: response.booking.booking_id,
        customer_id: response.booking.customer.customer_id,
        customerToken: startMapData.customerToken
      };

      let test = new FormData();
      test.append("booking_id", startMapData.booking_id);
      test.append("status", "on-the-way");
      Api.post(BOOKING_UPDATE, test).then(responseBooking => {
        if (responseBooking.status === 1) {
          dispatch(socketBookingOnTheWay(startMapData));
          dispatch(socketVendorCurrentLocation(startMapData));
          FutureBookingList.map(booking => {
            if (booking.booking_id === startMapData.booking_id) {
              booking.status = "on-the-way";
            }
          });

          dispatch({
            type: START_MAP_VENDOR_BOOKING_UPDATE_SUCCESS,
            payload: { FutureBookingList }
          });
        }
      });
    } else {
      dispatch({
        type: MECHANIC_OTP_SUBMEET_FAIL
      });
    }
  });
};

export const goToMap = () => async (dispatch, getState) => {
  await Location.hasServicesEnabledAsync()
    .then(async res => {
      if (!res) {
        perm = await IntentLauncher.startActivityAsync(
          IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
        );
      }
      await Location.hasServicesEnabledAsync()
        .then(async res => {
          this.locationIsEnabled = res;
        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(err => {
      console.error(err);
    });
  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation
  });
  const { mechanicBookedData } = getState().vendors;
  let startLat = location.coords.latitude + "," + location.coords.longitude;
  let endLat =
    mechanicBookedData.booking.booking_latitude +
    "," +
    mechanicBookedData.booking.booking_longitude;

  openMap({ start: [startLat.toString()], end: [endLat.toString()] });
};

export const getCustomerRating = rating => dispatch => {
  dispatch({
    type: GET_CUSTOMER_RATING,
    payload: rating
  });
};

export const getCustomerRatingModal = val => (dispatch, getState) => {
  const { FutureBookingList } = getState().vendors;
  dispatch({
    type: GET_CUSTOMER_RATING_MODAL
  });

  var CompleteValue = {
    status: "completed",
    Id: val.booking_id
  };
  dispatch(getBookingUpdate(CompleteValue,val));
  dispatch({
    type: COMPELETE_BOOKING_BY_VENDOR,
    payload: {
      FutureBookingList: FutureBookingList,
      val: val.customer.customer_id
    }
  });
};

export const getRatingToCustomer = val => (dispatch, getState) => {
  dispatch({
    type: GET_RATING_TO_CUSTOMER_START
  });
  const { customerRating, ratingId } = getState().vendors;
  let test = new FormData();
  test.append("vendor_id", ratingId);
  test.append("rating", customerRating);
  Api.post(RATING_BY_CUSTOMER, test).then(response => {
    if (response.status === 1) {
      dispatch({
        type: GET_RATING_TO_CUSTOMER_SUCCESS
      });
    } else {
      dispatch({
        type: GET_RATING_TO_CUSTOMER_FAIL
      });
    }
  });
};

export const getInputWalletAmount = val => dispatch => {
  dispatch({
    type: GET_INPUT_WALLET_AMOUNT,
    payload: val
  });
};

export const addBalanceRequest = () => (dispatch, getState) => {
  dispatch({
    type: ADD_BALANCE_REQUEST_START
  });
  const { walletAmount } = getState().vendors;
  fetch("http://103.50.153.25:3000/createOrder", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: parseInt(walletAmount), // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
      payment_capture: "0"
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: ADD_BALANCE_REQUEST_SUCCESS,
        payload: responseJson.order.id
      });
    });
};

export const getWalletPaymentId = val => dispatch => {
  dispatch({
    type: GET_WALLET_PAYMENTID,
    payload: val
  });

  dispatch(addWalletPayment());
};

export const paymentSuccessOk = () => dispatch => {
  dispatch({
    type: PAYMENT_SUCCESS_OK
  });
};

export const getWalletAmount = () => async (dispatch, getState) => {
  const { userData } = await getState().user;
  dispatch({
    type: GET_WALLET_AMOUNT_START
  });
  let test = new FormData();
  test.append("customer_id", userData.userId);
  Api.post(GET_WALLET_AMOUNT, test).then(response => {
    if (response.status === 1) {
      dispatch({
        type: GET_WALLET_AMOUNT_SUCCESS,
        payload: response.data[0]
      });
    } else {
      dispatch(getWalletAmount());
    }
  });
};

export const updateWalletAmount = (val) => async (dispatch, getState) => {
  const { userData } = await getState().user;

  let test = new FormData();
  test.append("customer_id", userData.userId);
  test.append("referal_from", val);
  Api.post(UPDATE_WALLET_AMOUNT, test).then(response => {
  });
};

export const addWalletPayment = () => async (dispatch, getState) => {
  const { userData } = await getState().user;
  const { walletAmount, WalletOrderId, paymentId } = getState().vendors;

  let test = new FormData();
  test.append("customer_id", userData.userId);
  test.append("order_id", WalletOrderId);
  test.append("payment_id", paymentId);
  test.append("amount", walletAmount);
  Api.post(ADD_PAYMENT, test).then(response => {

    if (response.status === 1) {
      dispatch(getWalletAmount());
      dispatch({
        type: ADD_WALLET_PAYMENT_SUCCESS
      });
    } else {
      dispatch(addWalletPayment());
    }
  });
};

export const loadMoreBookingList = () => (dispatch, getState) => {
  const { pages } = getState().vendors;
  var page = pages + 1;
  dispatch({
    type: LOAD_MORE_BOOKING_LIST,
    payload: page
  });
  dispatch(getFutureBookings());
};

export const shareReferal = () => (dispatch, getState) => {
  const { userData } = getState().user;

  var playStoreUrl =
    "http://ilifenetwork.com/api/web/addRefer.html?referal_code=" +
    userData.uderReferalCode;
  Share.share({
    message: playStoreUrl
  }).then(response => {
  });
};

export const referalToCustomer = () => (dispatch,getState) => {
  const { userData } = getState().user;

  var playStoreUrl =
    "http://ilifenetwork.com/api/web/shareCustomerReferral.html?referal_code=" +
    userData.uderReferalCode;
  Share.share({
    message: playStoreUrl
  }).then(response => {
  });
}

export const updateVenderProfileVehicleBool = () => (dispatch, getState) => {
  const { vendorProfileServiceType } = getState().vendors;
  var ServiceType = vendorProfileServiceType;
  ServiceType[0] = !vendorProfileServiceType[0];
  dispatch({
    type: UPDATE_VENDOR_PROFILE_VEHICLE_BOOL,
    payload: ServiceType
  });
};

export const updateVendorProfileCarBool = () => (dispatch, getState) => {
  const { vendorProfileServiceType } = getState().vendors;
  var ServiceTypeCar = vendorProfileServiceType;
  ServiceTypeCar[1] = !vendorProfileServiceType[1];
  dispatch({
    type: UPDATE_VENDOR_PROFILE_CAR_BOOL,
    payload: ServiceTypeCar
  });
};

export const updateVendorProfileHeavyVehicleBool = () => (
  dispatch,
  getState
) => {
  const { vendorProfileServiceType } = getState().vendors;
  vendorProfileServiceType[2] = !vendorProfileServiceType[2];
  dispatch({
    type: UPDATE_VENDOR_PROFILE_HEAVYVEHICLE_BOOL,
    payload: vendorProfileServiceType
  });
};

export const updateVendorProfileTowingBool = () => (
  dispatch,
  getState
) => {
  const { vendorProfileServiceType } = getState().vendors;
  vendorProfileServiceType[3] = !vendorProfileServiceType[3];
  dispatch({
    type: UPDATE_VENDOR_PROFILE_HEAVYVEHICLE_BOOL,
    payload: vendorProfileServiceType
  });
};

export const updateVendorProfileTyreBool = () => (
  dispatch,
  getState
) => {
  const { vendorProfileServiceType } = getState().vendors;
  vendorProfileServiceType[4] = !vendorProfileServiceType[4];
  dispatch({
    type: UPDATE_VENDOR_PROFILE_HEAVYVEHICLE_BOOL,
    payload: vendorProfileServiceType
  });
};

export const GetVenderStatus = () => async (dispatch,getState) =>{
  const { userData } = await getState().user;
  var userStatus= false
  if(userData.userStatus === "Active"){
    userStatus=true
  }
  dispatch({
    type:GET_VENDOR_STATUS,
    payload:userStatus
  })
}

export const closePaymentPage = () => (dispatch) => {
  dispatch({
    type:CLOSE_PAYMENT_PAGE,
  })
}

export const venderActivation = () => async (dispatch,getState) =>{

  const { userData } = await getState().user;
  const { isVendorActive } = getState().vendors;
  var status =""
  if(!isVendorActive){
    status = "Active"
  }else {
    status = "In-active"
  }
  let test = new FormData();
  test.append("customer_id", userData.userId);
  test.append("status", status);
  Api.post(VENDOR_STATUS, test).then(response => {
    if(response.status === 1){
      dispatch({
        type:VENDER_ACTIVATION_SUCCESS
      })
    } else {
      dispatch({
        type:VENDER_ACTIVATION_FAIL
      })
    }
  });

}

export const fetchLedgerHistory = () => async (dispatch,getState) => {
  const { userData } = await getState().user;
  let test = new FormData();
  test.append("user_id", userData.userId);
  Api.post(FETCH_LEDGER_HISTORY, test).then(response => {
    console.log(response);
    if(response.status === 1){

        dispatch({
          type:FETCH_LEDGER_HISTORY_SUCCESS,
          payload:response
        })
    }
  })
}

export const smsSendByVendor = (mobile,message) => (dispatch) => {
  console.log(mobile);
  console.log(message);
  var url = 'http://anysms.in/api.php?username=devansh&password=502963&sender=VELWAY&sendto='+ mobile +'&message='+message;
  fetch(url)
    .then(res => {
      console.log(res);
    })
}

export const historyDropdown = (val) => async(dispatch,getState) => {
  const { ledgerHistoryFilter } = await getState().vendors;
  if(val !== "All"){
      var hh = ledgerHistoryFilter.filter((item)=>{
          return item.payment_id.split("_")[0]===val;
      })
      dispatch({
        type:HISTORY_DROPDOWN_FILTER,
        payload:hh
      })
  } else {
    dispatch({
      type:HISTORY_DROPDOWN_FILTER,
      payload:ledgerHistoryFilter
    })
  }
  console.log(hh);
}
