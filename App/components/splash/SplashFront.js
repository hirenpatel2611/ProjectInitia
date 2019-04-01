import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  ImageBackground,
  Dimensions,
  Button,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Col, Row, Grid } from "react-native-easy-grid";
import { BITMAP } from "../../images";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore,updateUserType } from "../../actions";
import _ from "lodash";
import styles from "./SplashStyles";
import TimerMixin from "react-timer-mixin";
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT
} from "../../images";

class SplashFront extends Component {


  render() {
    const {
      containerStyle,
      topImageStyle,
      gameBtnStyle,
      gameBtnTextStyle,
      holeContainerStyle,
      holeViewStyle,
      moleImageStyle,
      moleBtnStyle,
      holeImageStyle,
      holeMaskImageStyle,
      animatedViewStyle,
      loginButton,
      createButton,
      button,
      buttonText,
      themeColor,
      whiteText
    } = styles;
    return (
      <View style={containerStyle}>
        <StatusBar backgroundColor="#7960FF" />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "stretch",
            marginTop: 75
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image style={{ width: 96, height: 110 }} source={MECHANIC} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 24
            }}
          >
            <Image style={{ width: 34, height: 48 }} source={HAND_HOLDING_UP} />
            <Image
              style={{ width: 64, height: 47, marginRight: 25, marginLeft: 25 }}
              source={CAR_ENGINE}
            />
            <Image style={{ width: 48, height: 48 }} source={TIMING_BELT} />
          </View>
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Lets Get Started
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                width: 350,
                marginTop: 16
              }}
            >
              To find a best mechanic please create or login your account
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginBottom: 40}}>
          <TouchableHighlight
            onPress={() => {
              this.props.updateUserType(true)
              Actions.registerMobile()
            }}
            underlayColor="white"
          >
            <View style={createButton}>
              <Text style={[buttonText, whiteText]}>I am a Mechanic!</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() =>{
              this.props.updateUserType(false)
              Actions.registerMobile()
            }}
            underlayColor="white"
          >
            <View style={loginButton}>
              <Text style={[buttonText, themeColor]}>Looking for mechanic?</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => Actions.login()}
            underlayColor="white"
          >
            <View style={loginButton}>
              <Text style={[buttonText, themeColor]}>Login</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ register }) => {
  const {isVendor} = register;
  return { isVendor};
};

export default connect(
  mapStateToProps,
  { setTimer, setScore,updateUserType}
)(SplashFront);
