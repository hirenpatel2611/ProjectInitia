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
import {
  BITMAP1,
  CAR,
  MOTORCYCLE,
  ICON_REFRESH,
  HEAVY_VEHICLE,
  TOWING,
  TYRE
} from "../../images";
import { Actions } from "react-native-router-flux";
import {
  updateVehicleBool,
  updateCarBool,
  updateHeavyVehicleBool,
  updateTowingServiceBool,
  updateTyreServiceBool,
  updateOTPTimeOut,
  setTimeOut,
  onOTPChange,
  toggleModalOtp,
  updateOnSubmeetOtp,
  requestOtp,
  signupUser
} from "../../actions";
import _ from "lodash";
import styles from "./RegisterStyle";
import TimerMixin from "react-timer-mixin";
import OtpInputs from "react-native-otp-inputs";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";

let ScreenHeight = Dimensions.get("window").height;
class RegisterOTP extends Component {
  componentDidMount() {
    this.props.updateOTPTimeOut();
    //this.props.requestOtp();
  }

  render() {
    const {
      containerStyle,
      createButton,
      button,
      buttonText,
      whiteText,
      textError,
      buttonOtpStyle,
      buttonOtpStyle1,
      holeContainerStyle,
      otpInputStyle,
      otpViewStyle,
      otpHText,
      resendViewStyle,
      resendTextStyle,
      imageMotorcycle,
      subContainorOtp,
      modalHTextStyle,
      modalButtonViewStyle,
      modalVahicle,
      image1Otp,
      image1OtpView,
      otpMainView,
      headerOtpView,
      otpResendText,
      headerOtpText,
      imageRefreshStyle
    } = styles;
    const { validate } = this.props;
    const {
      isTwoWheeler,
      isFourWheeler,
      isHeavyVehicle,
      isTowingService,
      isTyreService,
      isVendor,
      otpTimeOut,
      otpMinute,
      otp,
      visibleModalOtp,
      mobileno,
      onSubmeetOtpForm
    } = this.props.register;

    errors = this.props.onSubmeetOtpForm ? validate(this.props.register) : {};

    return (
      <View style={(containerStyle, [{ opacity: visibleModalOtp ? 0.5 : 1 }])}>
        <KeyboardAwareScrollView enableOnAndroid>
          <StatusBar backgroundColor="#7960FF" />
          <Modal
            visible={visibleModalOtp ? true : false}
            onRequestClose={() => {}}
            animationType="slide"
            transparent={true}
          >
            <View style={[styles.containertwo,,{marginTop: this.props.isVendor?0.08 * ScreenHeight:0.2 * ScreenHeight,height:this.props.isVendor? 0.82 * ScreenHeight:0.62 * ScreenHeight}]}>
              <Text style={modalHTextStyle}>
                Select your{" "}
                {isVendor ? <Text>Service</Text> : <Text>Vehicle</Text>} Type
              </Text>
              <View style={{height:this.props.isVendor? 0.6 * ScreenHeight:0.38 * ScreenHeight, flexDirection:'column',justifyContent:'space-around'}}>
              <View style={[modalButtonViewStyle]}>
                <TouchableOpacity
                  onPress={() => this.props.updateVehicleBool()}
                >
                  <View elevation={5} style={buttonOtpStyle}>
                    <Image
                      style={{
                        width: 95,
                        height: 95,
                        resizeMode: "contain",
                        opacity: isTwoWheeler ? 0.2 : 1
                      }}
                      source={MOTORCYCLE}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.updateCarBool()}>
                  <View elevation={5} style={buttonOtpStyle1}>
                    <Image
                      style={{
                        width: 95,
                        height: 95,
                        resizeMode: "contain",
                        opacity: isFourWheeler ? 0.2 : 1
                      }}
                      source={CAR}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={modalButtonViewStyle}>
                <TouchableOpacity
                  onPress={() => this.props.updateHeavyVehicleBool()}
                >
                  <View elevation={5} style={buttonOtpStyle}>
                    <Image
                      style={{
                        width: 95,
                        height: 95,
                        resizeMode: "contain",
                        opacity: isHeavyVehicle ? 0.2 : 1
                      }}
                      source={HEAVY_VEHICLE}
                    />
                  </View>
                </TouchableOpacity>
                {this.props.isVendor?<TouchableOpacity
                  onPress={() => this.props.updateTowingServiceBool()}
                >
                  <View elevation={5} style={buttonOtpStyle1}>
                    <Image
                      style={{
                        width: 95,
                        height: 95,
                        resizeMode: "contain",
                        opacity: isTowingService ? 0.2 : 1
                      }}
                      source={{uri:'http://ilifenetwork.com/api/web/towing.png'}}
                    />
                  </View>
                </TouchableOpacity>:null}
              </View>

              {this.props.isVendor?<View style={modalButtonViewStyle}>
                <TouchableOpacity
                  onPress={() => this.props.updateTyreServiceBool()}
                >
                  <View elevation={5} style={buttonOtpStyle}>
                    <Image
                      style={{
                        width: 95,
                        height: 95,
                        resizeMode: "contain",
                        opacity: isTyreService ? 0.2 : 1
                      }}
                      source={{uri:'http://ilifenetwork.com/api/web/tyre.png'}}
                    />
                  </View>
                </TouchableOpacity>
              </View>:null}
              </View>
              <TouchableHighlight
                disabled={
                  isTwoWheeler || isFourWheeler || isHeavyVehicle || isTowingService || isTyreService ? false : true
                }
                onPress={() => {
                  this.props.toggleModalOtp(false);
                  Actions.profile();
                }}
                underlayColor="white"
                style={[
                  createButton,
                  {
                    marginTop: this.props.isVendor?13:3,
                    opacity: isTwoWheeler || isFourWheeler || isHeavyVehicle || isTowingService || isTyreService ? 1 : 0.8
                  }
                ]}
              >
                <Text style={[buttonText, whiteText]}>Continue</Text>
              </TouchableHighlight>
            </View>
          </Modal>

          <View style={otpMainView}>
            <View style={image1OtpView}>
              <Image style={image1Otp} source={BITMAP1} />
            </View>
            <View style={headerOtpView}>
              <Text style={headerOtpText}>Verification</Text>
              <Text style={otpHText}>
                {" "}
                Enter 4 digit number that sent to {mobileno}
              </Text>
            </View>
          </View>
          <View elevation={5} style={otpViewStyle}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                marginTop: -18
              }}
            >
              <OtpInputs
                focusedBorderColor={"white"}
                handleChange={code => this.props.onOTPChange(code)}
                numberOfInputs={4}
                inputStyles={otpInputStyle}
                inputContainerStyles={{ backgroundColor: "white" }}
              />
            </View>
            {errors.otp ? (
              <Text style={styles.textError}>{errors.otp[0]}</Text>
            ) : null}
            <TouchableHighlight
              disabled={otp.length === 4 ? false : true}
              style={{ opacity: otp.length === 4 ? 1 : 0.8 }}
              onPress={() => {
                this.props.updateOnSubmeetOtp();
                this.props.isValid(this.props.register)
                  ? this.props.toggleModalOtp(true)
                  : null;
              }}
              underlayColor="white"
            >
              <View style={createButton}>
                <Text style={[buttonText, whiteText]}>Continue</Text>
              </View>
            </TouchableHighlight>
            {otpMinute !== -1? (
              <Text style={otpResendText}>
                {" "}
                Re-send code in 0{otpMinute}:{otpTimeOut} Second
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.props.setTimeOut();
                  this.props.updateOTPTimeOut();
                  this.props.requestOtp();
                }}
              >
                <View style={resendViewStyle}>
                  <Image style={imageRefreshStyle} source={ICON_REFRESH} />
                  <Text style={resendTextStyle}>Resend OTP</Text>
                </View>
              </TouchableOpacity>
            )}
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
    error: "OTP deos not match"
  }

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
    isHeavyVehicle,
    isTowingService,
    isTyreService,
    isVendor,
    otpTimeOut,
    otpMinute,
    otp,
    visibleModalOtp,
    onSubmeetOtpForm,
    mobileno
  } = register;
  return {
    isTwoWheeler,
    isFourWheeler,
    isHeavyVehicle,
    isTowingService,
    isTyreService,
    isVendor,
    otpTimeOut,
    otpMinute,
    otp,
    visibleModalOtp,
    onSubmeetOtpForm,
    mobileno,
    register
  };
};

export default connect(
  mapStateToProps,
  {
    updateVehicleBool,
    updateCarBool,
    updateHeavyVehicleBool,
    updateTowingServiceBool,
    updateTyreServiceBool,
    updateOTPTimeOut,
    setTimeOut,
    onOTPChange,
    toggleModalOtp,
    updateOnSubmeetOtp,
    requestOtp,
    signupUser
  }
)(withValidation(rules, RegisterOTP));
