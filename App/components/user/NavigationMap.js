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
  Modal,
  Linking
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore } from "../../actions";
import styles from "./usermapsStyle";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { IntentLauncherAndroid,Location,Permissions,Constants } from "expo";
import {
  getUserLocationSuccess,
  getBookingCancellation,
  getBookingUpdateUser,
  getReasonCheckbox,
  getConfirmBookingCancel,
  getCancelBookingModal,
  getCancelBookingModalClose,
  getVendorRating,
} from "../../actions";
import  MapViewDirections  from "../../Common/MapViewDirection";
import CheckBox from "react-native-check-box";
import { MECHANIC_MAP_ICON,BIKE_FOR_MAP,CALL } from "../../images";
import { Rating, AirbnbRating } from "react-native-ratings";
import call from "react-native-phone-call";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let ASPECT_RATIO = ScreenWidth/ScreenHeight;
let longitude_Delta =0.0922 * ASPECT_RATIO;

class NearbyGaraje extends Component {
  componentDidMount() {

  }
  callToMechanic()
    {
        //     const args = {
        //   number: this.props.mechanicCurrentLocation?this.props.mechanicCurrentLocation.mobile_no:0,
        //   prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
        // }
        //
        // call(args).catch(console.error)
        var phone = this.props.mechanicCurrentLocation?this.props.mechanicCurrentLocation.mobile_no:0;
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
          phoneNumber = `telprompt:${phone}`;
          }
          else  {
          phoneNumber = `tel:${phone}`;
          }
          console.log(phoneNumber);
          Linking.canOpenURL(phoneNumber)
          .then(supported => {
          if (!supported) {
              alert('Phone number is not available');
            } else {
              return Linking.openURL(phoneNumber);
          }
          })
          .catch(err => console.log(err));
    }


  render() {
    const { containerStyle, continueButton, buttonText, createButton } = styles;
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
              width:ScreenWidth,
              height: 0.86 * ScreenHeight,
              flex:1
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
                }}
                  flat={true}
                  rotation={this.props.mechanicCurrentLocation.message[0]
                    .coords.heading-90}
              >
                <Image source={BIKE_FOR_MAP} style={{height:45,width:45,resizeMode:'contain'}}/>
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
                apikey={"AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw"}
                strokeWidth={5}
                strokeColor="#7960FF"
              />
            ) : null}
            <MapView.Marker.Animated
              coordinate={{
                latitude: this.props.location.coords.latitude,
                longitude: this.props.location.coords.longitude,

              }}

            >
              <View style={inStyle.markerView1}>
                <View style={inStyle.markerView2} />
              </View>
            </MapView.Marker.Animated>
          </MapView>

          <Modal
            visible={this.props.isVendorRatingModal}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={{
                height: 0.2 * ScreenHeight,
              }}
          >
          <View style={{marginTop: 0.40 * ScreenHeight,
                        height:0.20 * ScreenHeight,
                        margin:10,
                        backgroundColor:'white',
                        borderRadius:5
                        }}>
            <Text style={{fontFamily:'circular-book',alignSelf:'center',margin:0.01 * ScreenHeight}}>
            Rating for vendor service
            </Text>
                <AirbnbRating
                  type="star"
                  ratingBackgroundColor="transparent"
                  imageSize={25}
                  defaultRating={this.props.vendorRating}
                  showRating={false}
                  onFinishRating={rating => {
                    console.log(rating);
                    this.props.getVendorRating(rating);
                  }}
                />

            <TouchableHighlight
              onPress={() => {
                var sts = 'completed'
                this.props.getBookingUpdateUser(sts)
              }}
              underlayColor="white"
              style={{
                marginTop:0.02 * ScreenHeight,
                height:0.05 * ScreenHeight,
              width: 0.78 * ScreenWidth,
              backgroundColor: "#7960FF",
              justifyContent: "center",
              alignSelf:'center',
              alignItems: "center",
              borderRadius: 25}}
            >
                <Text style={buttonText}>{this.props.loadingRatingDone?'loading...':'Done'}</Text>
            </TouchableHighlight>
            </View>
            </Modal>
          <Modal
            visible={this.props.isBookCancelModal}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
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
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "circular-bold",
                    alignSelf: "flex-start"
                  }}
                >
                  Reason of Cancel
                </Text>
                <TouchableOpacity style={{
                  width:0.1 * ScreenWidth,
                  alignSelf: "flex-end",
                }}
                onPress={()=>{this.props.getCancelBookingModalClose()}}
                >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "circular-bold",
                    color:'#7960FF',
                  }}
                >
                  x
                </Text>
                </TouchableOpacity>
                </View>
                <CheckBox
                  isChecked={this.props.reasonCheckbox[0]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="Mechanic is responding on booking."
                  onClick={() => {
                    this.props.getReasonCheckbox(0);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckbox[1]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="Mechanic is not good deal."
                  onClick={() => {
                    this.props.getReasonCheckbox(1);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckbox[2]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="I Choose better option."
                  onClick={() => {
                    this.props.getReasonCheckbox(2);
                  }}
                />
                <TouchableOpacity
                  disabled={!this.props.confirmDisable}
                  style={{ alignSelf: "center",
                          opacity:this.props.confirmDisable?1:0.5,
                          backgroundColor: "#7960FF",
                          width: 0.4 * ScreenWidth,
                          borderRadius: 5,
                          alignItems: "center",
                          margin: 10,
                          padding: 5,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                  activeOpacity={1}
                  underlayColor="white"
                  onPress={() => {
                    this.props.getBookingCancellation();
                  }}
                >
                    {this.props.loadingBookig ? (
                      <Text style={inStyle.modalButtonCancleText}>
                        Loading...
                      </Text>
                    ) : (
                      <Text style={inStyle.modalButtonCancleText}>Confirm</Text>
                    )}
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
          <View style={{
            justifyContent:'space-between',
            flexDirection:'row'
          }}>
          {this.props.mechanicCurrentLocation?<TouchableOpacity
            style={{
              justifyContent: "space-between",
              flexDirection: "row"
            }}
            onPress={() => {
              this.callToMechanic();
            }}
          >
            <Text
              style={{
                fontFamily: "circular-book",
                fontSize: 16,
                color: "#4A4A4A",
                marginTop: 3
              }}
            >
            Contact :{this.props.mechanicCurrentLocation.mobile_no}
            </Text>
            <Image
              style={{ height: 20, width: 20, borderRadius: 10 }}
              source={CALL}
            />
          </TouchableOpacity>:null}
            {this.props.mechanicCurrentLocation?<Text style={{
              fontFamily: "circular-book",
              fontSize: 16,
              color: "#4A4A4A",
              marginTop: 3
            }}>Dist({this.props.mechanicCurrentLocation.distance} km)</Text>:null}
          </View>
          <TouchableOpacity
            activeOpacity={1}
            underlayColor="white"
            onPress={() => {
              this.props.getCancelBookingModal();
            }}
            style={inStyle.modalButtonCancle}
          >
                <Text style={inStyle.modalButtonCancleText}>Cancel</Text>
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
    confirmDisable,
    loadingBookig,
    vendorRating,
    isVendorRatingModal,
    loadingRatingDone
  } = usermaps;
  return {
    location,
    bookData,
    mechanicCurrentLocation,
    bookingStatusRes,
    distanceBetweenUserMechanic,
    reasonCheckbox,
    isBookCancelModal,
    confirmDisable,
    loadingBookig,
    vendorRating,
    isVendorRatingModal,
    loadingRatingDone
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
    getCancelBookingModal,
    getCancelBookingModalClose,
    getVendorRating,

  }
)(NearbyGaraje);
