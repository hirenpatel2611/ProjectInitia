import Peer from "peerjs";
import { AsyncStorage } from "react-native";
import io from "socket.io-client";
import {
  BackgroundFetch,
  Location,
  TaskManager,
  Permissions,
  IntentLauncherAndroid,
  Constants
} from "expo";
import { getBookingModal, getBookingVendorStatus, goToMap } from "./Vendors";
import {
  getBookingStatus,
  getMechanicCurrentLocation,
  getVendorRatingModal
} from "./Cutomers";
import { Actions } from "react-native-router-flux";

export const CONNECT_TO_SOCKET = "socket/connectTosocket";
export const CREATE_SOCKET_CHANNEL = "socket/createSocketChannel";

var isVen = null;
var disp = null;
var bookingDetails = null;
var vendorMobileno = null;

const LOCATION_TASK_NAME = "background-location-task";
const LOCATION_TASK_NAME1 = "background-location-task-current";
var peer = null;
export const createSocketChannel = val => async (dispatch, getState) => {
  chatSocket = io("http://103.50.153.25:3000", {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ["websocket"]
  });
  const { isUserVendor, userData } = getState().user;
  isVen = isUserVendor;
  disp = dispatch;
  chatSocket.emit("self_room", { room: `${val}` });

  chatSocket.on("ping", function(data) {
    chatSocket.emit("pong");
  });

  chatSocket.on("broadcast", function(data) {
    switch (data.type) {
      case "BOOK":
        dispatch(getBookingModal(data.message));
        break;

      case "ACCEPT":
        if (isUserVendor !== "1") {
          dispatch(getBookingStatus(data));
        } else {
          dispatch(getBookingVendorStatus(data));
        }

        break;

      case "ON-THE-WAY":
        if (isUserVendor !== "1") {
          dispatch(getBookingStatus(data));
        } else {
          dispatch(getBookingVendorStatus(data));
        }

        break;

      case "CANCEL":
        if (isUserVendor !== "1") {
          dispatch(getBookingStatus(data));
        } else {
          dispatch(getBookingVendorStatus(data));
        }
        break;

      case "MECHANIC_CURRENT_LOCATION":
        if (isUserVendor !== "1") {
          dispatch(getMechanicCurrentLocation(data));
        }
        break;

      case "REACHED":
        if (isUserVendor === "1") {
          dispatch(getBookingVendorStatus(data));
        }
        break;
      case "COMPLETED":
        if (isUserVendor === "1") {
          dispatch(getBookingVendorStatus(data));
        } else {
          dispatch(getVendorRatingModal());
        }

        break;

      default:
        return null;
    }
  });
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.BestForNavigation
  });
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error();
  }
  chatSocket.on("broadcast", function(data) {
    switch (data.type) {
      case "BOOK":
        disp(getBookingModal(data.message));
        break;

      case "ACCEPT":
        if (isVen !== "1") {
          disp(getBookingStatus(data));
        } else {
          disp(getBookingVendorStatus(data));
        }

        break;

      case "ON-THE-WAY":
        if (isVen !== "1") {
          disp(getBookingStatus(data));
        } else {
          disp(getBookingVendorStatus(data));
        }

        break;

      case "CANCEL":
        if (isVen !== "1") {
          disp(getBookingStatus(data));
        } else {
          disp(getBookingVendorStatus(data));
        }
        break;

      case "MECHANIC_CURRENT_LOCATION":
        if (isVen !== "1") {
          disp(getMechanicCurrentLocation(data));
        }
        break;

      case "REACHED":
        if (isVen !== "1") {
        } else {
          disp(getBookingVendorStatus(data));
        }
        break;

      case "REACHED":
        if (isVen === "1") {
          disp(getBookingVendorStatus(data));
        }
        break;

      case "COMPLETED":
        if (isVen === "1") {
          disp(getBookingVendorStatus(data));
        } else {
          disp(getVendorRatingModal());
        }
        break;

      default:
        return null;
    }
  });
});

export const connectTosocket = () => async (dispatch, getState) => {
  const {
    vendorsData,
    bookData,
    vendorDistance,
    location
  } = getState().customers;
  const { userId, userData } = getState().user;
  userData.userLatitude = location.coords.latitude;
  userData.userLongitude = location.coords.longitude;

  chatSocket.emit("booking", {
    room: `${userId} ${vendorsData.id}`,
    message: { bookData, userData, vendorDistance, location },
    type: "BOOK"
  });
  channelName = `${vendorsData.id} ${userId}`;

  dispatch({
    type: CONNECT_TO_SOCKET
  });
};

export const connectTosocketApprov = val => async (dispatch, getState) => {
  const { bookingData } = getState().vendors;
  const { userId } = getState().user;
  chatSocket.emit("booking_status", {
    room: `${val} ${userId}`,
    message: bookingData,
    type: "ACCEPT"
  });
  channelName = `${userId} ${val}`;
};

export const connectTosocketBookingCancle = val => async (
  dispatch,
  getState
) => {
  const { bookingData, bookingStatus } = getState().vendors;
  const { userId, isUserVendor } = getState().user;
  const { bookData } = getState().customers;
  var cancelData;
  if (isUserVendor === "1") {
    cancelData = bookingData;
  } else {
    cancelData = bookData;
  }

  chatSocket.emit("booking_status", {
    room: `${val}`,
    message: cancelData,
    type: "CANCEL"
  });
  channelName = `${userId} ${val}`;
};

export const connectTosocketReached = val => async (dispatch, getState) => {
  const { vendorsData, bookData } = getState().customers;
  const { userId } = getState().user;
  chatSocket.emit("booking_status", {
    room: `${vendorsData.id} ${userId}`,
    message: bookData,
    type: "REACHED"
  });
  channelName = `${userId} ${vendorsData.id}`;
};

export const socketLeave = () => async (dispatch, getState) => {
  const { userData } = getState().user;
  chatSocket.emit("leave_self_room", {
    room: `${userData.userId}`,
    type: "LEAVE"
  });
  channelName = `${userData.userId}`;
};

export const socketBookingOnTheWay = socketData => async (
  dispatch,
  getState
) => {
  const { bookingData, mechanicBookedData } = getState().vendors;
console.log(mechanicBookedData);
  chatSocket.emit("booking_status", {
    room: `${socketData.customer_id} ${mechanicBookedData.booking.vendor.vendor_id}`,
    message: mechanicBookedData,
    type: "ON-THE-WAY"
  });
  channelName = `${socketData.booking_id} ${socketData.customer_id}`;
};

export const socketVendorCurrentLocation = val => async (
  dispatch,
  getState
) => {
  const { mechanicBookedData } = getState().vendors;
  const { userData } = getState().user;
  vendorMobileno = userData.userMobileno;
  bookingDetails = mechanicBookedData;
  disp = dispatch;
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    // this.props.getUserLocationFail();
  }

  await Location.hasServicesEnabledAsync()
    .then(async res => {
      if (!res) {
        perm = await IntentLauncherAndroid.startActivityAsync(
          IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
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
  // console.error(Location.getHeadingAsync());

  dispatch(goToMap());
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME1, {
    accuracy: Location.Accuracy.BestForNavigation
  });
};

TaskManager.defineTask(LOCATION_TASK_NAME1, async ({ data, error }) => {
  if (error) {
    return;
  }

  if (bookingDetails) {
    const { locations } = data;
    console.log(locations);
    var radlat1 = (Math.PI * bookingDetails.booking.booking_latitude) / 180;

    var radlat2 = (Math.PI * locations[0].coords.latitude) / 180;
    var theta =
      bookingDetails.booking.booking_longitude - locations[0].coords.longitude;

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
    console.log(dist);
    dist = parseFloat(dist.toFixed(3));
    if (dist > 0.05) {
      chatSocket.emit("booking_status", {
        room: `${bookingDetails.booking.customer.customer_id} ${bookingDetails.booking.vendor.vendor_id}`,
        message: locations,
        distance: dist,
        mobile_no: vendorMobileno,
        type: "MECHANIC_CURRENT_LOCATION"
      });
      channelName = `${bookingDetails.booking.vendor.vendor_id} ${bookingDetails.booking.customer.customer_id}`;
    } else {
      chatSocket.emit("booking_status", {
        room: `${bookingDetails.booking.customer.customer_id} ${bookingDetails.booking.vendor.vendor_id}`,
        message: locations,
        distance: dist,
        mobile_no: vendorMobileno,
        type: "MECHANIC_CURRENT_LOCATION"
      });
      channelName = `${bookingDetails.booking.vendor.vendor_id} ${bookingDetails.booking.customer.customer_id}`;
      TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME1);
    }
  }
});

export const socketBookingCompleted = val => (dispatch, getState) => {
  const { userData } = getState().user;
  const { FutureBookingList } = getState().vendors;
  var booking = { booking: val };
  chatSocket.emit("booking_status", {
    room: `${val.customer.customer_id} ${userData.userId}`,
    message: booking,
    type: "COMPLETED"
  });
  channelName = `${userData.userId} ${val.customer.customer_id}`;
};
