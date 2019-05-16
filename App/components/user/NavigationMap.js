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
  getUserLocationSuccess
} from "../../actions";

import { Rating, AirbnbRating } from "react-native-ratings";
import geolib from "geolib";
import MapViewDirections from 'react-native-maps-directions';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class NearbyGaraje extends Component {
  state = {
    location: null,
    errorMessage: null
  };

  async componentWillMount() {

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
      }
    );
  };

  render() {
    var GOOGLE_MAPS_APIKEY = 'AIzaSyAm_cQCYcozNa9WUVmASmSABGuuS6OSsIw';
    var origin = {latitude: this.props.location.coords.latitude,
                  longitude: this.props.location.coords.longitude};
    var destination = {latitude:23.03155710,longitude:72.64532580};
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
              ...StyleSheet.absoluteFillObject
            }}
            provider={PROVIDER_GOOGLE}
            ref={component => (this._map = component)}
          >

          <MapViewDirections
          origin ={origin}
          destination={destination}
          strokeWidth={3}
           strokeColor="hotpink"
           apikey={GOOGLE_MAPS_APIKEY}
          />

          </MapView>


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
location
  } = usermaps;
  return {
location
  };
};

export default connect(
  mapStateToProps,
  {
getUserLocationSuccess
  }
)(NearbyGaraje);
