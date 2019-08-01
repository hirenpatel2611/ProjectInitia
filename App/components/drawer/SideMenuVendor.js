import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Image,
  AsyncStorage,
  TouchableOpacity
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
  TIMING_BELT
} from "../../images";
import { socketLeave, setAllStateToInitial } from "../../actions";

class SideMenuVendor extends Component {
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
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            elevation: 2
          }}
        >
          <TouchableOpacity
            style={{
              width: 170,
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 10,
              padding: 5
            }}
          >
            <Text style={{ fontFamily: "circular-book" }}>
              Available Points : 100
            </Text>
          </TouchableOpacity>
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
              this._deleteUser();
              this.props.socketLeave();
              this.props.setAllStateToInitial();
              Actions.SplashFront();
            }}
          >
            Log Out
          </Button>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = ({ forgot }) => {
  const { forgotOTP } = forgot;
  return {
    forgotOTP
  };
};

export default connect(
  mapStateToProps,
  {
    socketLeave,
    setAllStateToInitial
  }
)(SideMenuVendor);
