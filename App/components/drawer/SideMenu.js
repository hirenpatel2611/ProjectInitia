import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewPropTypes,Image,AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import styles from './SideMenuStyle';
import {Spinner,CardSection} from '../../Common';
import PropTypes from 'prop-types';
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT
} from "../../images";
import {
socketLeave,
} from "../../actions";

 class SideMenu extends Component {

_deleteUser = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("is_vendor");
    await AsyncStorage.removeItem("user_id");


  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

  render(){

   const {container,textStyle,viewContainer,profileImageStyle,textViewStyle,userInfoTextStyle,image4,imageMechanic,image3,image2,imageViewstyle}=styles;
    return (
      <View style={[viewContainer]}>

      <CardSection style={{padding:15,flexDirection:'row',justifyContent:'space-around',borderBottomWidth:0,borderTopWidth:0 }} />
      <View style={{ alignItems: "center" }}>
        <Image style={imageMechanic} source={MECHANIC} />
      </View>
      <View style={imageViewstyle}>
        <Image style={image2} source={HAND_HOLDING_UP} />
        <Image style={image3} source={CAR_ENGINE} />
        <Image style={image4} source={TIMING_BELT} />
      </View>

        <CardSection style={{ flexDirection: 'column',borderBottomWidth:0,borderTopWidth:0 }}>
          <Button
            containerStyle={container}
            style={textStyle}
            onPress={()=>{Actions.UserProfile()}}
          >Profile</Button>
          </CardSection>
          <CardSection  style={{ flexDirection:'column',borderBottomWidth:0,borderTopWidth:0 }}>
          <Button
            containerStyle={container}
            style={textStyle}
            onPress={()=>{Actions.NearbyGaraje()}}
          >Nearby Mechanic</Button>
        </CardSection>
        <CardSection  style={{ flexDirection:'column',borderBottomWidth:0,borderTopWidth:0 }}>
        <Button
          containerStyle={container}
          style={textStyle}
          onPress={()=>{Actions.Booking()}}
        >Bookings</Button>
        </CardSection>
        <CardSection  style={{ flexDirection:'column',borderBottomWidth:0,borderTopWidth:0 }}>
        <Button
          containerStyle={container}
          style={textStyle}
          onPress={()=>{
            this._deleteUser();
            Actions.SplashFront();
              this.props.socketLeave();
          }}
        >Log Out</Button>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = ({ forgot }) => {
  const {
    forgotOTP,
  } = forgot;
  return {
forgotOTP,
  };
};

export default connect(
  mapStateToProps,
  {
    socketLeave
  }
)(SideMenu);
