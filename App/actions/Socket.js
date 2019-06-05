import Peer from "peerjs";
import { AsyncStorage } from "react-native";
import io from "socket.io-client";
import { BackgroundFetch, TaskManager, Location } from "expo";
import { getBookingModal, getBookingVendorStatus } from "./Vendors";
import { getBookingStatus, getMechanicCurrentLocation } from "./UserMaps";
import { Actions } from "react-native-router-flux";

export const CONNECT_TO_SOCKET = "socket/connectTosocket";
export const CREATE_SOCKET_CHANNEL = "socket/createSocketChannel";
const BOOKING_STATUS_RECEIVE_TASK_NAME =
  "background-booking-scoket-receive-task";
var peer = null;
export const createSocketChannel = () => async (dispatch, getState) => {
  chatSocket = io("http://103.50.153.25:3000", {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ["websocket"],

  });
  const { isUserVendor, userData } = getState().user;
  chatSocket.emit("self_room", { room: `${userData.userId}` });

  chatSocket.on('ping',function(data){
    console.log(data);
  chatSocket.emit('pong')
  }
)

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
        }else {
          Actions.customerRating();
        }

          break;


      default:
        return null;
    }
  });
  await Location.startLocationUpdatesAsync(BOOKING_STATUS_RECEIVE_TASK_NAME, {
    accuracy: Location.Accuracy.BestForNavigation
  });

  TaskManager.defineTask(
    BOOKING_STATUS_RECEIVE_TASK_NAME,
    ({ data, error }) => {
      // console.log(data);
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
              if (isUserVendor !== "1") {
              } else {
                dispatch(getBookingVendorStatus(data));
              }
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
              }else {
                Actions.customerRating();
              }
                break;

          default:
            return null;
        }
      });
    }
  );
};

export const connectTosocket = () => async (dispatch, getState) => {
  const {
    vendorsData,
    bookData,
    vendorDistance,
    location
  } = getState().usermaps;
  const { userId, userData } = getState().user;
  userData.userLatitude = location.coords.latitude;
  userData.userLongitude = location.coords.longitude;

  chatSocket.emit("booking", {
    room: `${userId} ${vendorsData.id}`,
    message: { bookData, userData, vendorDistance },
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

export const connectTosocketBookingCancle = val => async (dispatch,getState) => {
  const { bookingData, bookingStatus } = getState().vendors;
  const { userId,isUserVendor } = getState().user;
  const {bookData} = getState().usermaps;
  var cancelData;
  if(isUserVendor === '1'){
    cancelData=bookingData
  }else {
    cancelData=bookData
  }

  chatSocket.emit("booking_status", {
    room: `${val}`,
    message: cancelData,
    type: "CANCEL"
  });
  channelName = `${userId} ${val}`;
};

export const connectTosocketReached = (val) => async (dispatch, getState) => {
  const { vendorsData, bookData } = getState().usermaps;
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
