import Peer from "peerjs";
import { AsyncStorage } from "react-native";
import io from "socket.io-client";
import { BackgroundFetch } from "expo";
import { getBookingModal, getFutureBookings } from "./Vendors";
import { getBookingStatus, getMechanicCurrentLocation } from "./UserMaps";
import { Actions } from "react-native-router-flux";

export const CONNECT_TO_SOCKET = "socket/connectTosocket";
export const CREATE_SOCKET_CHANNEL = "socket/createSocketChannel";

var peer = null;
export const createSocketChannel = () => async (dispatch, getState) => {

  chatSocket = io("http://103.50.153.25:3000", {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ["websocket"]
  });
  const { isUserVendor, userId } = getState().user;

  chatSocket.emit("self_room", { room: `${userId}` });

  chatSocket.on("broadcast", function(data) {
    switch (data.type) {
      case "BOOK":
        dispatch(getBookingModal(data.message));
        break;

      case "ACCEPT":
        dispatch(getBookingStatus(data));
        break;

      case "ON-THE-WAY":
        if (isUserVendor !== "1") {
          dispatch(getBookingStatus(data));
        }
        dispatch(getFutureBookings());
        break;

      case "CANCEL":
        if (isUserVendor !== "1") {
          dispatch(getBookingStatus(data));
        }
        dispatch(getFutureBookings());
        break;

      case "MECHANIC_CURRENT_LOCATION":
        if (isUserVendor !== "1") {
          dispatch(getMechanicCurrentLocation(data));
        }
        break;

      default:
        return null;
    }
  });
};

export const connectTosocket = () => async (dispatch, getState) => {
  const { vendorsData, bookData } = getState().usermaps;
  const { userId } = getState().user;

  chatSocket.emit("booking", {
    room: `${userId} ${vendorsData.id}`,
    message: bookData,
    type: "BOOK"
  });
  channelName = `${vendorsData.id} ${userId}`;

  dispatch({
    type: CONNECT_TO_SOCKET
  });
};

export const connectTosocketApprov = val => async (dispatch, getState) => {
  const { bookingData, bookingStatus } = getState().vendors;
  const { userId } = getState().user;

  chatSocket.emit("booking_status", {
    room: `${val} ${userId}`,
    message: bookingData,
    type: "ACCEPT"
  });
  channelName = `${userId} ${val}`;

  dispatch({
    type: CONNECT_TO_SOCKET
  });
};

export const connectTosocketBookingCancle = () => async (
  dispatch,
  getState
) => {
  const { bookingData, bookingStatus } = getState().vendors;
  const { userId } = getState().user;
  chatSocket.emit("booking_status", {
    room: `${bookingData.customer_id} ${userId}`,
    message: bookingData,
    type: "CANCEL"
  });
  channelName = `${userId} ${bookingData.customer_id}`;

  dispatch({
    type: CONNECT_TO_SOCKET
  });
};
