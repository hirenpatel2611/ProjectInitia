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
  loadVendorProfile,
  updateVendorFullName,
  updateVendorAddress,
  updateVendorEmail,
  updateVendorProfile,
  upadteVendorProfileImage
} from "../../actions";
import { USER2,PENCIL } from "../../images";
import { Asset,Constants } from "expo";
import * as Permissions from 'expo-permissions';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {
  componentWillMount() {
    this.props.loadVendorProfile();
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
   if (Constants.platform.ios) {
     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
     if (status !== 'granted') {
       alert('Sorry, we need camera roll permissions to make this work!');
     }
   }
 }
  render() {
    const { containerStyle,
      subContainerProfile,
      textInputProfilStyle
    } = styles;
    return (
      <View>
      <Header headerText="Profile"/>
      <KeyboardAwareScrollView enableOnAndroid>
      <View style={{borderRadius: 15,
                    borderColor: "#7960FF",
                    width: 90,
                    height:90,
                    alignSelf:'center',
                    marginTop:0.01 * ScreenHeight,
                    justifyContent: "center"
                }}>
      <Image style={{borderRadius: 200,
                    width: 70,
                    height:70,
                    resizeMode: "contain",
                    alignSelf:'center',
                }} source={this.props.imageVendorUri?this.props.imageVendorUri:USER2} />

                <TouchableOpacity style={{
                  width: 20,
                  height:20,
                  alignSelf:'flex-end',
                  resizeMode: "contain",
                }}
                onPress={()=>{
                  this.props.upadteVendorProfileImage();
                }}
                >
                <Image style={{borderRadius: 15,
                              width: 20,
                              height:20,
                              resizeMode: "contain",

                          }} source={PENCIL} />
                          </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop:0.01 * ScreenHeight,
          height: 0.48 * ScreenHeight,
          justifyContent: "space-around"
        }}
      >

      <TextInput
        style={textInputProfilStyle}
        underlineColorAndroid="transparent"
        placeholderTextColor="#9D9D9D"
        placeholder="Name"
        value={this.props.fullNameVendor}
        onChangeText={text => {
          this.props.updateVendorFullName(text);
        }}
      />


      <TextInput
        style={textInputProfilStyle}
        underlineColorAndroid="transparent"
        placeholderTextColor="#9D9D9D"
        placeholder="Name"
        value={this.props.addressVendor}
        multiline={true}
        onChangeText={text => {
          this.props.updateVendorAddress(text);
        }}
      />
      <TextInput
        style={textInputProfilStyle}
        underlineColorAndroid="transparent"
        placeholderTextColor="#9D9D9D"
        placeholder="Name"
        value={this.props.emailVendor}
        onChangeText={text => {
          this.props.updateVendorEmail(text);
        }}
      />
      <TextInput
        style={textInputProfilStyle}
        underlineColorAndroid="transparent"
        placeholderTextColor="#9D9D9D"
        placeholder="Name"
        value={this.props.userData?this.props.userData.userMobileno:null}
      />
        <Text
          style={textInputProfilStyle}>
        </Text>

      </View>
      <TouchableHighlight
        onPress={() => {
          this.props.updateVendorProfile();
        }}
        underlayColor="white"
        style={{ marginTop: 0.2 * ScreenHeight,
                alignSelf:'center',
                backgroundColor: "#7960FF",
                height: 44,
                width: 0.78 * ScreenWidth,
                borderRadius: 25,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center"
         }}
      >
          <Text style={{padding: 10,
          fontSize: 18,
          fontFamily: "circular-book",
        color: "white"}}>Continue</Text>
      </TouchableHighlight>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}


const mapStateToProps = ({ user ,vendors}) => {
  const {
  onSubmeetProfileVendorForm,
  fullNameVendor,
  addressVendor,
  emailVendor,
  imageVendorUri
} = vendors;
  const {
  userData
  } = user;
  return {
userData,
onSubmeetProfileVendorForm,
fullNameVendor,
addressVendor,
emailVendor,
imageVendorUri
  };
};

export default connect(
  mapStateToProps,
  {
    getUserLocationSuccess,
    loadVendorProfile,
    updateVendorFullName,
    updateVendorAddress,
    updateVendorEmail,
    updateVendorProfile,
    upadteVendorProfileImage
  }
)(Profile);
