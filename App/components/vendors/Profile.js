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
  TextInput,
  AsyncStorage,
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./vendorStyle";
import Header from "../../Common/Header";


let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {

  render() {

    const { containerStyle,
      subContainerProfile,
      textInputProfilStyle
    } = styles;
    return (
      <View>
      <Header headerText="Profile"/>
      <View
        style={{
          marginTop:13,
          height: 0.51 * ScreenHeight,
          justifyContent: "space-around"
        }}
      >

          <Text
            style={textInputProfilStyle}
          > Name</Text>

        <Text
          style={textInputProfilStyle}
        >Address</Text>


        <Text
          style={textInputProfilStyle}
        >Email</Text>

        <Text
          style={textInputProfilStyle}
        >Mobile</Text>


        <Text
          style={textInputProfilStyle}>
        </Text>

      </View>
      </View>
    );
  }
}

export default Profile;
