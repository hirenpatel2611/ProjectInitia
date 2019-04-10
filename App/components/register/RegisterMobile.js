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
import { updateMobileNo,requestOtp } from "../../actions";
import _ from "lodash";
import styles from "./RegisterStyle";
import TimerMixin from "react-timer-mixin";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";

class RegisterMobile extends Component {
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
      textError
    } = styles;

    const { validate } = this.props;
    const {
      mobileno,
      loading,
      requestOtpFail,
      requestOtpMessage} =this.props.register


    errors=this.props.onSubmeetMobileForm?validate(this.props.register):{};

    return (
      <View style={containerStyle}>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />
          <View
            style={maunViewStyle}
          >
            <View style={{ alignItems: "center" }}>
              <Image style={imageMobileStyle} source={BITMAP} />
            </View>
            <View style={titleViewStyle}>
              <Text
                style={titleTextStyle}
              >
                Registration
              </Text>
              <Text
                style={midTextHeadStyle}
              >
                Enter your mobile number, we will send you OTP to verify later
              </Text>
            </View>
          </View>
          <View
            elevation={5}
            style={midViewRegiMobile}
          >
            <TextInput
              style={inputStyle}
              underlineColorAndroid="transparent"
              placeholder="Mobile Number"
              placeholderTextColor="#9D9D9D"
              autoCapitalize="none"
              keyboardType={"phone-pad"}
              onChangeText={(val)=>this.props.updateMobileNo(val)}
              value = {this.props.mobileno}
            />
            {this.props.requestOtpFail?<Text style={textError}>{this.props.requestOtpMessage}</Text>:null}
            <TouchableHighlight
              disabled={this.props.mobileno.length===10?false:true}
              style={{opacity:this.props.mobileno.length===10?1:0.8}}
              onPress={() => {
                this.props.requestOtp();
                this.props.requestOtpSuccess?Actions.registerOTP():null;
                }}
              underlayColor="white"
            >
              <View style={createButton}>
                {this.props.loading?<Text style={[buttonText, whiteText]}>Loading...</Text>:<Text style={[buttonText, whiteText]}>Continue</Text>}
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
    field: "mobileno",
    condition: (requestOtpFail, state) => requestOtpFail === true,
    error:"OTP Reqest Fail!!!",
  },

  // {
  //   field: 'avatar',
  //   condition: avatar => avatar,
  //   error: 'Please select a profile photo',
  // },
];

const mapStateToProps = ({ register }) => {
  const { mobileno,loading,requestOtpFail,requestOtpMessage,requestOtpSuccess } = register;
  return { mobileno,loading,requestOtpFail,requestOtpMessage,requestOtpSuccess,register };
};

export default connect(
  mapStateToProps,
  { updateMobileNo,requestOtp }
)(withValidation(rules,RegisterMobile));
