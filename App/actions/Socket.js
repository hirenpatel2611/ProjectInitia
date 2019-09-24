import { AsyncStorage } from "react-native";
import Peer from "peerjs";
import io from "socket.io-client";
import { Notifications, Util } from "expo";
import { getBookingModal, getBookingVendorStatus, goToMap } from "./Vendors";
import {
  getBookingStatus,
  getMechanicCurrentLocation,
  getVendorRatingModal
} from "./Cutomers";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";
import * as Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import * as IntentLauncher from "expo-intent-launcher";

export const CONNECT_TO_SOCKET = "socket/connectTosocket";
export const CREATE_SOCKET_CHANNEL = "socket/createSocketChannel";

var isVen = null;
var disp = null;
var bookingDetails = null;
var vendorMobileno = null;
var valReach = null;

const LOCATION_TASK_NAME = "background-location-task";
const LOCATION_TASK_NAME1 = "background-location-task-current";
var peer = null;
export const createSocketChannel = val => async (dispatch, getState) => {
  chatSocket = io("http://103.50.153.25:3000", {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ["websocket"],
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
        dispatch(getBookingModal(data));
        break;

      case "ACCEPT":
        if (isUserVendor !== "1") {
          dispatch(getBookingStatus(data));
          // Util.reload()
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
        disp(getBookingModal(data));
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
  const myToken = await AsyncStorage.getItem("device_token");
  const { userId, userData } = getState().user;
  userData.userLatitude = location.coords.latitude;
  userData.userLongitude = location.coords.longitude;
  chatSocket.emit("booking", {
    room: `${userId} ${vendorsData.id}`,
    message: { bookData, userData, vendorDistance, location},
    type: "BOOK",
    toToken:vendorsData.device_token,
    fromToken:myToken
  });
  channelName = `${vendorsData.id} ${userId}`;

  dispatch({
    type: CONNECT_TO_SOCKET
  });
};

export const connectTosocketApprov = val => async (dispatch, getState) => {
  const { bookingData,bookingModalData } = getState().vendors;
  const { userId } = getState().user;

  chatSocket.emit("booking_status", {
    room: `${val.customer_id} ${userId}`,
    message: bookingData,
    type: "ACCEPT",
    toToken:val.customerToken
  });
  channelName = `${userId} ${val.customer_id}`;
};

export const connectTosocketBookingCancle = val => async (
  dispatch,
  getState
) => {
  const { bookingData, bookingStatus, cancelBookingData} = getState().vendors;
  const { userId, isUserVendor } = getState().user;
  const { bookData,vendorsData } = getState().customers;
  var cancelData;
  var toToken;
  if (isUserVendor === "1") {
    cancelData = bookingData;
    Notifications.dismissAllNotificationsAsync()
    Notifications.cancelAllScheduledNotificationsAsync();
  } else {
    cancelData = bookData;
  }

  chatSocket.emit("booking_status", {
    room: `${val.customer_id}`,
    message: cancelData,
    type: "CANCEL",
    toToken:val.toToken,
  });
  channelName = `${userId} ${val}`;

  dispatch(socketLeaveClubRoom({receiver_id:val.customer_id,sender_id:val.sender_id}))
  Notifications.dismissAllNotificationsAsync();
  TaskManager.unregisterAllTasksAsync();
};

export const connectTosocketReached = val => async (dispatch, getState) => {
  const { mechanicBookedData } = getState().vendors;
  const { userId } = getState().user;
  chatSocket.emit("booking_status", {
    room: `${val.customer_id} ${userId}`,
    message: mechanicBookedData,
    type: "REACHED",
    toToken:val.customerToken //vendorsData.device_token
  });
  channelName = `${userId} ${val.customer_id}`;
};

export const socketLeave = () => async (dispatch, getState) => {
  const { userData } = getState().user;
  chatSocket.emit("leave_self_room", {
    room: `${userData.userId}`,
    type: "LEAVE"
  });
  channelName = `${userData.userId}`;
};

export const socketLeaveClubRoom = val => () => {
  console.log(val, "Loave Club Room");
  chatSocket.emit("leave_self_room", {
    room: `${val.receiver_id} ${val.sender_id}`,
    type: "LEAVE"
  });
  channelName = `${val.sender_id} ${val.receiver_id}`;
};

export const socketBookingOnTheWay = socketData => async (
  dispatch,
  getState
) => {
  const { bookingData, mechanicBookedData } = getState().vendors;

  chatSocket.emit("booking_status", {
    room: `${socketData.customer_id} ${mechanicBookedData.booking.vendor.vendor_id}`,
    message: mechanicBookedData,
    type: "ON-THE-WAY",
    toToken:socketData.customerToken,
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
  valReach= val;
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    // this.props.getUserLocationFail();
  }

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
  // console.error(Location.getHeadingAsync());

  dispatch(goToMap());
  var localNotification = { title: "iLife", body: "Location" ,android:{icon:'../../assets/icon2.png'}};

  Notifications.scheduleLocalNotificationAsync(localNotification, {
    time: new Date().getTime() + 1000,
    repeat: "minute"
  });

  Notifications.addListener(async () => {
    let locations = [
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      })
    ];

    if (bookingDetails) {
      var radlat1 = (Math.PI * bookingDetails.booking.booking_latitude) / 180;

      var radlat2 = (Math.PI * locations[0].coords.latitude) / 180;
      var theta =
        bookingDetails.booking.booking_longitude -
        locations[0].coords.longitude;

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
      disp(createSocketChannel(bookingDetails.booking.vendor.vendor_id));
      if (dist > 0.05) {
        chatSocket.emit("booking_status", {
          room: `${bookingDetails.booking.customer.customer_id} ${bookingDetails.booking.vendor.vendor_id}`,
          message: locations,
          distance: dist,
          mobile_no: vendorMobileno,
          type: "MECHANIC_CURRENT_LOCATION",
          toToken:null
        });
        channelName = `${bookingDetails.booking.vendor.vendor_id} ${bookingDetails.booking.customer.customer_id}`;
      } else {
        chatSocket.emit("booking_status", {
          room: `${bookingDetails.booking.customer.customer_id} ${bookingDetails.booking.vendor.vendor_id}`,
          message: locations,
          distance: dist,
          mobile_no: vendorMobileno,
          type: "MECHANIC_CURRENT_LOCATION",
          toToken:null
        });
        channelName = `${bookingDetails.booking.vendor.vendor_id} ${bookingDetails.booking.customer.customer_id}`;

        Notifications.dismissAllNotificationsAsync()
        Notifications.cancelAllScheduledNotificationsAsync();
      }
    }
  });
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME1, {
    accuracy: Location.Accuracy.BestForNavigation,
    foregroundService: {
      notificationTitle: "Location Tracking ",
      notificationBody: "Location used for tracking purpose"
    },
    timeInterval: 1000,
    distanceInterval: 0.5,
    showsBackgroundLocationIndicator: true
  });

};

TaskManager.defineTask(LOCATION_TASK_NAME1, async ({ data, error }) => {
  if (error) {
    return console.log("You error");
  }

  if (bookingDetails) {
    const { locations } = data;
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

    dist = parseFloat(dist.toFixed(3));
    disp(createSocketChannel(bookingDetails.booking.vendor.vendor_id));
    if (dist > 0.05) {
      chatSocket.emit("booking_status", {
        room: `${bookingDetails.booking.customer.customer_id} ${bookingDetails.booking.vendor.vendor_id}`,
        message: locations,
        distance: dist,
        mobile_no: vendorMobileno,
        type: "MECHANIC_CURRENT_LOCATION",
        toToken:null
      });
      channelName = `${bookingDetails.booking.vendor.vendor_id} ${bookingDetails.booking.customer.customer_id}`;
    } else {
      console.log("You are");
      chatSocket.emit("booking_status", {
        room: `${bookingDetails.booking.customer.customer_id} ${bookingDetails.booking.vendor.vendor_id}`,
        message: locations,
        distance: dist,
        mobile_no: vendorMobileno,
        type: "MECHANIC_CURRENT_LOCATION",
        toToken:null
      });
      channelName = `${bookingDetails.booking.vendor.vendor_id} ${bookingDetails.booking.customer.customer_id}`;
      TaskManager.unregisterAllTasksAsync();
      //disp(socketLeaveClubRoom({receiver_id:bookingDetails.booking.customer.customer_id,sender_id:bookingDetails.booking.vendor.vendor_id}))
      disp(connectTosocketReached(valReach))
      Notifications.dismissAllNotificationsAsync()
    }
  }
});

export const socketBookingCompleted = val => (dispatch, getState) => {
  const { userData } = getState().user;
  const { FutureBookingList } = getState().vendors;
  var booking = { booking: val };
  chatSocket.emit("booking_status", {
    room: `${val.customer.customer_id} ${userData.userId} ${val.booking_id}`,
    message: booking,
    type: "COMPLETED",
    toToken:val.customer.device_token
  });
  channelName = `${userData.userId} ${val.customer.customer_id} ${val.booking_id}`;

  chatSocket.emit("leave_self_room", {
    room: `${val.customer.customer_id} ${userData.userId} ${val.booking_id}`,
    type: "LEAVE"
  });
  channelName = `${userData.userId} ${val.customer.customer_id} ${val.booking_id}`;

  dispatch(socketLeaveClubRoom({receiver_id:val.customer.customer_id,sender_id:userData.userId}))
  Notifications.dismissAllNotificationsAsync()
  Notifications.cancelAllScheduledNotificationsAsync();
  TaskManager.unregisterAllTasksAsync();

};


// async function registerForPushNotificationsAsync() {
//   const { status: existingStatus } = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   );
//   let finalStatus = existingStatus;
//
//   // only ask if permissions have not already been determined, because
//   // iOS won't necessarily prompt the user a second time.
//   if (existingStatus !== 'granted') {
//     // Android remote notification permissions are granted during the app
//     // install, so this will only ask on iOS
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//   }
//
//   // Stop here if the user did not grant permissions
//   if (finalStatus !== 'granted') {
//     return;
//   }
//
//   // Get the token that uniquely identifies this device
//   let token = await Notifications.getExpoPushTokenAsync();
//
//   // POST the token to your backend server from where you can retrieve it to send push notifications.
//   return fetch(PUSH_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       token: {
//         value: token,
//       },
//       user: {
//         username: 'Brent',
//       },
//     }),
//   });
// }
