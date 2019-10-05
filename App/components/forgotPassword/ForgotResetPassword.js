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
  updateForgotEnetrPassword,
  updateForgotReEnetrPassword,
  onSubmeetResetPassword,

} from "../../actions";
import _ from "lodash";
import styles from "./ForgotStyle";
import TimerMixin from "react-timer-mixin";
import OtpInputs from "react-native-otp-inputs";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class ForgotResetPassword extends Component {


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
      imageRefreshStyle,
      inputStyle,
      resetMainContainer
    } = styles;
    const { validate } = this.props;


    return (
      <View style={(containerStyle)}>
        <KeyboardAwareScrollView enableOnAndroid>
          <StatusBar backgroundColor="#7960FF" />
          <View style={resetMainContainer}>
          <TextInput
            style={(inputStyle)}
            underlineColorAndroid="transparent"
            placeholder="New Password"
            placeholderTextColor="#9D9D9D"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={val => {this.props.updateForgotEnetrPassword(val)}}
            value={this.props.forgotEnterPassword}
          />
          <TextInput
            style={inputStyle}
            underlineColorAndroid="transparent"
            placeholder="Re-Enter Password"
            placeholderTextColor="#9D9D9D"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={val => {this.props.updateForgotReEnetrPassword(val)}}
            value={this.props.forgotReEnterPassword}
          />
          <TouchableHighlight
            onPress={()=>{ this.props.onSubmeetResetPassword() }}
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

const mapStateToProps = ({ forgot }) => {
  const {
    recievedForgotOTP,
    forgotOTP,
    forgotEnetrPassword,
    forgotReEnetrPassword
  } = forgot;
  return {
recievedForgotOTP,
forgotOTP,
forgotEnetrPassword,
forgotReEnetrPassword
  };
};

export default connect(
  mapStateToProps,
  {
updateForgotEnetrPassword,
updateForgotReEnetrPassword,
onSubmeetResetPassword
  }
)(ForgotResetPassword);
