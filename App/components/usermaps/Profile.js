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
  AsyncStorage,
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./usermapsStyle";
import Header from "../../Common/Header";


let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {

  render() {

    const { containerStyle } = styles;
    return (
      <View>
      <Header headerText="Profile"/>
      
      </View>
    );
  }
}

export default Profile;
