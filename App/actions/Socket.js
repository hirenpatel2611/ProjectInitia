import Peer from 'peerjs';
import {AsyncStorage} from 'react-native';
import io from 'socket.io-client';

export const CONNECT_TO_SOCKET = 'socket/connectTosocket';
export const CREATE_SOCKET_CHANNEL ='socket/createSocketChannel';

var peer =null;


export const createSocketChannel =()=> async(dispatch,getState)=>{
  console.log('dsadasdad');


 chatSocket = io('http://192.168.200.198:8081', {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ['websocket'],
  });

  const valueUserId = await AsyncStorage.getItem("user_id");
  chatSocket.on('new_message', function (data) {
   console.error(data);
});



}


export const connectTosocket =()=>async(dispatch,getState)=>{
  const { vendorsData } = getState().usermaps;

  const valueUserId = await AsyncStorage.getItem("user_id");

chatSocket.emit('new_message', { room: 'roomOne', message: 'kks' });

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
