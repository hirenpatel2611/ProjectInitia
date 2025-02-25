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
  UPDATE_PROFILE,
  CUSTOMER_COMMENT
} from "../config";
import { Actions } from "react-native-router-flux";
import { AsyncStorage, Alert } from "react-native";
import {
  connectTosocket,
  connectTosocketReached,
  connectTosocketBookingCancle,
  socketLeave
} from "./Socket";
import { Asset, SplashScreen, ImagePicker, Permissions, Constants } from "expo";
import { getUserData } from "./ui";

export const GET_VENDORS_START = "customers/GET_VENDORS_START";
export const GET_VENDORS_SUCCESS = "customers/GET_VENDORS_SUCCESS";
export const GET_USER_LOCATION_FAIL = "customers/GET_USER_LOCATION_FAIL";
export const GET_USER_LOCATION_SUCCESS = "customers/GET_USER_LOCATION_SUCCESS";
export const IS_MENU_VISIBLE = "customers/IS_MENU_VISIBLE";
export const GET_VENDOR_DETAILS = "customers/GET_VENDOR_DETAILS";
export const CLOSE_VENDOR_DETAIL_MODAL = "customers/closeVendorDetailModal";
export const GET_BOOKING_SUCCESS = "customers/GET_BOOKING_SUCCESS";
export const GET_BOOKING_FAIL = "customers/GET_BOOKING_FAIL";
export const GET_VENDOR_BOOKING_START = "customers/GET_VENDOR_BOOKING_START";
export const GET_BOOKING_LIST_START = "customers/GET_BOOKING_LIST_START";
export const GET_BOOKING_LIST_SUCCESS = "customers/GET_BOOKING_LIST_SUCCESS";
export const GET_BOOKING_LIST_FAIL = "customers/GET_BOOKING_LIST_FAIL";
export const UPDATE_FILTER_VEHICLE_BOOL = "customers/UPDATE_FILTER_VEHICLE_BOOL";
export const UPDATE_FILTER_CAR_BOOL = "customers/UPDATE_FILTER_CAR_BOOL";
export const UPDATE_FILTER_RATING = "customers/UPDATE_FILTER_RATING";
export const UPDATE_FILTER_DISTANCE = "customers/UPDATE_FILTER_DISTANCE";
export const RESET_FILTER = "customers/RESET_FILTER";
export const VENDOR_DISTANCE = "customers/VENDOR_DISTANCE";
export const GET_DISTANCE = "customers/GET_DISTANCE";
export const GET_BOOKING_CANCLE_START = "customers/GET_BOOKING_CANCLE_START";
export const GET_BOOKING_CANCLE_SUCCESS = "customers/GET_BOOKING_CANCLE_SUCCESS";
export const GET_BOOKING_CANCLE_FAIL = "customers/GET_BOOKING_CANCLE_FAIL";
export const GET_BOOKING_STATUS = "customers/GET_BOOKING_STATUS";
export const GET_BOOKING_CANCEL_BY_VENDOR =
  "customers/GET_BOOKING_CANCEL_BY_VENDOR";
export const GET_MECHANIC_CURREN_LOCATION =
  "customers/GET_MECHANIC_CURREN_LOCATION";
export const GET_DISTANCE_BETWEEN_USER_MECHANIC =
  "customers/GET_DISTANCE_BETWEEN_USER_MECHANIC";
export const GET_BOOKING_UPDATE_START = "customers/GET_BOOKING_UPDATE_START";
export const GET_BOOKING_UPDATE_SUCCESS = "customers/GET_BOOKING_UPDATE_SUCCESS";
export const GET_BOOKING_UPDATE_FAIL = "customers/GET_BOOKING_UPDATE_FAIL";
export const GET_REASON_CHECKBOX = "customers/GET_REASON_CHECKBOX";
export const GET_CANCEL_BOOKING_MODAL = "customers/GET_CANCEL_BOOKING_MODAL";
export const GET_CANCEL_BOOKING_MODAL_CLOSE =
  "customers/GET_CANCEL_BOOKING_MODAL_CLOSE";
export const SET_DURATION_AND_DISTANCE = "customers/SET_DURATION_AND_DISTANCE";
export const GET_BOOKING_COMPLETE = "customers/GET_BOOKING_COMPLETE";
export const GET_VENDOR_RATING = "customers/GET_VENDOR_RATING";
export const GET_RATING_SUCCESS = "customers/GET_RATING_SUCCESS";
export const GET_RATING_START = "customers/GET_RATING_START";
export const NO_BOOKING_FOUND_CUSTOMER = "customers/NO_BOOKING_FOUND_CUSTOMER";
export const LOAD_CUSTOMER_PROFILE = "customers/LOAD_CUSTOMER_PROFILE";
export const UPDATE_CUSTOMER_FULL_NAME = "customers/UPDATE_CUSTOMER_FULL_NAME";
export const UPDATE_CUSTOMER_ADDRESS = "customers/UPDATE_CUSTOMER_ADDRESS";
export const UPDATE_CUSTOMER_EMAIL = "customers/UPDATE_CUSTOMER_EMAIL";
export const UPDATE_CUSTOMER_PROFILE_START =
  "customers/UPDATE_CUSTOMER_PROFILE_START";
export const UPDATE_CUSTOMER_PROFILE_IMAGE_UPLOAD =
  "customers/UPDATE_CUSTOMER_PROFILE_IMAGE_UPLOAD";
export const UPDATE_CUSTOMER_PROFILE_SUCCESS =
  "customers/UPDATE_CUSTOMER_PROFILE_SUCCESS";
export const UPDATE_CUSTOMER_PROFILE_FAIL =
  "customers/UPDATE_CUSTOMER_PROFILE_FAIL";
export const GET_FILTER_SUBMEET = "customers/GET_FILTER_SUBMEET";
export const GET_VENDOR_RATING_MODAL = "customers/GET_VENDOR_RATING_MODAL";
export const GET_CUSTOMER_COMMENT = "customers/GET_CUSTOMER_COMMENT";
export const CUSTOMER_COMMENT_FAIL = "customers/CUSTOMER_COMMENT_FAIL";
export const GET_RATING_FAIL = "customers/GET_RATING_FAIL";

var cancelAlertCounter = 0;
var getVendorsCounter = 0;

export const getVendors = () => async (dispatch, getState) => {
  dispatch({
    type: GET_VENDORS_START
  });
  const { vendorServiceType, rating, location, distance } = await getState()
    .customers;
  if (!location) {
    var DistLatitude = '';
    var DistLongitude = '';
  } else {
    DistLatitude = location.coords.latitude;
    DistLongitude = location.coords.longitude;
  }
  let test = new FormData();
  test.append("service_type", vendorServiceType);
  test.append("rating", rating);
  test.append("latitude", DistLatitude);
  test.append("longitude", DistLongitude);
  test.append("radius", distance);
  Api.post(GET_VENDOR, test)
    .then(response => {
      if (response.status === 0) {
        if (getVendorsCounter < 5) {
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
  const { vendorsData, location } = getState().customers;
  const { userData } = getState().user;
  let test = new FormData();
  test.append("customer_id", userData.userId);
  test.append("vendor_id", vendorsData.id);
  test.append("latitude", location.coords.latitude);
  test.append("longitude", location.coords.longitude);
  Api.post(GET_BOOKING, test)
    .then(response => {
      if (response.status === 1) {
        dispatch({
          type: GET_BOOKING_SUCCESS,
          payload: response
        });
        dispatch(connectTosocket());
      } else {
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
  const { bookData, cancleReason } = getState().customers;
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
  const { vendorsData, location } = getState().customers;

  const mode = "driving"; // 'walking';
  const origin = location.coords;
  const destination = {
    latitude: vendorsData.latitude,
    longitude: vendorsData.longitude
  };
  const APIKEY = "AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw";
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${APIKEY}`;

  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      var disMile = responseJson.rows[0].elements[0].distance.text;
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
              cancelAlertCounter = 0;
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
  const { location } = getState().customers;
  if (location) {
    var dist = val.distance;
  
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
  const { bookingStatusRes, bookData } = getState().customers;
  obj = Object.assign({}, bookingStatusRes);

  let test = new FormData();
  test.append("booking_id", bookData.booking_id);
  test.append("status", val);
  Api.post(BOOKING_UPDATE, test)
    .then(response => {
      if (response.status !== 0) {
        if (val === "reached") {
        obj.type = "REACHED";
        dispatch(connectTosocketReached());
        }
        dispatch({
          type: GET_BOOKING_UPDATE_SUCCESS,
          payload: obj
        });

        if (val === "completed") {
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
  const { vendorRating, bookData,customerComment } = getState().customers;


      let test = new FormData();
      test.append("vendor_id", bookData.vendor_id);
      test.append("rating", vendorRating);
      Api.post(RATING_BY_CUSTOMER, test).then(responseRating => {

        if(responseRating.status === 1){
        dispatch({
          type: GET_RATING_SUCCESS
        });

      } else {
        dispatch({
          type: GET_RATING_FAIL
        });
      }
      let test1 = new FormData();
      test1.append("booking_id", bookData.booking_id);
      test1.append("comment", customerComment);
      Api.post(CUSTOMER_COMMENT, test1).then(response => {
        if(response.status === 1){
        } else {
          dispatch({
            type:CUSTOMER_COMMENT_FAIL
          });
        }
        Actions.NearbyGaraje();
      });
      Actions.NearbyGaraje();
  })

};

export const getVendorRating = rating => dispatch => {
  dispatch({
    type: GET_VENDOR_RATING,
    payload: rating
  });
};

export const loadCustomerProfile = () => (dispatch, getState) => {
  const { userData } = getState().user;
  dispatch({
    type: LOAD_CUSTOMER_PROFILE,
    payload: userData
  });
};

export const updateCustomerFullName = val => dispatch => {
  dispatch({
    type: UPDATE_CUSTOMER_FULL_NAME,
    payload: val
  });
};
export const updateCustomerAddress = val => dispatch => {
  dispatch({
    type: UPDATE_CUSTOMER_ADDRESS,
    payload: val
  });
};
export const updateCustomerEmail = val => dispatch => {
  dispatch({
    type: UPDATE_CUSTOMER_EMAIL,
    payload: val
  });
};

export const updateCustomerProfile = val => (dispatch, getState) => {
  dispatch({
    type: UPDATE_CUSTOMER_PROFILE_START
  });
  const {
    fullNameCustomer,
    addressCustomer,
    emailCustomer
  } = getState().customers;
  const { userData } = getState().user;
  let test = new FormData();
  test.append("id", userData.userId);
  test.append("first_name", fullNameCustomer);
  test.append("address", addressCustomer);
  Api.post(UPDATE_PROFILE, test).then(response => {
    if (response.status === 1) {
      dispatch({
        type: UPDATE_CUSTOMER_PROFILE_SUCCESS
      });
      alert(response.message);
    } else {
      dispatch({
        type: UPDATE_CUSTOMER_PROFILE_FAIL
      });
    }
  });
};

export const upadteCustomerProfileImage = val => async dispatch => {
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
};

export const getFilterSubmeet = () => (dispatch, getState) => {
  const { isVehicle, isCar, rating } = getState().customers;
  let vehicle_type = "";
  if (isVehicle === true && isCar === false) {
    vehicle_type = "bike";
  } else if (isVehicle === false && isCar === true) {
    vehicle_type = "car";
  } else if (isVehicle === true && isCar === true) {
    vehicle_type = "both";
  } else if (isVehicle === false && isCar === false) {
    vehicle_type = "both";
  }

  var vendorPerameter = { vehicle_type: vehicle_type, rating: rating };

  dispatch({
    type: GET_FILTER_SUBMEET,
    payload: vendorPerameter
  });
  Actions.NearbyGaraje();
  dispatch(getVendors());
};

export const getVendorRatingModal = () => dispatch => {
  dispatch({
    type: GET_VENDOR_RATING_MODAL
  });
};

export const getCustomerComment = comment => (dispatch) =>{
  dispatch({
    type:GET_CUSTOMER_COMMENT,
    payload:comment
  });
}
