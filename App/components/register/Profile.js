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
import {
  BITMAP1,
  BITMAP2,
  CAR,
  MOTORCYCLE,
  ICON_REFRESH,
  PENCIL,
  USER2
} from "../../images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Slider } from "react-native-elements";
import CheckBox from "react-native-check-box";
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT
} from "../../images";
import { Actions } from "react-native-router-flux";
import {
  toggleModalProfile,
  updateWorkshopName,
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
  getLocationSuccess,
  setLocation,
  upadteRegisterProfileImage,
  addDocument,
  deleteRegisterDocument,
  updateGstin,
  updateReferalCode
} from "../../actions";
import _ from "lodash";
import styles from "./RegisterStyle";
import TimerMixin from "react-timer-mixin";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as IntentLauncher from "expo-intent-launcher";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as Constants from "expo-constants";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.locationIsEnabled = false;
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this._getLocationAsync();
    } else {
      this._getLocationAsync();
    }
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.props.getUserLocationFail();
    }

    await Location.hasServicesEnabledAsync()
      .then(async res => {
        if (!res) {
          perm = await IntentLauncher.startActivityAsync(
            IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
          );
        }
        await Location.hasServicesEnabledAsync()
          .then(async res => {
            this.locationIsEnabled = res;
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    });
    this.props.getLocationSuccess(location);
  };

  renderDocument() {
    arr = this.props.documentRegisterUri.map(documentUri => {
      return (
        <View
          key={documentUri}
          style={{ width: 0.1 * ScreenHeight, margin: 0.009 * ScreenHeight }}
        >
          <Image
            style={{
              width: 0.1 * ScreenHeight,
              height: 0.1 * ScreenHeight,
              resizeMode: "contain",
              borderRadius: 5,
              position: "absolute"
            }}
            source={{ uri: documentUri }}
          />
          <TouchableOpacity
            style={{
              height: 17,
              width: 17,
              borderRadius: 10,
              backgroundColor: "#FFFFFFFF",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              margin: 0.04 * ScreenHeight
            }}
            onPress={() => {
              this.props.deleteRegisterDocument(documentUri);
            }}
          >
            <Text style={{ color: "#7960FF", fontFamily: "circular-bold" }}>
              X
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
    return arr;
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
      profileButtonView,
      textError2
    } = styles;
    const { validate, documentRegisterUri, isVendor } = this.props;
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
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={{
            paddingBottom: this.props.isVendor ? 180 : null
          }}
        >
          <StatusBar backgroundColor="#FFFFFFFF" />

          <View style={headerViewProfile}>
            <Text style={headerTextStyle}>Personal Details</Text>
            <View style={{ height: 0.78 * ScreenHeight, top: 20 }}>
              {this.props.isVendor ? (
                <View
                  style={{
                    borderRadius: 15,
                    borderColor: "#7960FF",
                    width: 0.15 * ScreenHeight,
                    height: 0.15 * ScreenHeight,
                    alignSelf: "center",
                    marginTop: 0.003 * ScreenHeight,
                    justifyContent: "center"
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 0.065 * ScreenHeight,
                      width: 0.14 * ScreenHeight,
                      height: 0.14 * ScreenHeight,
                      resizeMode: "contain",
                      alignSelf: "center",
                      position: "absolute",
                      zIndex: 0,
                      borderWidth: 0.5,
                      borderColor: "grey"
                    }}
                    source={
                      this.props.imageRegisterUri
                        ? { uri: this.props.imageRegisterUri }
                        : USER2
                    }
                  />

                  <TouchableOpacity
                    style={{
                      borderRadius: 15,
                      width: 22,
                      height: 22,
                      alignSelf: "flex-end",
                      backgroundColor: "#F5FCFF",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => {
                      this.props.upadteRegisterProfileImage();
                    }}
                  >
                    <Image
                      style={{
                        width: 15,
                        height: 15,
                        resizeMode: "contain"
                      }}
                      source={PENCIL}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              <View
                style={{
                  height: 0.55 * ScreenHeight,
                  justifyContent: "space-around"
                }}
              >
                {this.props.isVendor ? (
                  <View style={subContainerProfile}>
                    <TextInput
                      style={[
                        textInputProfilStyle,
                        { fontSize: 15, fontFamily: "circular-bold" }
                      ]}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#9D9D9D"
                      placeholder="Workshop Name"
                      value={this.props.workshop_name}
                      onChangeText={text => {
                        this.props.updateWorkshopName(text);
                      }}
                    />
                    {this.props.isVendor ? (
                      errors.workshop_name ? (
                        <Text style={styles.textError2}>
                          {errors.workshop_name[0]}
                        </Text>
                      ) : null
                    ) : null}
                  </View>
                ) : null}
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
                  <Text style={styles.textError2}>{errors.name[0]}</Text>
                ) : null}
                <TextInput
                  style={textInputProfilStyle}
                  underlineColorAndroid="transparent"
                  placeholder={
                    this.props.isVendor ? "Address" : "Address (Optinal)"
                  }
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  value={this.props.address}
                  onChangeText={text => {
                    this.props.updateAddress(text);
                  }}
                />
                {this.props.isVendor ? (
                  errors.address ? (
                    <Text style={styles.textError2}>{errors.address[0]}</Text>
                  ) : null
                ) : null}

                <TextInput
                  style={textInputProfilStyle}
                  underlineColorAndroid="transparent"
                  placeholder={
                    this.props.isVendor ? "Email" : "Email (Optinal)"
                  }
                  placeholderTextColor="#9D9D9D"
                  autoCapitalize="none"
                  value={this.props.email}
                  onChangeText={text => {
                    this.props.updateEmail(text);
                  }}
                />
                {this.props.isVendor ? (
                  errors.email ? (
                    <Text style={styles.textError2}>{errors.email[0]}</Text>
                  ) : null
                ) : null}
                {this.props.isVendor ? (
                  <TextInput
                    style={textInputProfilStyle}
                    underlineColorAndroid="transparent"
                    placeholder={"GSTIN(Optional)"}
                    placeholderTextColor="#9D9D9D"
                    autoCapitalize="none"
                    value={this.props.gstin}
                    onChangeText={text => {
                      this.props.updateGstin(text);
                    }}
                  />
                ) : null}
                {this.props.isVendor ? (
                  errors.name ? (
                    <Text style={styles.textError2}></Text>
                  ) : null
                ) : null}

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
                {this.props.password.length < 6 &&
                this.props.password !== "" ? (
                  <Text style={styles.textError2}>Minimum 6 Character</Text>
                ) : null}
                {errors.password ? (
                  <Text style={styles.textError2}>{errors.password[0]}</Text>
                ) : null}

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
                  <Text style={styles.textError2}>
                    {errors.confirmPassword[0]}
                  </Text>
                ) : null}
                {this.props.isVendor ? (
                  <TextInput
                    style={textInputProfilStyle}
                    underlineColorAndroid="transparent"
                    placeholder="Referral Code"
                    placeholderTextColor="#9D9D9D"
                    autoCapitalize="none"
                    maxLength={8}
                    value={this.props.referalCode}
                    onChangeText={text => {
                      this.props.updateReferalCode(text);
                    }}
                  />
                ) : null}
              </View>

              {this.props.isVendor ? (
                <View>
                  <Text
                    style={{
                      fontFamily: "circular-book",
                      fontSize: 0.033 * ScreenWidth,
                      marginTop: 0.023 * ScreenHeight,
                      marginLeft: 16,
                      marginBottom: 5
                    }}
                  >
                    Kindly add One of the following document-GST/AADHAR/LICENCE
                  </Text>
                  {errors.documentRegisterUri ? (
                    <Text style={styles.textError2}>
                      {errors.documentRegisterUri[0]}
                    </Text>
                  ) : null}

                  <View
                    style={{
                      height: 0.22 * ScreenHeight,
                      justifyContent: "space-between",
                      marginLeft: 16,
                      marginRight: 16
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      {this.renderDocument()}
                    </View>
                    <TouchableOpacity
                      underlayColor="white"
                      style={{
                        backgroundColor: "transparent",
                        height: 25,
                        width: 0.37 * ScreenWidth,
                        borderRadius: 25,
                        borderColor: "#7960FF",
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        opacity:
                          this.props.documentRegisterUri.length === 3 ? 0.5 : 1
                      }}
                      disabled={
                        this.props.documentRegisterUri.length === 3
                          ? true
                          : false
                      }
                      onPress={() => {
                        this.props.addDocument();
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "circular-book",
                          fontSize: 0.033 * ScreenWidth,
                          color: "#7960FF"
                        }}
                      >
                        +Add Documents
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              <Text style={styles.textError2}>
                {this.props.signupFail ? this.props.signupFail : null}
              </Text>
              <TouchableHighlight
                onPress={() => {
                  this.props.updateOnSubmeetSignup();
                  if (this.props.isValid(this.props.register)) {
                    if (this.props.isVendor) {
                      this.props.setLocation();
                    } else {
                      this.props.signupUser();
                    }
                  }
                }}
                underlayColor="white"
                style={[
                  createButton,
                  { marginTop: this.props.isVendor ? -5 : 0.05 * ScreenHeight }
                ]}
              >
                <Text style={[buttonText, whiteText]}>
                  {this.props.loadingSignupB ? "Loading..." : "Continue"}
                </Text>
              </TouchableHighlight>
              <Modal
                visible={this.props.setLocationVisible}
                animationType="slide"
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
                transparent={true}
                opacity={0.5}
                style={{
                  height: ScreenHeight,
                  backgroundColor: "rgba(0,0,0,0.5)"
                }}
              >
                <View
                  style={[
                    styles.containertwo,
                    { justifyContent: "space-around" }
                  ]}
                >
                  <View
                    style={{
                      borderRadius: 10,
                      width: 0.83 * ScreenWidth,
                      height: 0.45 * ScreenHeight
                    }}
                  >
                    {this.props.locationVendor ? (
                      <MapView
                        style={{
                          ...StyleSheet.absoluteFillObject,
                          borderRadius: 15,
                          borderWidth: 1,
                          borderColor: "#7960FF"
                        }}
                        provider={PROVIDER_GOOGLE}
                        ref={component => (this._map = component)}
                        onLayout={e => {
                          this._map.animateToRegion(
                            {
                              latitude: this.props.locationVendor.coords
                                .latitude,
                              longitude: this.props.locationVendor.coords
                                .longitude,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421
                            },
                            1
                          );
                        }}
                      >
                        <MapView.Marker.Animated
                          coordinate={this.props.locationVendor.coords}
                        />
                      </MapView>
                    ) : null}
                  </View>
                  <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                      this.props.signupUser();
                    }}
                    disabled={this.props.locationVendor ? false : true}
                    style={{
                      opacity: this.props.locationVendor ? 1 : 0.8,
                      backgroundColor: "#7960FF",
                      height: 44,
                      width: 280,
                      borderRadius: 25,
                      alignItems: "center"
                    }}
                  >
                    <Text style={[buttonText, whiteText]}>
                      {this.props.loadingSignupB
                        ? "Loading..."
                        : "Set Location"}
                    </Text>
                  </TouchableHighlight>
                </View>
              </Modal>
            </View>
            <View />
            <Modal
              visible={this.props.visibleModalProfile}
              animationType="slide"
              onRequestClose={() => {
                console.log("Modal has been closed.");
              }}
              transparent={true}
              opacity={0.5}
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <View style={styles.containertwo}>
                <View style={{ alignItems: "center" }}>
                  <Image style={profilImage1style} source={BITMAP2} />
                </View>

                <Text style={profileModalText1}>Congratulations</Text>
                <Text style={profileModalText2}>Now you are registered.</Text>
                <Text
                  style={{
                    fontSize: 0.038 * ScreenWidth,
                    textAlign: "center",
                    width: 350,
                    marginTop: 13,
                    fontFamily: "circular-book"
                  }}
                >
                  {this.props.isVendor
                    ? "Wait for an approval from us."
                    : "Get ready to find your mechanic."}
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
    field: "workshop_name",
    condition: (confirmPassword, { isVendor }) => {
      if (isVendor) {
        return notEmpty;
      }
      return true;
    },
    error: "Workshop Name is Require"
  },
  {
    field: "name",
    condition: notEmpty,
    error: "Name is Require"
  },
  {
    field: "address",
    condition: (confirmPassword, { isVendor }) => {
      if (isVendor) {
        return notEmpty;
      }
      return true;
    },
    error: "Address is Require"
  },
  {
    field: "email",
    condition: (confirmPassword, { isVendor }) => {
      if (isVendor) {
        return notEmpty;
      }
      return true;
    },
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
  },
  {
    field: "documentRegisterUri",
    condition: (documentRegisterUri, { isVendor }) => {
      if (isVendor) {
        return documentRegisterUri.length >= 1 ? true : false;
      }

      return true;
    },
    error: "Please Add Document"
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
    locationVendor,
    setLocationVisible,
    imageRegisterUri,
    signupFail,
    documentRegisterUri,
    workshop_name,
    referalCode
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
    locationVendor,
    setLocationVisible,
    register,
    imageRegisterUri,
    signupFail,
    documentRegisterUri,
    workshop_name,
    referalCode
  };
};

export default connect(
  mapStateToProps,
  {
    toggleModalProfile,
    updateWorkshopName,
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
    getLocationSuccess,
    setLocation,
    upadteRegisterProfileImage,
    addDocument,
    deleteRegisterDocument,
    updateGstin,
    updateReferalCode
  }
)(withValidation(rules, Profile));
