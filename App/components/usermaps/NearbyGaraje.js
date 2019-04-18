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
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    this._map.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      1
    );
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
                {this.state.location ? (
                  <MapView.Marker.Animated
                    coordinate={this.state.location.coords}
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
  vendors
  } = usermaps;
  return {
    loading,
    vendors
  };
};

export default connect(
  mapStateToProps,
  { getVendors }
)(NearbyGaraje);
