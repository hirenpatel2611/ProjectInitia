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
import { Constants, Location, Permissions } from "expo";
import {
  getVendors,
  getUserLocationFail,
  getUserLocationSuccess
} from "../../actions";

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
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });

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
    if (this.props.vendors.length){
      markers=this.props.vendors.map((vendor)=>{
        return   <MapView.Marker.Animated
            key = {vendor.id}
            coordinate={{
              latitude:parseInt(vendor.latitude),
              longitude:parseInt(vendor.longitude)
            }}
          />
      })
      console.error(markers);

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
      <View>
        <TouchableOpacity
          onPress={() => {
            this._deleteUser();
            Actions.SplashFront();
          }}
        >
          <View
            style={{
              backgroundColor: "#7960FF",
              height: 30,
              width: 70,
              borderRadius: 15,
              alignItems: "center",
              marginTop: 25,
              marginLeft: 10,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white"
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />

          <View
            style={{ flexDirection: "column", alignItems: "stretch" }}
          >

            <View
              style={{
                height: 0.89 * ScreenHeight,
                marginTop:5,
                borderWidth: 1,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 10
              }}
            >
              <Text />
              <MapView
                style={{
                  ...StyleSheet.absoluteFillObject,
                  borderRadius: 15,
                  borderWidth: 1
                }}
                provider={PROVIDER_GOOGLE}
                ref={component => (this._map = component)}
>
                {markers}
                {this.props.location ? (
                  <MapView.Marker.Animated
                    coordinate={this.props.location.coords}
                  />
                ) : null}
              </MapView>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ usermaps }) => {
  const {
    loading,
  vendors,
  errorMessage,
  location
  } = usermaps;
  return {
    loading,
    vendors,
    errorMessage,
    location
  };
};

export default connect(
  mapStateToProps,
  { getVendors,getUserLocationFail,getUserLocationSuccess }
)(NearbyGaraje);
