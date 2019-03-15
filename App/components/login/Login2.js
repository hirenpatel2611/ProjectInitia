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
      whiteText,
      inputStyle
    } = styles;

    return (
      <View style={containerStyle}>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "stretch",
              marginTop: 93
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image style={{ width: 140, height: 140 }} source={BITMAP} />
            </View>
            <View style={{ alignItems: "center", marginTop: 32, margin: 30 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}
              >
                Registration
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  width: 350,
                  marginTop: 16
                }}
              >
                Enter your mobile number,we will send you OTP to verify later
              </Text>
            </View>
          </View>
          <View
            elevation={5}
            style={{
              alignItems: "center",
              marginTop: 30,
              backgroundColor: "white",
              borderRadius: 5,
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 10,
              padding: 30,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
              shadowOpacity: 1.0
            }}
          >
            <TextInput
              style={inputStyle}
              underlineColorAndroid="transparent"
              placeholder="Mobile Number"
              placeholderTextColor="#9D9D9D"
              autoCapitalize="none"
              keyboardType={"phone-pad"}
            />
            <TouchableHighlight
              onPress={() => Actions.login3()}
              underlayColor="white"
            >
              <View style={createButton}>
                <Text style={[buttonText, whiteText]}>Continue</Text>
              </View>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
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
