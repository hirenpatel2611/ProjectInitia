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
import {
  getUserLocationSuccess,
} from "../../actions";

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
          > {this.props.userData?this.props.userData.userFullName:null}</Text>

        <Text
          style={textInputProfilStyle}
        >{this.props.userData?this.props.userData.userAddress:null}</Text>


        <Text
          style={textInputProfilStyle}
        >{this.props.userData?this.props.userData.userEmail:null}</Text>

        <Text
          style={textInputProfilStyle}
        >{this.props.userData?this.props.userData.userMobileno:null}</Text>


        <Text
          style={textInputProfilStyle}>
        </Text>

      </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const {
  userData
  } = user;
  return {
userData
  };
};

export default connect(
  mapStateToProps,
  {
    getUserLocationSuccess
  }
)(Profile);
