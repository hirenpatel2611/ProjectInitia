import Peer from "peerjs";
import { AsyncStorage } from "react-native";
import io from "socket.io-client";
import { BackgroundFetch } from "expo";
import { getBookingModal } from "./Vendors";
import {getBookingStatus} from './UserMaps';

export const CONNECT_TO_SOCKET = "socket/connectTosocket";
export const CREATE_SOCKET_CHANNEL = "socket/createSocketChannel";

var peer = null;

export const createSocketChannel = () => async (dispatch, getState) => {
  //console.error( await BackgroundFetch.getStatusAsync());

  chatSocket = io("http://103.68.166.65:8081", {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ["websocket"]
  });

  const valueUserId = await AsyncStorage.getItem("user_id");
  chatSocket.emit("self_room", { room: `${valueUserId}` });

  chatSocket.on("broadcast", function(data) {
    console.log(data);
    switch (data.type) {
      case "BOOK" :
      dispatch(getBookingModal(data.message));
              break;

       case "ACCEPT":
            dispatch(getBookingStatus(data))
            break;
      default:
            return null;
    }

  });


};

export const connectTosocket = () => async (dispatch, getState) => {
  const { vendorsData, bookData } = getState().usermaps;
  const valueUserId = await AsyncStorage.getItem("user_id");
  console.log(vendorsData.id);
  chatSocket.emit("booking", {
    room: `${valueUserId} ${vendorsData.id}`,
    message: bookData,
    type:"BOOK"
  });
  channelName = `${vendorsData.id} ${valueUserId}`;

  dispatch({
    type: CONNECT_TO_SOCKET
  });
};

export const connectTosocketApprov = () => async (dispatch, getState) => {
  const { bookingData, bookingStatus } = getState().vendors;
  const valueUserId = await AsyncStorage.getItem("user_id");
  console.log(bookingData);
  chatSocket.emit("booking_status", {
    room: `${bookingData.customer_id} ${valueUserId}`,
    message: bookingData,
    type: "ACCEPT"
  });
  channelName = `${valueUserId} ${bookingData.customer_id}`;

  dispatch({
    type: CONNECT_TO_SOCKET
  });
};
