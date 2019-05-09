import Peer from 'peerjs';
import {AsyncStorage} from 'react-native';
import io from 'socket.io-client';
import { BackgroundFetch } from 'expo';
import {getBookingModal} from './Vendors';

export const CONNECT_TO_SOCKET = 'socket/connectTosocket';
export const CREATE_SOCKET_CHANNEL ='socket/createSocketChannel';

var peer =null;


export const createSocketChannel =()=> async(dispatch,getState)=>{
  //console.error( await BackgroundFetch.getStatusAsync());


 chatSocket = io('http://192.168.200.198:3000', {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ['websocket'],
  });

  const valueUserId = await AsyncStorage.getItem("user_id");
  chatSocket.emit('self_room', { room: `${valueUserId}`});

  chatSocket.on('broadcast', function (data) {

   if(data === "you have a booking")
   {
     dispatch(getBookingModal(true));
   }
});



}


export const connectTosocket =()=>async(dispatch,getState)=>{
  const { vendorsData } = getState().usermaps;

  const valueUserId = await AsyncStorage.getItem("user_id");

chatSocket.emit('booking', { room: `${valueUserId} ${vendorsData.id}`, message: 'kks' });

  channelName = `${vendorsData.id} ${valueUserId}`;





//   const conn = await peer.connect()
//
// try{
//   peer.on('open', () => {
//     console.error();
//     conn.send('hi!');
//   });
// }catch(e){
//   console.error(e);
// }
  dispatch({
    type:CONNECT_TO_SOCKET
  })
}
