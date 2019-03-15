import React, { Component } from "react";
import {
  View,
  Text,
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
// import { Col, Row, Grid } from "react-native-easy-grid";
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT
} from "../../images";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore } from "../../actions";
import _ from "lodash";
import styles from "./LoginStyle";
import TimerMixin from "react-timer-mixin";

class Game extends Component {

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
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <TouchableHighlight
            onPress={() => Actions.login2()}
            underlayColor="white"
          >
            <View style={createButton}>
              <Text style={[buttonText, whiteText]}>Create Account</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => Actions.login0()}
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

const mapStateToProps = ({ game }) => {
  const { time, score } = game;
  return { time, score };
};

export default connect(
  mapStateToProps,
  { setTimer, setScore }
)(Game);
