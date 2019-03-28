import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  ImageBackground,
  Dimensions,
  Button,
  TouchableHighlight,
  Slider,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore } from "../../actions";
import styles from "./usermapsStyle";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class filter extends Component {
  constructor(props) {
    super(props);
    (this.state = { isChecked1: false }),
      (this.state = { isChecked2: false }),
      (this.state = { isChecked3: false }),
      (this.state = { km: 10 });
  }

  getVal(val) {}

  render() {
    const { containerStyle } = styles;

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
            >
              <Header headerText="Nearby Garaje" />
            </Text>
            <View
              style={{
                height: 0.78 * ScreenHeight
              }}
            >
            <MapView
               provider={PROVIDER_GOOGLE} // remove if not using Google Maps
               style={{...StyleSheet.absoluteFillObject}}
               region={{
                 latitude: 23.0216238,
                 longitude: 72.5797068,
                 latitudeDelta: 0.015,
                 longitudeDelta: 0.0121,
               }}
             >
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
