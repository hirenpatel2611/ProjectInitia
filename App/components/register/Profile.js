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
    this.props.setLocationVisibility();

    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
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
    let location = await Location.getCurrentPositionAsync({});
      this.props.getLocationSuccess(location);

    this._map.animateToRegion(
      {
        latitude: this.props.location.coords.latitude,
        longitude: this.props.location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      1
    );
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
          [{ opacity: this.props.visibleModalProfile ? 0.5 : 1 }])
        }
      >
        <KeyboardAwareScrollView enableOnAndroid>
          <StatusBar backgroundColor="#FFFFFFFF" />

          <View style={headerViewProfile}>
            <Text style={headerTextStyle}>Personal Details</Text>
            <View style={{ height: 0.82 * ScreenHeight }}>
            <View style={{ height: 0.51 * ScreenHeight }}>
              <View style={subContainerProfile}>
                <TextInput
                  style={textInputProfilStyle}
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
                  placeholder="Mobile"
                  keyboardType={"phone-pad"}
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  value={this.props.mobilenoProfile}
                  onChangeText={text => {
                    this.props.updateMobileNoProfile(text);
                  }}
                />
                {errors.mobilenoProfile ? (
                  <Text style={styles.textError}>
                    {errors.mobilenoProfile[0]}
                  </Text>
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
                  placeholder="Password"
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
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
                    visible={this.props.setLocationVisible? true : false}
                    animationType="slide"
                    onRequestClose={() => {
                      console.log("Modal has been closed.");
                    }}
                    transparent={true}
                    opacity={0.5}
                    style={{ height: 0.24 * ScreenHeight,
                      backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                  <View
                  style={styles.containertwo}
                  >
                  <View style={{
                    borderRadius:10,
                    width:0.83 * ScreenWidth,
                    height: 0.50 * ScreenHeight}}>
                    <MapView
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#7960FF",
                        height: 0.50 * ScreenHeight,
                      }}
                      ref={component => (this._map = component)}
                    >
                      {this.props.location?<MapView.Marker.Animated
                        coordinate={this.props.location.coords}
                      />:null}
                    </MapView>
                    </View>
                    <TouchableHighlight
                      underlayColor="white"
                      onPress={()=>{
                        this.props.setLocation();
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#7960FF',
                          height: 44,
                          width:280,
                          borderRadius: 25,
                          alignItems: 'center',
                        }}
                      >
                          <Text style={[buttonText, whiteText]}>Set Location</Text>
                      </View>
                    </TouchableHighlight>
                    </View>
                  </Modal>

            </View>
            {this.props.loadingSignupB?<Text>Hi</Text>:<Text>By</Text>}
            <View style={profileButtonView}>
              <TouchableHighlight
                onPress={() => {
                  this.props.updateOnSubmeetSignup();
                  this.props.isValid(this.props.register)
                    ? this.props.signupUser()
                    : null;
                  this.props.loadingSignupB
                    ? this.props.toggleModalProfile()
                    : null;
                }}
                underlayColor="white"
              >
                <View style={createButton}>
                  {this.props.loadingSignup ? (
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
                        marginTop: 13
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
                        Actions.filter();
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
    field: "mobilenoProfile",
    condition: notEmpty,
    error: "Mobile No is Require"
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
