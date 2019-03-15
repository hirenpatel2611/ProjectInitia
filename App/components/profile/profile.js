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
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT
} from "../../images";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore } from "../../actions";
import _ from "lodash";
import styles from "./ProfileStyle";
import TimerMixin from "react-timer-mixin";

class Game extends Component {

  render() {
    const {
      containerStyle,
      loginButton,
      createButton,
      button,
      buttonText,
      themeColor,
      whiteText,
      phoneinputStyle,
      inputStyle
    } = styles;


    return (
      <View style={containerStyle}>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />
          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "stretch" }}
          >
            <Text
              style={{
                paddingTop: 16,
                paddingLeft: 16,
                fontSize: 20,
                fontWeight: "bold",
                color: "#4B4B4B"
              }}
            >
              Personal Details
            </Text>
            <View
              style={{
                paddingTop: 16,
                paddingLeft: 16,
                flex: 1,
                flexDirection: "row",
                borderBottomWidth: 1,
                paddingBottom: 16
              }}
            >
              <View style={{ paddingRight: 30 }}>
                <Image
                  source={require("../../images/USER2.png")}
                  style={{ width: 64, height: 64, borderRadius: 150 / 2 }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#4B4B4B" }}
                >
                  Name
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#4B4B4B"
                  }}
                >
                  Ankit Rajput
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                flex: 1,
                flexDirection: "column",
                borderBottomWidth: 1
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#9C9C9C" }}
              >
                Address
              </Text>
              <TextInput
                style={{ fontSize: 16, fontWeight: "bold" }}
                value={"3rd Floor 91 springboard"}
                underlineColorAndroid="transparent"
                placeholder="Address"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                flex: 1,
                flexDirection: "column",
                borderBottomWidth: 1
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#9C9C9C" }}
              >
                Email
              </Text>
              <TextInput
                style={{ fontSize: 16, fontWeight: "bold" }}
                value={"ankit.mytrack@mytrac.com"}
                underlineColorAndroid="transparent"
                placeholder="Address"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                flex: 1,
                flexDirection: "column",
                borderBottomWidth: 1
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#9C9C9C" }}
              >
                Date of Birth
              </Text>
              <TextInput
                style={{ fontSize: 16, fontWeight: "bold" }}
                value={"26 Feb,1993"}
                underlineColorAndroid="transparent"
                placeholder="Address"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                flex: 1,
                flexDirection: "column",
                borderBottomWidth: 1
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#9C9C9C" }}
              >
                Password
              </Text>
              <TextInput
                style={{ fontSize: 16, fontWeight: "bold" }}
                value={"***********"}
                underlineColorAndroid="transparent"
                placeholder="Address"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                flex: 1,
                flexDirection: "column",
                borderBottomWidth: 1
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#9C9C9C" }}
              >
                Confirm Password
              </Text>
              <TextInput
                style={{ fontSize: 16, fontWeight: "bold" }}
                value={"***********"}
                underlineColorAndroid="transparent"
                placeholder="Address"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                paddingTop: 8,
                paddingLeft: 16,
                flex: 1,
                flexDirection: "column"
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#9C9C9C" }}
              >
                My Langauge
              </Text>
              <TextInput
                style={{ fontSize: 16, fontWeight: "bold" }}
                value={"English"}
                underlineColorAndroid="transparent"
                placeholder="Address"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableHighlight
                onPress={() => Actions.login1()}
                underlayColor="white"
              >
                <View style={createButton}>
                  <Text style={[buttonText, whiteText]}>Continue</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View />
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
