import { SET_TIMER, SET_SCORE } from "./types";
import TimerMixin from "react-timer-mixin";
import Api from "../api/api";
import {
  GET_VENDOR,
  GET_BOOKING,
  GET_BOOKINGLIST,
  GET_VENDOR_BOOKINGLIST,
  BOOKING_UPDATE,
  RATING_BY_CUSTOMER,
  UPDATE_PROFILE
} from "../config";
import { Actions } from "react-native-router-flux";
import { AsyncStorage, Alert } from "react-native";
import {
  connectTosocket,
  connectTosocketReached,
  connectTosocketBookingCancle,
  socketLeave
} from "./Socket";
import { Asset, SplashScreen,ImagePicker, Permissions,Constants } from "expo";
import { getUserData } from "./ui";

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
export const GET_REASON_CHECKBOX = "usermaps/GET_REASON_CHECKBOX";
export const GET_REASON_CHECKBOX2 = "usermaps/GET_REASON_CHECKBOX2";
export const GET_REASON_CHECKBOX3 = "usermaps/GET_REASON_CHECKBOX3";
export const GET_CANCEL_BOOKING_MODAL = "usermaps/GET_CANCEL_BOOKING_MODAL";
export const GET_CANCEL_BOOKING_MODAL_CLOSE =
  "usermaps/GET_CANCEL_BOOKING_MODAL_CLOSE";
export const SET_DURATION_AND_DISTANCE = "usermaps/SET_DURATION_AND_DISTANCE";
export const GET_BOOKING_COMPLETE = "usermaps/GET_BOOKING_COMPLETE";
export const GET_VENDOR_RATING = "usermaps/GET_VENDOR_RATING";
export const GET_RATING_SUCCESS = "usermaps/GET_RATING_SUCCESS";
export const GET_RATING_START = "usermaps/GET_RATING_START";
export const NO_BOOKING_FOUND_CUSTOMER = "usermaps/NO_BOOKING_FOUND_CUSTOMER";
export const LOAD_CUSTOMER_PROFILE = "usermaps/LOAD_CUSTOMER_PROFILE";
export const UPDATE_CUSTOMER_FULL_NAME = "usermaps/UPDATE_CUSTOMER_FULL_NAME";
export const UPDATE_CUSTOMER_ADDRESS = "usermaps/UPDATE_CUSTOMER_ADDRESS";
export const UPDATE_CUSTOMER_EMAIL = "usermaps/UPDATE_CUSTOMER_EMAIL";
export const UPDATE_CUSTOMER_PROFILE_START = "usermaps/UPDATE_CUSTOMER_PROFILE_START";
export const UPDATE_CUSTOMER_PROFILE_IMAGE_UPLOAD = "usermaps/UPDATE_CUSTOMER_PROFILE_IMAGE_UPLOAD";
export const UPDATE_CUSTOMER_PROFILE_SUCCESS = "usermaps/UPDATE_CUSTOMER_PROFILE_SUCCESS";
export const UPDATE_CUSTOMER_PROFILE_FAIL = "usermaps/UPDATE_CUSTOMER_PROFILE_FAIL";
export const GET_FILTER_SUBMEET = "usermaps/GET_FILTER_SUBMEET";
export const GET_VENDOR_RATING_MODAL = "usermaps/GET_VENDOR_RATING_MODAL";

var cancelAlertCounter = 0;
var getVendorsCounter =0;

export const getVendors = () => (dispatch, getState) => {
  dispatch({
    type: GET_VENDORS_START
  });
  const {vendorServiceType,rating} =getState().usermaps;
  console.log(rating);
  let test = new FormData();
  test.append("service_type", vendorServiceType);
  test.append("rating", rating);
  Api.post(GET_VENDOR, test)
    .then(response => {
      console.log(response);
      if (response.status === 0) {
        if(getVendorsCounter<5){
        dispatch(getVendors());
      }
      } else {
        dispatch({
          type: GET_VENDORS_SUCCESS,
          payload: response
        });
      }
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
  dispatch(getDistance());
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
  const { userData } = getState().user;
  let test = new FormData();
  test.append("customer_id", userData.userId);
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
  const { bookData, cancleReason } = getState().usermaps;
  let test = new FormData();
  test.append("booking_id", bookData.booking_id);
  test.append("status", "cancle");
  test.append("reason", cancleReason);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status !== 0) {
        dispatch({
          type: GET_BOOKING_CANCLE_SUCCESS
        });
        dispatch(connectTosocketBookingCancle(bookData.vendor_id));
        dispatch(getUserData());
        Actions.NearbyGaraje();
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
  const { userId } = getState().user;

  let test = new FormData();
  test.append("customer_id", userId);
  Api.post(GET_BOOKINGLIST, test)
    .then(response => {
      if (response.status === 0) {
        if (response.message === "No booking found") {
          dispatch({
            type: NO_BOOKING_FOUND_CUSTOMER
          });
        }
        dispatch({
          type: GET_BOOKING_LIST_FAIL,
          payload: response
        });
      } else {
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
      console.log();
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

export const getBookingStatus = val => async (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_STATUS,
    payload: val
  });

  if (val.type === "ON-THE-WAY") {
    Actions.NavigationMap();
  }
  if (val.type === "CANCEL") {
    if (cancelAlertCounter === 0) {
      Alert.alert(
        "Booking Cancelled",
        "Your Booking request is Cancelled by Mechanic, Please Find another Mechanic.",
        [
          {
            text: "OK",
            onPress: () => {
              dispatch({
                type: GET_BOOKING_CANCEL_BY_VENDOR
              });
              Actions.NearbyGaraje();
              cancelAlertCounter=0;
            }
          }
        ],
        { cancelable: false }
      );
      cancelAlertCounter = cancelAlertCounter + 1;
    }
  }
};

export const getMechanicCurrentLocation = val => (dispatch, getState) => {
  dispatch({
    type: GET_MECHANIC_CURREN_LOCATION,
    payload: val
  });
  const { location } = getState().usermaps;
  if (location) {
    var dist = val.distance;
    console.log(val);
    if (dist < 0.055) {
      dispatch({
        type: GET_DISTANCE_BETWEEN_USER_MECHANIC,
        payload: dist
      });
      var sts = "reached";
      dispatch(getBookingUpdateUser(sts));
      dispatch(connectTosocketReached());
    }
  }
};
//
export const getBookingUpdateUser = val => (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_UPDATE_START
  });
  const { bookingStatusRes, bookData } = getState().usermaps;
  obj = Object.assign({}, bookingStatusRes);

  let test = new FormData();
  test.append("booking_id", bookData.booking_id);
  test.append("status", val);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status !== 0) {

        obj.type = "REACHED";

        dispatch({
          type: GET_BOOKING_UPDATE_SUCCESS,
          payload: obj
        });
        dispatch(connectTosocketReached());
        if (val === "completed") {ß
          dispatch(getRating());

          dispatch({
            type: GET_BOOKING_COMPLETE
          });
        }
      } else {
        dispatch({
          type: GET_BOOKING_UPDATE_FAIL
        });
        dispatch(getBookingUpdateUser(val));
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const getReasonCheckbox = index => dispatch => {
  dispatch({
    type: GET_REASON_CHECKBOX,
    payload: index
  });
};

export const getCancelBookingModal = () => dispatch => {
  dispatch({
    type: GET_CANCEL_BOOKING_MODAL
  });
};

export const getCancelBookingModalClose = () => dispatch => {
  dispatch({
    type: GET_CANCEL_BOOKING_MODAL_CLOSE
  });
};

export const setDurationAndDistance = val => dispatch => {
  dispatch({
    type: SET_DURATION_AND_DISTANCE,
    payload: val
  });
};

export const getRating = () => (dispatch, getState) => {
  dispatch({
    type: GET_RATING_START
  });

  const { vendorRating, bookData } = getState().usermaps;

  let test = new FormData();
  test.append("vendor_id", bookData.vendor_id);
  test.append("rating", vendorRating);
  Api.post(RATING_BY_CUSTOMER, test).then(response => {
    console.log(response);
    Actions.NearbyGaraje();
    dispatch({
      type: GET_RATING_SUCCESS
    });
  });
};

export const getVendorRating = rating => dispatch => {
  dispatch({
    type: GET_VENDOR_RATING,
    payload: rating
  });
};

export const loadCustomerProfile = () => (dispatch,getState) => {
  const { userData } = getState().user;
  dispatch({
    type:LOAD_CUSTOMER_PROFILE,
    payload:userData
  });
}

export const updateCustomerFullName = val => (dispatch) => {
  dispatch({
    type:UPDATE_CUSTOMER_FULL_NAME,
    payload:val
  });
}
export const updateCustomerAddress = val => (dispatch) =>{
  dispatch({
    type:UPDATE_CUSTOMER_ADDRESS,
    payload:val
  });
}
export const updateCustomerEmail = val => (dispatch) => {
  dispatch({
    type:UPDATE_CUSTOMER_EMAIL,
    payload:val
  });
}

export const updateCustomerProfile = val => (dispatch,getState) => {
  dispatch({
    type:UPDATE_CUSTOMER_PROFILE_START,
  });
  const {fullNameCustomer,addressCustomer,emailCustomer} = getState().usermaps;
  const {userData} = getState().user
  let test = new FormData();
  test.append("id", userData.userId);
  test.append("first_name", fullNameCustomer);
  test.append("address", addressCustomer);
  Api.post(UPDATE_PROFILE, test).then(response => {
    console.log(test);
    if(response.status === 1){
      dispatch({
        type:UPDATE_CUSTOMER_PROFILE_SUCCESS,
      });
      alert(response.message);
    } else {
      dispatch({
        type:UPDATE_CUSTOMER_PROFILE_FAIL,
      });
    }
  })
}

export const upadteCustomerProfileImage = val => async (dispatch) => {
  // let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       base64: true,
  //       allowsEditing: true,
  //       aspect: [4, 4],
  //     });
  //
  //     console.log(result);
  //
  //     if (!result.cancelled) {
  //       dispatch({
  //         type:UPDATE_CUSTOMER_PROFILE_IMAGE_UPLOAD,
  //         payload:result
  //       });
  //
  //     }
}

export const getFilterSubmeet = () => (dispatch,getState) => {
  const {isVehicle,isCar,rating}=getState().usermaps;
  let vehicle_type = "";
  if (isVehicle === true && isCar === false) {
    vehicle_type = "bike";
  } else if (isVehicle === false && isCar === true) {
    vehicle_type = "car";
  } else if (isVehicle === true && isCar === true) {
    vehicle_type = "both";
  }else if (isVehicle === false && isCar === false) {
    vehicle_type = "both";
  }

  var vendorPerameter ={vehicle_type:vehicle_type,
                        rating:rating};
  console.log(vendorPerameter);
  dispatch({
    type:GET_FILTER_SUBMEET,
    payload:vendorPerameter
  });
  Actions.NearbyGaraje();
  dispatch(getVendors());
}

export const getVendorRatingModal = () => (dispatch) => {
  console.error();
  dispatch({
    type:GET_VENDOR_RATING_MODAL,
  });
}
