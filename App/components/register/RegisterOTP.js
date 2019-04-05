import React, { Component } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  ImageBackground,
  Dimensions,
  Button,
  TouchableHighlight,
  TextInput,
  textError
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Col, Row, Grid } from "react-native-easy-grid";
import { BITMAP1, BITMAP2, CAR, MOTORCYCLE, ICON_REFRESH } from "../../images";
import { Actions } from "react-native-router-flux";
import {
  updateVehicleBool,
  updateCarBool,
  updateOTPTimeOut,
  setTimeOut,
  onOTPChange,
  toggleModalOtp,
  updateOnSubmeetOtp,
  requestOtp
} from "../../actions";
import _ from "lodash";
import styles from "./RegisterStyle";
import TimerMixin from "react-timer-mixin";
import OtpInputs from "react-native-otp-inputs";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";

class RegisterOTP extends Component {
  componentDidMount() {
    this.props.updateOTPTimeOut();
    this.props.requestOtp();
  }

  render() {
    const {
      containerStyle,
      loginButton,
      createButton,
      button,
      buttonText,
      themeColor,
      whiteText,
      inputStyle,
      verificationInputStyle,
      textError
    } = styles;
    const { validate } = this.props;
    const {
      isTwoWheeler,
        isFourWheeler,
        isVendor,
        otpTimeOut,
        otp,
        visibleModalOtp,
        onSubmeetOtpForm} =this.props.register


    errors=this.props.onSubmeetOtpForm?validate(this.props.register):{};

    return (
      <View
        style={
          (containerStyle, [{ opacity: visibleModalOtp ? 0.5 : 1 }])
        }
      >
        <Modal
          visible={visibleModalOtp ? true : false}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.containertwo}>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={{ marginLeft: 40 }}>
                <Text
                  style={{
                    fontSize: 25,
                    color: "#000000",
                    marginTop: 13,
                    fontWeight: "bold"
                  }}
                >
                  Select your{" "}
                  {isVendor ? (
                    <Text>Service</Text>
                  ) : (
                    <Text>Vehicle</Text>
                  )}{" "}
                  Type
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 84
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.updateVehicleBool()}
                >
                  <View
                    elevation={5}
                    style={{
                      alignItems: "center",
                      padding: 10,
                      marginTop: 50,
                      backgroundColor: "white",
                      borderRadius: 60,
                      marginRight: 20,
                      marginLeft: 50,
                      marginBottom: 10,
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowRadius: 5,
                      shadowOpacity: 1.0
                    }}
                  >
                    <Image
                      style={{
                        width: 90,
                        height: 90,
                        resizeMode: "contain",
                        opacity: isTwoWheeler ? 0.2 : 1
                      }}
                      source={MOTORCYCLE}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.updateCarBool()}>
                  <View
                    elevation={5}
                    style={{
                      alignItems: "center",
                      padding: 10,
                      marginTop: 50,
                      backgroundColor: "white",
                      borderRadius: 60,
                      marginLeft: 20,
                      marginBottom: 10,
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowRadius: 5,
                      shadowOpacity: 1.0
                    }}
                  >
                    <Image
                      style={{
                        width: 90,
                        height: 90,
                        resizeMode: "contain",
                        opacity: isFourWheeler ? 0.2 : 1
                      }}
                      source={CAR}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{ alignItems: "center", marginTop: 114, margin: 30 }}
              >
                <TouchableHighlight
                  disabled={
                    isTwoWheeler
                      ? false
                      : true && isFourWheeler
                      ? false
                      : true
                  }
                  onPress={() => {
                    this.props.toggleModalOtp(false);
                    Actions.profile();
                  }}
                  underlayColor="white"
                  style={{
                    marginTop: 13,
                    opacity: isTwoWheeler
                      ? 1
                      : 0.8 && isFourWheeler
                      ? 1
                      : 0.8
                  }}
                >
                  <View style={createButton}>
                    <Text style={[buttonText, whiteText]}>Continue</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
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
              <Image style={{ width: 140, height: 140 }} source={BITMAP1} />
            </View>
            <View style={{ alignItems: "center", marginTop: 32 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}
              >
                Verification
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  width: 350,
                  marginTop: 16,
                  paddingRight: 33,
                  paddingLeft: 33
                }}
              >
                {" "}
                Enter 4 digit number that sent to
              </Text>
            </View>
          </View>
          <View
            elevation={5}
            style={{
              alignItems: "center",
              marginTop: 50,
              backgroundColor: "white",
              borderRadius: 5,
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 10,
              paddingBottom: 30,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
              shadowOpacity: 1.0
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <OtpInputs
                focusedBorderColor={"white"}
                handleChange={code => this.props.onOTPChange(code)}
                numberOfInputs={4}
                inputStyles={{
                  backgroundColor: "white",
                  borderBottomWidth: 1,
                  color: "black",
                  borderColor: "#7960FF"
                }}
                inputContainerStyles={{ backgroundColor: "white" }}
              />
            </View>
            {errors.otp ? (
              <Text style={styles.textError}>{errors.otp[0]}</Text>
            ) :null}
            <TouchableHighlight
              style={{ opacity: otp.length === 4 ? 1 : 0.8 }}
              onPress={() => {
              this.props.updateOnSubmeetOtp();
              this.props.isValid(this.props.register)?this.props.toggleModalOtp(true):null
              }}
              underlayColor="white"
            >
              <View style={createButton}>
                <Text style={[buttonText, whiteText]}>Continue</Text>
              </View>
            </TouchableHighlight>
            <Text
              style={{ fontSize: 14, textAlign: "center", color: "#7960FF" }}
            >
              {otpTimeOut ? (
                <Text> Re-send code in 00:{otpTimeOut} Second</Text>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.props.setTimeOut();
                    this.props.updateOTPTimeOut();
                    this.props.requestOtp();
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: 100,
                      top: 10
                    }}
                  >
                    <Image
                      style={{ width: 13, height: 13, right: 3 }}
                      source={ICON_REFRESH}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "center",
                        color: "#7960FF"
                      }}
                    >
                      Resend OTP
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const notEmpty = test => !isEmpty(test);
const rules = [
  {
    field: "otp",
    condition: (otp, state) => otp === state.recievedOTP,
    error: "OTP not verify"
  },

  // {
  //   field: 'avatar',
  //   condition: avatar => avatar,
  //   error: 'Please select a profile photo',
  // },
];

//const GameDetails = connect(mapStateToProps, mapDispatchToProps)(withValidation(rules, CreateGameDetails));
const mapStateToProps = ({ register }) => {
  const {
    isTwoWheeler,
    isFourWheeler,
    isVendor,
    otpTimeOut,
    otp,
    visibleModalOtp,
    onSubmeetOtpForm
  } = register;
  return {
    isTwoWheeler,
    isFourWheeler,
    isVendor,
    otpTimeOut,
    otp,
    visibleModalOtp,
    onSubmeetOtpForm,
    register,
  };
};

export default connect(
  mapStateToProps,
  {
    updateVehicleBool,
    updateCarBool,
    updateOTPTimeOut,
    setTimeOut,
    onOTPChange,
    toggleModalOtp,
    updateOnSubmeetOtp,
    requestOtp
  }
)(withValidation(rules, RegisterOTP));
