import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Image,
  AsyncStorage,
  TouchableOpacity,
  Share
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import styles from "./SideMenuStyle";
import { Spinner, CardSection } from "../../Common";
import PropTypes from "prop-types";
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT,
  POWERBUTTON
} from "../../images";
import { socketLeave, setAllStateToInitial,venderActivation } from "../../actions";

class SideMenuVendor extends Component {
  _deleteUser = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("is_vendor");
      await AsyncStorage.removeItem("user_id");
      await AsyncStorage.removeItem("device_token");
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };//https://play.google.com/apps/internaltest/4700479554932908572

  shareMechanicApp = () => {
    var playStoreUrl ="https://play.google.com/apps/internaltest/4700479554932908572"
    Share.share({
      message: playStoreUrl
    }).then(response => {
    });
  }

  render() {
    const {
      container,
      textStyle,
      viewContainer,
      profileImageStyle,
      textViewStyle,
      userInfoTextStyle,
      image4,
      imageMechanic,
      image3,
      image2,
      imageViewstyle
    } = styles;
    return (
      <View style={[viewContainer]}>
        <CardSection
          style={{
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-around",
            borderBottomWidth: 0,
            borderTopWidth: 0
          }}
        />

        <View style={{ alignItems: "center" }}>
          <Image style={imageMechanic} source={MECHANIC} />
        </View>
        <View style={imageViewstyle}>
          <Image style={image2} source={HAND_HOLDING_UP} />
          <Image style={image3} source={CAR_ENGINE} />
          <Image style={image4} source={TIMING_BELT} />
        </View>
        <Image style={{width:150,height:70,alignSelf:'center',marginBottom:10,top:10}} source={{uri:'http://ilifenetwork.com/api/web/velwayIcon.png'}} />
        <View
          style={{
            width: 170,
            alignSelf:'center',
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 10,
            padding: 5,
            marginTop: 20,
            shadowColor: "#000",
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.5,
            elevation: 2
          }}
        >

            <Text style={{ fontFamily: "circular-book" }}>
              Available Points : {this.props.walletBalance}
            </Text>

        </View>
        <CardSection
          style={{
            flexDirection: "column",
            borderBottomWidth: 0,
            borderTopWidth: 0
          }}
        >
          <Button
            containerStyle={container}
            style={textStyle}
            onPress={() => {
              Actions.VendorProfile();
            }}
          >
            Profile
          </Button>
        </CardSection>
        <CardSection
          style={{
            flexDirection: "column",
            borderBottomWidth: 0,
            borderTopWidth: 0
          }}
        >
          <Button
            containerStyle={container}
            style={textStyle}
            onPress={() => {
              Actions.FutureBooking();
            }}
          >
            Bookings
          </Button>
        </CardSection>
        <CardSection
          style={{
            flexDirection: "column",
            borderBottomWidth: 0,
            borderTopWidth: 0
          }}
        >
          <Button
            containerStyle={container}
            style={textStyle}
            onPress={() => {
              Actions.Wallet();
            }}
          >
            Wallet
          </Button>
        </CardSection>
        <CardSection
          style={{
            flexDirection: "column",
            borderBottomWidth: 0,
            borderTopWidth: 0
          }}
          >
            <Button
              containerStyle={container}
              style={textStyle}
              onPress={() => {
              this.shareMechanicApp();
              }}
            >
            App For Staff
          </Button>
        </CardSection>
        <CardSection
          style={{
            flexDirection: "column",
            borderBottomWidth: 0,
            borderTopWidth: 0
          }}
        >
          <Button
            containerStyle={container}
            style={textStyle}
            onPress={() => {
              this._deleteUser();
              this.props.socketLeave();
              this.props.setAllStateToInitial();
              Actions.SplashFront();
            }}
          >
            Log Out
          </Button>
        </CardSection>

        {this.props.userData.userStatus === "Pending" || this.props.userData.userStatus === ""?null:<CardSection
          style={{
            flexDirection: "column",
            borderBottomWidth: 0,
            borderTopWidth: 0,
            alignItems:'center'
          }}
        >
        <TouchableOpacity
        onPress={()=>{
          this.props.venderActivation()
        }}
        style={{marginTop:'30%'}}
        >
        <Image source={{uri:'http://ilifenetwork.com/api/web/PowerButton.png'}}
        style={{height:50,width:50, tintColor:this.props.isVendorActive?"#7960FF":"grey"}}/>
        </TouchableOpacity>

         <Text
         style={{fontSize:16,fontFamily:'circular-book',top:10,color:this.props.isVendorActive?"#7960FF":"grey"}}>
         {this.props.isVendorActive?"Online":"Offline"}</Text>
        </CardSection>}
        <CardSection
        style={{marginTop:'40%',
          flexDirection: "column",
          borderBottomWidth: 0,
          borderTopWidth: 0,
          alignItems:'center'
        }}
        >

        </CardSection>

      </View>
    );
  }
}

const mapStateToProps = ({ forgot,vendors,user }) => {
  const { forgotOTP } = forgot;
  const {userData} = user;
  const {walletBalance,isVendorActive} = vendors;
  return {
    forgotOTP,
    walletBalance,
    isVendorActive,
    userData
  };
};

export default connect(
  mapStateToProps,
  {
    socketLeave,
    setAllStateToInitial,
    venderActivation
  }
)(SideMenuVendor);
