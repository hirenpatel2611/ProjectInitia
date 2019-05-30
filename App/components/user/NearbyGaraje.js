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
import {
  Constants,
  Location,
  Permissions,
  IntentLauncherAndroid,
  Asset,
  SplashScreen
} from "expo";
import {
  getVendors,
  getUserLocationFail,
  getUserLocationSuccess,
  getVenderDetails,
  getVendorBooking,
  BookVendor,
  getBookingCancellation,
  getDistance,
  connectTosocket,
  closeVendorDetailModal,
  getReasonCheckbox,
  getReasonCheckbox2,
  getReasonCheckbox3,
  getConfirmBookingCancel,
  getCancelBookingModal,
  getUserData
} from "../../actions";
import { MECHANIC, USER2, FILTER } from "../../images";
import { Rating, AirbnbRating } from "react-native-ratings";
import CheckBox from "react-native-check-box";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class NearbyGaraje extends Component {
  state = {
    location: null,
    errorMessage: null
  };

  async componentWillMount() {
    await this.props.getVendors();

    if (Platform.OS === "android" && !Constants.isDevice) {
    } else {
      await this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.props.getUserLocationFail();
    }

    await Location.hasServicesEnabledAsync()
      .then(async res => {
        if (!res) {
          perm = await IntentLauncherAndroid.startActivityAsync(
            IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
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
    this.props.getUserLocationSuccess(location);
    {
      this.props.getUserData();
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
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation
      },
      location => {
        this.props.getUserLocationSuccess(location);
      }
    );
  };

  render() {
    markers = [];
    if (this.props.vendors.length) {
      markers = this.props.vendors.map(vendor => {
        return (
          <MapView.Marker.Animated
            key={vendor.id}
            coordinate={{
              latitude: parseFloat(vendor.latitude),
              longitude: parseFloat(vendor.longitude)
            }}
            onPress={() => {
              this.props.getVenderDetails(vendor);
              //this.props.getDistance();
            }}
          >
            <Image style={inStyle.imageVendor} source={USER2} />
          </MapView.Marker.Animated>
        );
      });
    }
    const { containerStyle } = styles;
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={containerStyle}>
        <Header headerText="Near by Garaje" filterIcon={FILTER} />
        <StatusBar backgroundColor="#7960FF" />
        <View
          style={[
            {
              flex: 1
            },
            this.props.isBookModalVisible || this.props.isBookCancelModal
              ? { opacity: 0.6 }
              : null
          ]}
        >
          <MapView
            style={{
              ...StyleSheet.absoluteFillObject
            }}
            provider={PROVIDER_GOOGLE}
            ref={component => (this._map = component)}
          >
            {markers}
            {this.props.location ? (
              <MapView.Marker.Animated coordinate={this.props.location.coords}>
                <View style={inStyle.markerView1}>
                  <View style={inStyle.markerView2} />
                </View>
              </MapView.Marker.Animated>
            ) : null}
          </MapView>

          <Modal
            visible={this.props.isBookModalVisible ? true : false}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={inStyle.modalStyle}
          >
            <TouchableOpacity
              style={{ height: ScreenHeight,paddingTop:0.70 * ScreenHeight, }}
              activeOpacity={1}
              onPress={() => {
                this.props.isBookingSuccess
                  ? null
                  : this.props.closeVendorDetailModal();
              }}
            >
            {this.props.bookingStatusRes ? (
            <View style={{backgroundColor: "#FFFFFF",

                    width:0.3 *ScreenWidth,
                    alignSelf:'center',
                    alignItems:'center',
                    justifyContent:'center',
                    borderTopLeftRadius:40,
                    borderTopRightRadius:40,
                    marginBottom:-15,
                    height:0.04*ScreenHeight,
          }}>

              <Text
                style={{
                  fontFamily: "circular-bold",
                  backgroundColor: "#FFFFFF",
                  fontSize:14
                }}
              >
                {this.props.bookingStatusRes.type}
              </Text></View>
            ) : null}

              <View style={inStyle.modalBookTouch}>
                <View style={inStyle.modalView1}>
                  <Text style={inStyle.modalTextName}>
                    {this.props.vendorsData
                      ? this.props.vendorsData.first_name
                      : null}
                  </Text>
                  <View style={inStyle.modalInnerView1}>
                    <Text style={inStyle.modalTextBlue}>
                      {this.props.vendorDistance
                        ? this.props.vendorDistance
                        : "0 km"}
                    </Text>
                  </View>
                  <View style={inStyle.modalInnerView1}>
                    <Rating
                      imageSize={20}
                      startingValue={this.props.vendorsData.rating}
                    />
                  </View>
                </View>
                <Text style={inStyle.modalTextAddress}>
                  {this.props.vendorsData
                    ? this.props.vendorsData.address
                    : null}
                </Text>



                {this.props.isBookingSuccess ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    underlayColor="white"
                    onPress={() => {
                      this.props.getCancelBookingModal();
                    }}
                  >
                    <View style={inStyle.modalButtonCancle}>
                      <Text style={inStyle.modalButtonCancleText}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    underlayColor="white"
                    onPress={async () => {
                      await this.props.BookVendor();
                    }}
                  >
                    <View style={inStyle.modalButtonCancle}>
                      {this.props.loadingBookig ? (
                        <Text style={inStyle.modalButtonCancleText}>
                          Loading...
                        </Text>
                      ) : (
                        <Text style={inStyle.modalButtonCancleText}>Book</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal
            visible={this.props.isBookCancelModal}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={inStyle.modalStyle}
          >
            <View
              style={{
                height: ScreenHeight
              }}
            >
              <View
                style={{
                  marginTop: 0.4 * ScreenHeight,
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
                  rightText="Mechanic is not responding on booking."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckbox(0);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckbox[1]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="Mechanic is not done good deal."
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
                  style={{
                    alignSelf: "center",
                    opacity: this.props.confirmDisable ? 1 : 0.5,
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
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const inStyle = {
  markerView1: {
    borderWidth: 1,
    height: 22,
    width: 22,
    borderRadius: 15,
    borderColor: "#7960FF",
    alignItems: "center",
    justifyContent: "center"
  },
  markerView2: {
    backgroundColor: "#7960FF",
    height: 16,
    width: 16,
    borderRadius: 10
  },
  modalStyle: {
    height: 0.2 * ScreenHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  },
  modalBookTouch: {
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    height: 0.20 * ScreenHeight,
    margin: 15,
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between"
  },
  modalView1: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalTextName: {
    padding: 10,
    fontFamily: "circular-bold",
    fontSize: 14,
    color: "#4A4A4A"
  },
  modalButtonCancle: {
    backgroundColor: "#7960FF",
    height: 30,
    alignSelf: "stretch",
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
  modalTextAddress: {
    padding: 10,
    fontFamily: "circular-book",
    fontSize: 14,
    color: "#4A4A4A",
    marginLeft: 2
  },
  modalInnerView1: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  modalTextBlack: {
    fontFamily: "circular-book",
    fontSize: 16,
    color: "#4A4A4A"
  },
  modalTextBlue: {
    fontFamily: "circular-book",
    fontSize: 14,
    color: "#7960FF"
  },
  imageVendor: {
    borderRadius: 15,
    borderColor: "#7960FF",
    width: 32,
    height: 32,
    resizeMode: "contain"
  }
};

const mapStateToProps = ({ usermaps }) => {
  const {
    loading,
    vendors,
    errorMessage,
    location,
    isBookModalVisible,
    vendorsData,
    loadingBookig,
    isBookingSuccess,
    vendorDistance,
    bookingStatusRes,
    reasonCheckbox,
    isBookCancelModal,
    confirmDisable
  } = usermaps;
  return {
    loading,
    vendors,
    errorMessage,
    location,
    isBookModalVisible,
    vendorsData,
    loadingBookig,
    isBookingSuccess,
    vendorDistance,
    bookingStatusRes,
    reasonCheckbox,
    isBookCancelModal,
    confirmDisable
  };
};

export default connect(
  mapStateToProps,
  {
    getVendors,
    getUserLocationFail,
    getUserLocationSuccess,
    getVenderDetails,
    getVendorBooking,
    BookVendor,
    getBookingCancellation,
    getDistance,
    connectTosocket,
    closeVendorDetailModal,
    getReasonCheckbox,
    getConfirmBookingCancel,
    getCancelBookingModal,
    getUserData
  }
)(NearbyGaraje);
