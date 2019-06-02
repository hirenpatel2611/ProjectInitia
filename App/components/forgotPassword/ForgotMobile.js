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
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Col, Row, Grid } from "react-native-easy-grid";
import { BITMAP } from "../../images";
import { Actions } from "react-native-router-flux";
import { updateForgotMobileNumber,
         onForgotOtpRequest
 } from "../../actions";
import _ from "lodash";
import styles from "./ForgotStyle";
import TimerMixin from "react-timer-mixin";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";

class ForgotPassword extends Component {
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
      inputStyle,
      midViewRegiMobile,
      midTextHeadStyle,
      maunViewStyle,
      imageMobileStyle,
      titleTextStyle,
      titleViewStyle,
      textError,
      textError1
    } = styles;

    const { validate } = this.props;

    errors = this.props.onSubmeetMobileForm
      ? validate(this.props.register)
      : {};

    return (
      <View style={containerStyle}>
        <KeyboardAwareScrollView enableOnAndroid>
          <StatusBar backgroundColor="#7960FF" />
          <View style={maunViewStyle}>
            <View style={{ alignItems: "center" }}>
              <Image style={imageMobileStyle} source={BITMAP} />
            </View>
            <View style={titleViewStyle}>
              <Text style={titleTextStyle}>Change Password</Text>
              <Text style={midTextHeadStyle}>
                Enter your mobile number, we will send you OTP to verify your
                number.
              </Text>
            </View>
          </View>
          <View elevation={5} style={midViewRegiMobile}>
            <TextInput
              style={inputStyle}
              underlineColorAndroid="transparent"
              placeholder="Mobile Number"
              placeholderTextColor="#9D9D9D"
              autoCapitalize="none"
              keyboardType={"phone-pad"}
              maxLength={10}
              onChangeText={val => {this.props.updateForgotMobileNumber(val)}}
              value={this.props.forgotMobileNo}
            />
            {errors.requestOtpFail ? (
              <Text style={styles.textError1}>
                {errors.requestOtpFail[0]}
                {this.props.requestOtpMessage}
              </Text>
            ) : null}
            <TouchableHighlight onPress={()=>{this.props.onForgotOtpRequest()}}
              disabled={this.props.forgotMobileNo.length === 10 ? false : true}
              style={{ opacity: this.props.forgotMobileNo.length === 10 ? 1 : 0.8 }}

              underlayColor="white"
            >
              <View style={createButton}>
                {this.props.loadingForgotMobile ? (
                  <Text style={[buttonText, whiteText]}>Loading...</Text>
                ) : (
                  <Text style={[buttonText, whiteText]}>Continue</Text>
                )}
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
    field: "requestOtpFail",
    condition: (requestOtpFail, state) => requestOtpFail === false,
    error: ""
  }

  // {
  //   field: 'avatar',
  //   condition: avatar => avatar,
  //   error: 'Please select a profile photo',
  // },
];

const mapStateToProps = ({ forgot }) => {
  const {
    forgotMobileNo,
    loadingForgotMobile
  } = forgot;
  return {
  forgotMobileNo,
  loadingForgotMobile
  };
};

export default connect(
  mapStateToProps,
  { updateForgotMobileNumber,
    onForgotOtpRequest,
   }
)(withValidation(rules, ForgotPassword));
