import React, {Component} from 'react';
import {View,TouchableOpacity,Text, Image} from 'react-native';
import { Actions } from "react-native-router-flux";
import { DISCOVER, MESSAGE, LOCATION, PROFILE } from "../images";

const Footer = ()=>{
  return(
          <View style={styles.containerStyle}>
          <TouchableOpacity
                onPress={()=>Actions.MessageToNearbyMechanic()}
                style={styles.touchableStyle}
           >
          <Image
            style={{ width: 25, height: 40, resizeMode: "contain", alignSelf:'center' }}
            source={MESSAGE}
          />
          <Text>Inbox</Text>
          </TouchableOpacity>

          <TouchableOpacity
                  onPress={()=>Actions.NearbyGarajeDiscover()}
                  style={styles.touchableStyle}
                  >
          <Image
            style={{ width: 25, height: 40, resizeMode: "contain", alignSelf:'center' }}
            source={DISCOVER}
          />
          <Text>Discover</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>Actions.NearbyGaraje()} >
          <Image
            style={{ width: 25, height: 40, resizeMode: "contain", alignSelf:'center' }}
            source={LOCATION}
          />
          <Text>Nearby</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>Actions.profile()} >
          <Image
            style={{ width: 25, height: 40, resizeMode: "contain", alignSelf:'center' }}
            source={PROFILE}
          />
          <Text>Profile</Text>
          </TouchableOpacity>
          </View>
        );
};

const styles ={
  containerStyle:{
    flexDirection:'row',
    backgroundColor:'f8f8f8',
    justifyContent:'space-around'
  },
  touchableStyle:{
    justifyContent:'space-around'
  }
};
export default Footer;
