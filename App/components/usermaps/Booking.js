import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  Slider,
  StyleSheet,
  Platform,
  Animated,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./usermapsStyle";
import Header from "../../Common/Header";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Booking extends Component {
  render() {
    const { containerStyle } = styles;
    return (
      <View>
        <Header headerText="Booking" />
        <View
          style={{
            margin: 15,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10
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
                fontFamily: "circular-bold",
                fontSize: 16
              }}
            >
              Name
            </Text>
            <Text
              style={{
                fontFamily: "circular-bold",
                fontSize: 14
              }}
            >
              Distance
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                fontFamily: "circular-bold",
                fontSize: 14
              }}
            >
              Vehicle
            </Text>
            <Text
              style={{
                fontFamily: "circular-bold",
                fontSize: 14
              }}
            >
              10 km
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Booking;
