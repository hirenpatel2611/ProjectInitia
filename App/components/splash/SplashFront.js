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
import { setTimer, setScore, updateUserType } from "../../actions";
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
      whiteText,
      midTextStyle,
      mainViewStyle,
      imageViewstyle,
      imageMechanic,
      image2,
      image3,
      image4,
      subViewStyle,
      titleTextStyle,
      buttonViewstyle
    } = styles;
    return (
      <View style={containerStyle}>
        <StatusBar backgroundColor="#7960FF" />
        <View style={mainViewStyle}>
          <View style={{ alignItems: "center" }}>
            <Image style={imageMechanic} source={MECHANIC} />
          </View>
          <View style={imageViewstyle}>
            <Image style={image2} source={HAND_HOLDING_UP} />
            <Image style={image3} source={CAR_ENGINE} />
            <Image style={image4} source={TIMING_BELT} />
          </View>
          <View style={subViewStyle}>
            <Text style={titleTextStyle}>Lets Get Started</Text>
            <Text style={midTextStyle}>
              Sweet And Safe Voyage!!!
            </Text>
          </View>
        </View>
        <View style={buttonViewstyle}>
          <TouchableHighlight
            onPress={() => {
              this.props.updateUserType(true);
              Actions.registerMobile();
            }}
            underlayColor="white"
          >
            <View style={createButton}>
              <Text style={[buttonText, whiteText]}>I am a Mechanic!</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              this.props.updateUserType(false);
              Actions.registerMobile();
            }}
            underlayColor="white"
          >
            <View style={loginButton}>
              <Text style={[buttonText, themeColor]}>
                Looking for mechanic?
              </Text>
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
  const { isVendor } = register;
  return { isVendor };
};

export default connect(
  mapStateToProps,
  { setTimer, setScore, updateUserType }
)(SplashFront);
