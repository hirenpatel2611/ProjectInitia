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
updateForgotOTPTimeOut,
onForgotOTPChange,
updateSubmeetForgotOtpForm
} from "../../actions";
import _ from "lodash";
import styles from "./ForgotStyle";
import TimerMixin from "react-timer-mixin";
import OtpInputs from "react-native-otp-inputs";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class ForgotOTP extends Component {
  componentDidMount() {
    //this.props.updateForgotOTPTimeOut();
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
      forgotOTP,
      recievedForgotOTP
    } = this.props.forgot;
    errors = this.props.onSubmeetForgotOtpForm ? validate(this.props.forgot) : {};
  // console.log(errors);
    return (
      <View style={(containerStyle)}>
        <KeyboardAwareScrollView enableOnAndroid>
          <StatusBar backgroundColor="#7960FF" />
          <View style={otpMainView}>
            <View style={image1OtpView}>
              <Image style={image1Otp} source={BITMAP1} />
            </View>
            <View style={headerOtpView}>
              <Text style={headerOtpText}>Verification</Text>
              <Text style={otpHText}>

                Enter 6 digit number that sent to {this.props.forgotMobileNo}
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
                handleChange={code => this.props.onForgotOTPChange(code)}
                numberOfInputs={6}
                inputStyles={{
                backgroundColor: "white",
                borderBottomWidth: 1,
                color: "black",
                borderColor: "#7960FF",
                width: 0.06 * ScreenWidth,
                fontSize: 0.03 * ScreenHeight,
              }}
              inputContainerStyles={{
                backgroundColor: "white",
                height: 0.052 * ScreenHeight,
                marginLeft:-25
              }}
                inputContainerStyles={{ backgroundColor: "white",}}
              />
            </View>
            {errors.forgotOTP ? (
              <Text style={styles.textError}>{errors.forgotOTP}</Text>
            ) : null}
            <TouchableHighlight
              disabled={forgotOTP.length === 6 ? false : true}
              style={{ opacity: forgotOTP.length === 6 ? 1 : 0.8 }}
              onPress={() => {
                this.props.updateSubmeetForgotOtpForm();
                this.props.isValid(this.props.forgot)
                  ? Actions.ForgotResetPassword()
                  : null;
              }}
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
const notEmpty = test => !isEmpty(test);
const rules = [
  {
    field: "forgotOTP",
    condition: (forgotOTP, state) => forgotOTP !== state.recievedForgotOTP,
    error: "OTP not verify"
  }

  // {
  //   field: 'avatar',
  //   condition: avatar => avatar,
  //   error: 'Please select a profile photo',
  // },
];

//const GameDetails = connect(mapStateToProps, mapDispatchToProps)(withValidation(rules, CreateGameDetails));
const mapStateToProps = ({ forgot }) => {
  const {
    forgotOTP,
    onSubmeetForgotOtpForm,
    recievedForgotOTP
  } = forgot;
  return {
forgotOTP,
onSubmeetForgotOtpForm,
forgot,
recievedForgotOTP
  };
};

export default connect(
  mapStateToProps,
  {
    updateForgotOTPTimeOut,
    onForgotOTPChange,
    updateSubmeetForgotOtpForm
  }
)(withValidation(rules, ForgotOTP));
