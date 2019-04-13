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
  Animated
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

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class filter extends Component {
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
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />
          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "stretch" }}
          >
            <Text
              style={{
                paddingTop: 16,
                paddingLeft: 16,
                fontSize: 20,
                fontWeight: "bold",
                color: "#4B4B4B"
              }}
            />
            <View
              style={{
                height: 0.78 * ScreenHeight
              }}
            >
              <Text />
              <MapView
                style={{
                  ...StyleSheet.absoluteFillObject,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 20,
                  borderRadius: 10,
                  borderWidth: 1
                }}
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
        <Footer />
      </View>
    );
  }
}

export default filter;
