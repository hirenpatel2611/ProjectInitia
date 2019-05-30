import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
  Button,
  TouchableHighlight,
  Slider,
  StyleSheet,
  Platform,
  Animated,
  AsyncStorage,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore } from "../../actions";
import styles from "./usermapsStyle";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Constants, Location, Permissions, IntentLauncherAndroid } from "expo";
import {
  getUserLocationSuccess,
  getBookingCancellation,
  getBookingUpdateUser,
  getReasonCheckbox,
  getConfirmBookingCancel,
  getCancelBookingModal
} from "../../actions";
import { MapViewDirections } from "../../Common";
import CheckBox from "react-native-check-box";
import { MOTORCYCLE } from "../../images";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class NearbyGaraje extends Component {
  componentDidMount() {
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

  render() {
    const { containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <StatusBar backgroundColor="#7960FF" />
        <View
          style={{
            flex: 1
          }}
        >
          <MapView
            style={{
              ...StyleSheet.absoluteFillObject,
              height: 0.86 * ScreenHeight
            }}
            provider={PROVIDER_GOOGLE}
            ref={component => (this._map = component)}
          >
            {this.props.mechanicCurrentLocation ? (
              <MapView.Marker.Animated
                coordinate={{
                  latitude: this.props.mechanicCurrentLocation.message[0].coords
                    .latitude,
                  longitude: this.props.mechanicCurrentLocation.message[0]
                    .coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
              >
                  <Image style={inStyle.imageStyle} source={MOTORCYCLE} />

              </MapView.Marker.Animated>
            ) : null}
            {this.props.mechanicCurrentLocation ? (
              <MapViewDirections
                origin={{
                  latitude: this.props.mechanicCurrentLocation.message[0].coords
                    .latitude,
                  longitude: this.props.mechanicCurrentLocation.message[0]
                    .coords.longitude
                }}
                destination={{
                  latitude: this.props.location.coords.latitude,
                  longitude: this.props.location.coords.longitude
                }}
                apikey={"AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8"}
                strokeWidth={5}
                strokeColor="#7960FF"
              />
            ) : null}
            <MapView.Marker.Animated
              coordinate={{
                latitude: this.props.location.coords.latitude,
                longitude: this.props.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <View style={inStyle.markerView1}>
                <View style={inStyle.markerView2} />
              </View>
            </MapView.Marker.Animated>
          </MapView>

          <Modal
            visible={this.props.isBookCancelModal}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={{
                height: 0.2 * ScreenHeight,
              }}
          >

              <View
                style={{
                  marginTop:0.40 * ScreenHeight,
                  alignSelf: "stretch",
                  backgroundColor: "#FFFFFF",
                  height: 0.25 * ScreenHeight,
                  margin: 15,
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "space-around"
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "circular-bold",
                    alignSelf: "center"
                  }}
                >
                  Reason of Cancel
                </Text>
                <CheckBox
                  isChecked={this.props.reasonCheckbox[0]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="Mechanic is responding on booking."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckbox(0);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckbox[1]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="Mechanic is not good deal."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckbox(1);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckbox[2]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="I Choose better option."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckbox(2);
                  }}
                />
                <TouchableOpacity
                  disabled={!this.props.confirmDisable}
                  style={{ alignSelf: "center",opacity:this.props.confirmDisable?1:0.5 }}
                  activeOpacity={1}
                  underlayColor="white"
                  onPress={() => {
                    this.props.getBookingCancellation();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#7960FF",
                      width: 0.4 * ScreenWidth,
                      borderRadius: 5,
                      alignItems: "center",
                      margin: 10,
                      padding: 5,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {this.props.loadingBookig ? (
                      <Text style={inStyle.modalButtonCancleText}>
                        Loading...
                      </Text>
                    ) : (
                      <Text style={inStyle.modalButtonCancleText}>Confirm</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
          </Modal>
        </View>
        <View
          style={{
            height: 0.15 * ScreenHeight,
            backgroundColor: "white",
            padding: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            elevation: 2
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: "circular-book" }}>
            Mechanic is{" "}
            {this.props.bookingStatusRes
              ? this.props.bookingStatusRes.type
              : null}
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            underlayColor="white"
            onPress={() => {
              this.props.getCancelBookingModal();
            }}
          >
            <View style={inStyle.modalButtonCancle}>
              {this.props.loadingBookig ? (
                <Text style={inStyle.modalButtonCancleText}>Loading...</Text>
              ) : (
                <Text style={inStyle.modalButtonCancleText}>Cancel</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const inStyle = {
  markerView1: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 15,
    borderColor: "#7960FF",
    alignItems: "center",
    justifyContent: "center"
  },
  markerView2: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor:'#7960FF',
  },
  imageVendor: {
    borderRadius: 15,
    borderColor: "#7960FF",
    width: 32,
    height: 32,
    resizeMode: "contain"
  },
  modalButtonCancle: {
    backgroundColor: "#7960FF",
    height: 25,
    width: 0.9 * ScreenWidth,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  modalButtonCancleText: {
    fontSize: 14,
    fontFamily: "circular-bold",
    color: "white"
  },
  imageStyle:{
    width: 53,
    height: 53,
    resizeMode: "contain"
  },
  imageBorder:{
      borderWidth: 1,
      height: 30,
      width: 30,
      borderRadius: 15,
      borderColor: "#7960FF",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      shadowOpacity: 1.0

  }
};

const mapStateToProps = ({ usermaps }) => {
  const {
    location,
    bookData,
    mechanicCurrentLocation,
    bookingStatusRes,
    distanceBetweenUserMechanic,
    reasonCheckbox,
    isBookCancelModal,
    confirmDisable
  } = usermaps;
  return {
    location,
    bookData,
    mechanicCurrentLocation,
    bookingStatusRes,
    distanceBetweenUserMechanic,
    reasonCheckbox,
    isBookCancelModal,
    confirmDisable
  };
};

export default connect(
  mapStateToProps,
  {
    getUserLocationSuccess,
    getBookingCancellation,
    getBookingUpdateUser,
    getReasonCheckbox,
    getConfirmBookingCancel,
    getCancelBookingModal
  }
)(NearbyGaraje);
