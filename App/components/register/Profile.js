import React, { Component } from "react";
import {
  Modal,
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
  StyleSheet,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { BITMAP1, BITMAP2, CAR, MOTORCYCLE, ICON_REFRESH } from "../../images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Slider } from "react-native-elements";
import CheckBox from "react-native-check-box";

// import { Col, Row, Grid } from "react-native-easy-grid";
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT
} from "../../images";
import { Actions } from "react-native-router-flux";
import {
  toggleModalProfile,
  updateName,
  updateAddress,
  updateEmail,
  updateDateOfBirth,
  updatePasswordProfile,
  updateConfirmPassword,
  updateLanguage,
  signupUser,
  updateMobileNoProfile,
  updateOnSubmeetSignup,
  getLocationFail,
  getLocationSuccess,
  setLocationVisibility,
  setLocation
} from "../../actions";
import _ from "lodash";
import styles from "./RegisterStyle";
import TimerMixin from "react-timer-mixin";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Constants, Location, Permissions } from "expo";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessages:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.props.getLocationFail();
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest
    });
    this.props.getLocationSuccess(location);
    {
      console.log(location);
      this._map.animateToRegion(
        {
          latitude: this.props.location.coords.latitude,
          longitude: this.props.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        },
        1
      );
    }
  };

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
      textInputProfilStyle,
      subContainerProfile,
      profileHeadText,
      textError,
      headerTextStyle,
      headerViewProfile,
      profileNameText,
      profileModalView,
      profilImage1style,
      profileModal1View,
      profileModalText1,
      profileModalText2,
      profileButtonView
    } = styles;
    const { validate } = this.props;
    errors = this.props.onSubmeetSignupForm
      ? validate(this.props.register)
      : {};
    return (
      <View
        style={
          (containerStyle,
          [
            {
              opacity: this.props.visibleModalProfile ? 0.5 : 1,
              padding: 10,
              justifyContent: "center"
            }
          ])
        }
      >
        <KeyboardAwareScrollView enableOnAndroid>
          <StatusBar backgroundColor="#FFFFFFFF" />

          <View style={headerViewProfile}>
            <Text style={headerTextStyle}>Personal Details</Text>
            <View style={{ height: 0.78 * ScreenHeight, top: 20 }}>
              <View
                style={{
                  height: 0.51 * ScreenHeight,
                  justifyContent: "space-around"
                }}
              >
                <View style={subContainerProfile}>
                  <TextInput
                    style={textInputProfilStyle}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#9D9D9D"
                    placeholder="Name"
                    value={this.props.name}
                    onChangeText={text => {
                      this.props.updateName(text);
                    }}
                  />
                  {errors.name ? (
                    <Text style={styles.textError}>{errors.name[0]}</Text>
                  ) : null}
                </View>
                <View style={subContainerProfile}>
                  <TextInput
                    style={textInputProfilStyle}
                    underlineColorAndroid="transparent"
                    placeholder="Address"
                    placeholderTextColor="#9D9D9D"
                    autoCapitalize="none"
                    value={this.props.address}
                    onChangeText={text => {
                      this.props.updateAddress(text);
                    }}
                  />
                  {errors.address ? (
                    <Text style={styles.textError}>{errors.address[0]}</Text>
                  ) : null}
                </View>

                <View style={subContainerProfile}>
                  <TextInput
                    style={textInputProfilStyle}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="#9D9D9D"
                    autoCapitalize="none"
                    value={this.props.email}
                    onChangeText={text => {
                      this.props.updateEmail(text);
                    }}
                  />
                  {errors.email ? (
                    <Text style={styles.textError}>{errors.email[0]}</Text>
                  ) : null}
                </View>

                <View style={subContainerProfile}>
                  <TextInput
                    style={textInputProfilStyle}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="#9D9D9D"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={this.props.password}
                    onChangeText={text => {
                      this.props.updatePasswordProfile(text);
                    }}
                  />
                  {errors.password ? (
                    <Text style={styles.textError}>{errors.password[0]}</Text>
                  ) : null}
                </View>
                <View style={subContainerProfile}>
                  <TextInput
                    style={textInputProfilStyle}
                    underlineColorAndroid="transparent"
                    placeholder="Confirm Password"
                    placeholderTextColor="#9D9D9D"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={this.props.confirmPassword}
                    onChangeText={text => {
                      this.props.updateConfirmPassword(text);
                    }}
                  />
                  {errors.confirmPassword ? (
                    <Text style={styles.textError}>
                      {errors.confirmPassword[0]}
                    </Text>
                  ) : null}
                </View>
              </View>
              <Modal
                visible={this.props.setLocationVisible ? true : true}
                animationType="slide"
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
                transparent={true}
                opacity={0.5}
                style={{
                  height: 0.24 * ScreenHeight,
                  backgroundColor: "rgba(0,0,0,0.5)"
                }}
              >
                <View style={styles.containertwo}>
                  <View
                    style={{
                      borderRadius: 10,
                      width: 0.83 * ScreenWidth,
                      height: 0.5 * ScreenHeight
                    }}
                  >
                    <MapView
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: "#7960FF",
                        height: 0.48 * ScreenHeight
                      }}
                      provider={PROVIDER_GOOGLE}
                      ref={component => (this._map = component)}
                      onLayout={e => {
                        this.props.location
                          ? this._map.animateToRegion(
                              {
                                latitude: this.props.location.coords.latitude,
                                longitude: this.props.location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                              },
                              1
                            )
                          : null;
                      }}
                    >
                      {this.props.location ? (
                        <MapView.Marker.Animated
                          coordinate={this.props.location.coords}
                        />
                      ) : null}
                    </MapView>
                  </View>
                  {this.props.errorMessage ? alert("location not found") : null}
                  <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                      this.props.setLocation();
                      this.props.signupUser();
                    }}
                    disabled={this.props.location ? false : true}
                    style={{ opacity: this.props.location ? 1 : 0.8 }}
                  >
                    <View
                      style={{
                        backgroundColor: "#7960FF",
                        height: 44,
                        width: 280,
                        borderRadius: 25,
                        alignItems: "center"
                      }}
                    >
                      <Text style={[buttonText, whiteText]}>Set Location</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </Modal>
            </View>
            {this.props.signupFail ? (
              <View style={{ paddingLeft: 0.09 * ScreenWidth }}>
                <Text style={textError}> {this.props.signupFail} </Text>
              </View>
            ) : null}
            <View style={profileButtonView}>
              <TouchableHighlight
                onPress={() => {
                  this.props.updateOnSubmeetSignup();
                  this.props.isValid(this.props.register)
                    ? this.props.isVendor === true
                      ? this.props.setLocation()
                      : this.props.signupUser()
                    : null;
                }}
                underlayColor="white"
              >
                <View style={createButton}>
                  {this.props.loadingSignupB ? (
                    <Text style={[buttonText, whiteText]}>Loading...</Text>
                  ) : (
                    <Text style={[buttonText, whiteText]}>Continue</Text>
                  )}
                </View>
              </TouchableHighlight>
            </View>
            <View />
            <Modal
              visible={this.props.visibleModalProfile ? true : false}
              animationType="slide"
              onRequestClose={() => {
                console.log("Modal has been closed.");
              }}
              transparent={true}
              opacity={0.5}
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <View style={styles.containertwo}>
                <View style={profileModalView}>
                  <View style={{ alignItems: "center" }}>
                    <Image style={profilImage1style} source={BITMAP2} />
                  </View>
                  <View style={profileModal1View}>
                    <Text style={profileModalText1}>Congratulations</Text>
                    <Text style={profileModalText2}>
                      Now you are registered.
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        width: 350,
                        marginTop: 13,
                        fontFamily: "circular-book"
                      }}
                    >
                      {this.props.isVendor ? (
                        <Text>Wait for an approval from us.</Text>
                      ) : (
                        <Text>Get ready to find your mechanic.</Text>
                      )}
                    </Text>
                    <TouchableHighlight
                      onPress={() => {
                        this.props.toggleModalProfile(false);
                        Actions.login();
                      }}
                      underlayColor="white"
                      style={{ marginTop: 13 }}
                    >
                      <View style={createButton}>
                        <Text style={[buttonText, whiteText]}>Continue</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const notEmpty = test => !isEmpty(test);
const rules = [
  {
    field: "name",
    condition: notEmpty,
    error: "Name is Require"
  },
  {
    field: "address",
    condition: notEmpty,
    error: "Address is Require"
  },
  {
    field: "email",
    condition: notEmpty,
    error: "Email is Require"
  },
  {
    field: "password",
    condition: notEmpty,
    error: "Password is Require"
  },
  {
    field: "confirmPassword",
    condition: (confirmPassword, state) => confirmPassword === state.password,
    error: "Password is not match."
  }
  // {
  //   field: 'avatar',
  //   condition: avatar => avatar,
  //   error: 'Please select a profile photo',
  // },
];

const mapStateToProps = ({ register }) => {
  const {
    visibleModalProfile,
    name,
    address,
    email,
    dateOfBirth,
    password,
    language,
    loadingSignupB,
    confirmPassword,
    mobilenoProfile,
    onSubmeetSignupForm,
    isVendor,
    errorMessage,
    location,
    setLocationVisible,
    signupFail
  } = register;
  return {
    visibleModalProfile,
    name,
    address,
    email,
    dateOfBirth,
    password,
    language,
    loadingSignupB,
    confirmPassword,
    mobilenoProfile,
    onSubmeetSignupForm,
    isVendor,
    errorMessage,
    location,
    setLocationVisible,
    signupFail,
    register
  };
};

export default connect(
  mapStateToProps,
  {
    toggleModalProfile,
    updateName,
    updateAddress,
    updateEmail,
    updateDateOfBirth,
    updatePasswordProfile,
    updateConfirmPassword,
    updateLanguage,
    signupUser,
    updateMobileNoProfile,
    updateOnSubmeetSignup,
    getLocationFail,
    getLocationSuccess,
    setLocationVisibility,
    setLocation
  }
)(withValidation(rules, Profile));
