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
  AsyncStorage
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
  isMenuVisible
} from "../../actions";
import { MECHANIC,USER2,FILTER } from "../../images";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class NearbyGaraje extends Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
    this.props.getVendors();
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
  };

  _deleteUser = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
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
          >
            <Image
              style={{
                borderRadius: 15,
                borderColor: "#7960FF",
                width: 20,
                height: 20,
                resizeMode: "contain"
              }}
              source={USER2}
            />
          </MapView.Marker.Animated>
        );
      });
      console.log(markers);
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
              onPressMenu={()=> {this.props.isMenuVisible(true)}}
              onPressMenuCancle={()=> {this.props.isMenuVisible(false)}}
              isModalVisible={this.props.isMenuModalVisible}>
      </Header>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />

          <View style={{ flexDirection: "column", alignItems: "stretch" }}>
            <View
              style={{
                height: 0.82 * ScreenHeight,
              }}
            >
              <Text />
              <MapView
                style={{
                  ...StyleSheet.absoluteFillObject,

                }}
                provider={PROVIDER_GOOGLE}
                ref={component => (this._map = component)}
              >
                {markers}
                {this.props.location ? (
                  <MapView.Marker.Animated
                    coordinate={this.props.location.coords}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        height: 18,
                        width: 18,
                        borderRadius: 10,
                        borderColor: "#7960FF",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#7960FF",
                          height: 14,
                          width: 14,
                          borderRadius: 10
                        }}
                      />
                    </View>
                  </MapView.Marker.Animated>
                ) : null}
              </MapView>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = ({ usermaps }) => {
  const { loading, vendors, errorMessage, location,isMenuModalVisible } = usermaps;
  return {
    loading,
    vendors,
    errorMessage,
    location,
    isMenuModalVisible
  };
};

export default connect(
  mapStateToProps,
  { getVendors, getUserLocationFail, getUserLocationSuccess,isMenuVisible }
)(NearbyGaraje);
