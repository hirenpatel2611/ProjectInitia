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
  TouchableHighlight,
  ActivityIndicator
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
import { updateMobileNumber, updatePassword, loginUser } from "../../actions";
import _ from "lodash";
import styles from "./LoginStyle";
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
              <Image
                style={{ width: 34, height: 48 }}
                source={HAND_HOLDING_UP}
              />
              <Image
                style={{
                  width: 64,
                  height: 47,
                  marginRight: 25,
                  marginLeft: 25
                }}
                source={CAR_ENGINE}
              />
              <Image style={{ width: 48, height: 48 }} source={TIMING_BELT} />
            </View>
            <View style={{ alignItems: "center", marginTop: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Login</Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  width: 350,
                  marginTop: 16
                }}
              >
                Enter your mobile number and password
              </Text>
            </View>
          </View>
          <View
            elevation={5}
            style={{
              alignItems: "center",
              marginTop: 25,
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
                value = {this.props.mobileno}
                onChangeText={text => {
                  this.props.updateMobileNumber(text);
                }}
              />
              <TextInput
                style={inputStyle}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value = {this.props.password}
                onChangeText={text => {
                  this.props.updatePassword(text);
                }}
              />
            <TouchableHighlight
              onPress={() =>{this.props.loginUser()}}
              underlayColor="white"
            >
              <View style={loginButton}>
              {
                this.props.loading?<Text style={[buttonText, themeColor]}>Loading...</Text>:<Text style={[buttonText, themeColor]}>Login</Text>
              }
              </View>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ login }) => {
  const { mobileno, password,loading,loginFailed } = login;
  return { mobileno, password,loading,loginFailed };
};

export default connect(
  mapStateToProps,
  { updateMobileNumber, updatePassword, loginUser }
)(Game);
