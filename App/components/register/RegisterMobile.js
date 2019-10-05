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
import { updateMobileNo, requestOtp,readFromClipboard } from "../../actions";
import _ from "lodash";
import styles from "./RegisterStyle";
import TimerMixin from "react-timer-mixin";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


class RegisterMobile extends Component {
  componentWillMount(){
    this.props.readFromClipboard();
    this._getLocationAsync();
  }



  _getLocationAsync = async () => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
     if (status !== 'granted') {
       this.setState({
         errorMessage: 'Permission to access location was denied',
       });
     }

     let location = await Location.getCurrentPositionAsync({});
     console.log(location);
   };

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
    const {
      mobileno,
      loading,
      requestOtpFail,
      onSubmeetMobileForm,
      requestOtpMessage
    } = this.props.register;

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
              <Text style={titleTextStyle}>Registration</Text>
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
              onChangeText={val => this.props.updateMobileNo(val)}
              value={this.props.mobileno}
            />
            {errors.requestOtpFail ? (
              <Text style={styles.textError1}>
                {errors.requestOtpFail[0]}
                {this.props.requestOtpMessage}
              </Text>
            ) : null}
            <TouchableHighlight
              disabled={this.props.mobileno.length === 10 ? false : true}
              style={{ opacity: this.props.mobileno.length === 10 ? 1 : 0.8 }}
              onPress={() => {
                this.props.requestOtp();
                this.props.requestOtpSuccess ? Actions.registerOTP() : null;
              }}
              underlayColor="white"
            >
              <View style={createButton}>
                {this.props.loading ? (
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

const mapStateToProps = ({ register }) => {
  const {
    mobileno,
    loading,
    requestOtpFail,
    requestOtpMessage,
    requestOtpSuccess,
    onSubmeetMobileForm
  } = register;
  return {
    mobileno,
    loading,
    requestOtpFail,
    requestOtpMessage,
    requestOtpSuccess,
    onSubmeetMobileForm,
    register
  };
};

export default connect(
  mapStateToProps,
  { updateMobileNo, requestOtp,readFromClipboard }
)(withValidation(rules, RegisterMobile));
