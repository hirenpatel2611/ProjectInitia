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
import {
  updateMobileNumber,
  updatePassword,
  loginUser,
  updateOnSubmeetLoginForm
} from "../../actions";
import _ from "lodash";
import styles from "./LoginStyle";
import TimerMixin from "react-timer-mixin";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";

class Login extends Component {
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
      inputStyle,
      textError,
      midViewLogin,
      midTextStyle,
      imageViewStyle,
      imageCarEnginStyle,
      mainViewStyle,
      image1Style,
      image2Style,
      image3Style,
      viewInnerStyle,
      textInnerViewStyle,
      scrollStyle
    } = styles;
    const { validate } = this.props;
    errors = this.props.onSubmeetLoginForm ? validate(this.props.login) : {};
    errorse = this.props.loginFailed ? validate(this.props.login) : {};
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        ref={component => (this._scrollview = component)}
        contentContainerStyle={containerStyle}
      >
        <StatusBar backgroundColor="#7960FF" />
        <View style={mainViewStyle}>
          <View style={{ alignItems: "center" }}>
            <Image style={image1Style} source={MECHANIC} />
          </View>
          <View style={imageViewStyle}>
            <Image style={image2Style} source={HAND_HOLDING_UP} />
            <Image style={imageCarEnginStyle} source={CAR_ENGINE} />
            <Image style={image3Style} source={TIMING_BELT} />
          </View>
          <View style={viewInnerStyle}>
            <Text style={textInnerViewStyle}>Login</Text>
            <Text style={midTextStyle}>
              Enter your mobile number and password
            </Text>
          </View>
        </View>
        <View elevation={5} style={midViewLogin}>
          <TextInput
            style={inputStyle}
            underlineColorAndroid="transparent"
            placeholder="Mobile Number"
            placeholderTextColor="#9D9D9D"
            autoCapitalize="none"
            keyboardType={"phone-pad"}
            maxLength={10}
            value={this.props.mobileno}
            onChangeText={text => {
              this.props.updateMobileNumber(text);
            }}
          />
          {errors.mobileno ? (
            <Text style={styles.textError}>{errors.mobileno[0]}</Text>
          ) : null}
          <TextInput
            style={inputStyle}
            onFocus={e => {
              this._scrollview.scrollToEnd({animated:false})
            }}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#9D9D9D"
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.props.password}
            onChangeText={text => {
              this.props.updatePassword(text);
            }}
          />
          {errors.password ? (
            <Text style={styles.textError}>{errors.password[0]}</Text>
          ) : null}
          <TouchableHighlight
            onPress={() => {
              this.props.updateOnSubmeetLoginForm();
              this.props.isValid(this.props.login)
                ? this.props.loginUser()
                : null;
            }}
            underlayColor="white"
          >
            <View style={loginButton}>
              {this.props.loading ? (
                <Text style={[buttonText, themeColor]}>Loading...</Text>
              ) : (
                <Text style={[buttonText, themeColor]}>Login</Text>
              )}
            </View>
          </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const notEmpty = test => !isEmpty(test);
const rules = [
  {
    field: "mobileno",
    condition: notEmpty,
    error: "Username is Require"
  },
  {
    field: "password",
    condition: notEmpty,
    error: "Password is Require"
  }
  // {
  //   field: "loginStatus",
  //   condition: (loginStatus, state) => loginStatus === 1,
  //   error: "Authentication Fial!!!"
  // },
];

const mapStateToProps = ({ login }) => {
  const {
    mobileno,
    password,
    loading,
    loginFailed,
    onSubmeetLoginForm,
    loginStatus
  } = login;
  return {
    mobileno,
    password,
    loading,
    loginFailed,
    onSubmeetLoginForm,
    loginStatus,
    login
  };
};

export default connect(
  mapStateToProps,
  { updateMobileNumber, updatePassword, loginUser, updateOnSubmeetLoginForm }
)(withValidation(rules, Login));
