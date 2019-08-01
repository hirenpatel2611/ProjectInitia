import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  Slider,
  StyleSheet,
  Platform,
  TextInput,
  AsyncStorage,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./vendorStyle";
import Header from "../../Common/Header";
import {
  getUserLocationSuccess,
  loadVendorProfile,
  updateVendorFullName,
  updateVendorAddress,
  updateVendorEmail,
  updateVendorProfile,
  upadteVendorProfileImage
} from "../../actions";
import { USER2, PENCIL } from "../../images";
import { Asset,Permissions,Constants } from "expo";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {
  componentWillMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  render() {
    const {
      containerStyle,
      subContainerProfile,
      textInputProfilStyle
    } = styles;
    return (
      <View>
        <Header headerText="Profile" />
        <KeyboardAwareScrollView enableOnAndroid>
          <View
            style={inStyle.containerStyle}
          >
            <Image
              style={inStyle.imageStyle}
              resizeMode={"cover"}
              source={
                this.props.imageVendorUri
                  ? { uri: this.props.imageVendorUri }
                  : USER2
              }
            />

            <TouchableOpacity
              style={inStyle.touchableOpacityStyle}
              onPress={() => {
                this.props.upadteVendorProfileImage();
              }}
            >
              <Image
                style={inStyle.imagePencleStyle}
                source={PENCIL}
              />
            </TouchableOpacity>
          </View>
          <View
            style={inStyle.viewSubContainer}
          >
            <TextInput
              style={textInputProfilStyle}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9D9D9D"
              placeholder="Name"
              value={this.props.fullNameVendor}
              onChangeText={text => {
                this.props.updateVendorFullName(text);
              }}
            />

            <TextInput
              style={textInputProfilStyle}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9D9D9D"
              placeholder="Address"
              value={this.props.addressVendor}
              multiline={true}
              onChangeText={text => {
                this.props.updateVendorAddress(text);
              }}
            />
            <TextInput
              style={textInputProfilStyle}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9D9D9D"
              placeholder="Email"
              value={this.props.emailVendor}
              onChangeText={text => {
                this.props.updateVendorEmail(text);
              }}
            />
            <TextInput
              style={textInputProfilStyle}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9D9D9D"
              placeholder="Mobile"
              value={
                this.props.userData ? this.props.userData.userMobileno : null
              }
            />
          </View>
          <TouchableHighlight
            onPress={() => {
              this.props.updateVendorProfile();
            }}
            underlayColor="white"
            style={inStyle.continueButton}
          >
            <Text
              style={inStyle.buttonTextStyle}
            >
              {this.props.loadingProfileUpdate ? "Loading..." : "Continue"}
            </Text>
          </TouchableHighlight>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const inStyle = {
  containerStyle:{
    borderColor: "#7960FF",
    borderRadius: 60,
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
 profileImageStyle:{
   borderRadius: 60,
   width: 120,
   height: 120,
   alignSelf: "center",
   zIndex: -1,
   position:'absolute'
 },
 touchableOpacityStyle:{
   borderRadius: 15,
   width: 23,
   height: 23,
   alignSelf: "flex-end",
   backgroundColor: "#F5FCFF",
   alignItems: "center",
   justifyContent: "center"
 },
 imagePencleStyle:{
   width: 15,
   height: 15,
   resizeMode: "contain",
 },
 viewSubContainer:{
   marginTop: 0.001 * ScreenHeight,
   height: 0.40 * ScreenHeight,
   justifyContent: "space-around"
 },
 continueButton:{
   marginTop: 0.20 * ScreenHeight,
   alignSelf: "center",
   backgroundColor: "#7960FF",
   height: 44,
   width: 0.78 * ScreenWidth,
   borderRadius: 25,
   alignItems: "center",
   marginBottom: 10,
   justifyContent: "center"
 },
 buttonTextStyle:{
   padding: 10,
   fontSize: 18,
   fontFamily: "circular-book",
   color: "white"
 }
};

const mapStateToProps = ({ user, vendors }) => {
  const {
    onSubmeetProfileVendorForm,
    fullNameVendor,
    addressVendor,
    emailVendor,
    imageVendorUri,
    loadingProfileUpdate
  } = vendors;
  const { userData } = user;
  return {
    userData,
    onSubmeetProfileVendorForm,
    fullNameVendor,
    addressVendor,
    emailVendor,
    imageVendorUri,
    loadingProfileUpdate
  };
};

export default connect(
  mapStateToProps,
  {
    getUserLocationSuccess,
    loadVendorProfile,
    updateVendorFullName,
    updateVendorAddress,
    updateVendorEmail,
    updateVendorProfile,
    upadteVendorProfileImage
  }
)(Profile);
