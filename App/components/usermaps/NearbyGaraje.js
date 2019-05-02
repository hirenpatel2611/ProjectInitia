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
  getVendors,
  getUserLocationFail,
  getUserLocationSuccess,
  getVenderDetails,
  getVendorBooking,
  BookVendor,
  getDistanceOneToOne
} from "../../actions";
import { MECHANIC, USER2, FILTER } from "../../images";
import { Rating, AirbnbRating } from "react-native-ratings";

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
        console.error(location);
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
            }}
          >
            <Image
              style={{
                borderRadius: 15,
                borderColor: "#7960FF",
                width: 32,
                height: 32,
                resizeMode: "contain"
              }}
              source={USER2}
            />
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
        <Header headerText="Near by Garaje"
                filterIcon={FILTER}
        />
        <StatusBar backgroundColor="#7960FF" />
        <View
          style={{
            flex: 1
          }}
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
                <View
                  style={{
                    borderWidth: 1,
                    height: 22,
                    width: 22,
                    borderRadius: 15,
                    borderColor: "#7960FF",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#7960FF",
                      height: 16,
                      width: 16,
                      borderRadius: 10
                    }}
                  />
                </View>
              </MapView.Marker.Animated>
            ) : null}
          </MapView>

          <Modal
            visible={this.props.isBookModalVisible?true:false}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={{
              height: 0.2 * ScreenHeight,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.props.getVendorBooking();
              }}
            >
              <View
                style={{
                  marginTop: 0.65 * ScreenHeight,
                  alignSelf: "stretch",
                  backgroundColor: "#FFFFFF",
                  height: 0.23 * ScreenHeight,
                  margin: 15,
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      fontFamily: "circular-bold",
                      fontSize: 20,
                      color: "#4A4A4A"
                    }}
                  >
                    {this.props.vendorsData ? (
                      <Text>{this.props.vendorsData.first_name}</Text>
                    ) : (
                      <Text>None</Text>
                    )}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    underlayColor="white"
                    onPress={() => {
                      this.props.BookVendor();
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#7960FF",
                        height: 25,
                        width: 70,
                        borderRadius: 5,
                        alignItems: "center",
                        margin: 10
                      }}
                    >
                      {this.props.loadingBookig ? (
                        <Text
                          style={{
                            paddingTop:2,
                            fontSize: 14,
                            fontFamily: "circular-bold",
                            color: "white"
                          }}
                        >
                          Loading...
                        </Text>
                      ) : (
                        <Text
                          style={{
                            padding: 3,
                            fontSize: 14,
                            fontFamily: "circular-bold",
                            color: "white"
                          }}
                        >
                          Book
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    marginTop: -15,
                    padding: 10,
                    fontFamily: "circular-book",
                    fontSize: 14,
                    color: "#4A4A4A"
                  }}
                >
                  {this.props.vendorsData ? (
                    <Text>{this.props.vendorsData.address}</Text>
                  ) : (
                    <Text>None</Text>
                  )}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    bottom: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        fontFamily: "circular-book",
                        fontSize: 16,
                        color: "#4A4A4A"
                      }}
                    >
                      Ratings
                    </Text>
                    <Rating style={{ padding: 10 }} imageSize={15} />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        fontFamily: "circular-book",
                        fontSize: 16,
                        color: "#4A4A4A"
                      }}
                    >
                      Price
                    </Text>
                    <Text
                      style={{
                        fontFamily: "circular-book",
                        fontSize: 16,
                        padding: 10,
                        color: "#7960FF"
                      }}
                    >
                      ₹₹₹
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        fontFamily: "circular-book",
                        fontSize: 16,
                        color: "#4A4A4A"
                      }}
                    >
                      Distance
                    </Text>
                    <Text
                      style={{
                        fontFamily: "circular-book",
                        fontSize: 16,
                        padding: 10,
                        color: "#7960FF"
                      }}
                    >
                      {this.props.vendorDistance} km
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ usermaps }) => {
  const {
    loading,
    vendors,
    errorMessage,
    location,
    isBookModalVisible,
    vendorsData,
    loadingBookig,
  } = usermaps;
  return {
    loading,
    vendors,
    errorMessage,
    location,
    isBookModalVisible,
    vendorsData,
    loadingBookig,
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
    getDistanceOneToOne
  }
)(NearbyGaraje);
