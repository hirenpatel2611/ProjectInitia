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
import styles from "./usermapsStyle";
import Header from "../../Common/Header";
import {
  getUserLocationSuccess,
  loadCustomerProfile,
  updateCustomerFullName,
  updateCustomerAddress,
  updateCustomerEmail,
  updateCustomerProfile,
  upadteCustomerProfileImage
} from "../../actions";
import withValidation from "simple-hoc-validator";
import { USER2,PENCIL } from "../../images";
import { Asset } from "expo";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants'

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {
componentWillMount() {
  this.props.loadCustomerProfile();
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
      textInputProfilStyle,
      createButton,
      buttonText,
      whiteText
    } = styles;

    return (
      <View>
      <Header headerText="Profile"/>
      <KeyboardAwareScrollView enableOnAndroid>
      <View style={{borderRadius: 15,
                    borderColor: "#7960FF",
                    width: 0.15 * ScreenHeight,
                    height:0.15 * ScreenHeight,
                    alignSelf:'center',
                    marginTop:0.003 * ScreenHeight,
                    justifyContent: "center"
                }}>
      <Image style={{borderRadius: 0.30 * ScreenHeight,
                    width: 0.14 * ScreenHeight,
                    height:0.14 * ScreenHeight,
                    resizeMode: "contain",
                    alignSelf:'center',
                    position: 'absolute',
                    zIndex: 0
                }} source={this.props.imageCustomerUri?this.props.imageCustomerUri:USER2} />

                <TouchableOpacity style={{
                  borderRadius:15,
                  width: 22,
                  height:22,
                  alignSelf:'flex-end',
                  backgroundColor: '#F5FCFF',
                }}
                onPress={()=>{
                  this.props.upadteCustomerProfileImage();
                }}
                >
                <Image style={{
                              width: 15,
                              height:15,
                              resizeMode: "contain",

                          }} source={PENCIL} />
                          </TouchableOpacity>
      </View>
      <View
        style={{
            marginTop:0.003 * ScreenHeight,
          height: 0.42 * ScreenHeight,
          justifyContent: "space-around"
        }}
      >
      <TextInput
        style={textInputProfilStyle}
        underlineColorAndroid="transparent"
        placeholderTextColor="#9D9D9D"
        placeholder="Name"
        value={this.props.fullNameCustomer}
        onChangeText={text => {
          this.props.updateCustomerFullName(text);
        }}
      />
      <TextInput
        style={textInputProfilStyle}
        underlineColorAndroid="transparent"
        placeholderTextColor="#9D9D9D"
        placeholder="Name"
        value={this.props.addressCustomer}
        multiline={true}
        onChangeText={text => {
          this.props.updateCustomerAddress(text);
        }}
      />
      <TextInput
        style={textInputProfilStyle}
        underlineColorAndroid="transparent"
        placeholderTextColor="#9D9D9D"
        placeholder="Name"
        value={this.props.emailCustomer}
        onChangeText={text => {
          this.props.updateCustomerEmail(text);
        }}
      />
      <TextInput
        style={textInputProfilStyle}
        underlineColorAndroid="transparent"
        placeholderTextColor="#9D9D9D"
        placeholder="Name"
        value={this.props.userData?this.props.userData.userMobileno:null}
      />
      </View>
      <TouchableHighlight
        onPress={() => {
          this.props.updateCustomerProfile();
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
        color: "white"}}>{this.props.loadingCustomerProfile?'Loading...':'Continue'}</Text>
      </TouchableHighlight>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}


const mapStateToProps = ({ user ,usermaps}) => {
  const {
  onSubmeetProfileForm,
  fullNameCustomer,
  addressCustomer,
  emailCustomer,
  imageCustomerUri,
  loadingCustomerProfile
  } = usermaps;
  const {
  userData
  } = user;
  return {
userData,
onSubmeetProfileForm,
fullNameCustomer,
addressCustomer,
emailCustomer,
imageCustomerUri,
loadingCustomerProfile
  };
};

export default connect(
  mapStateToProps,
  {
    getUserLocationSuccess,
    loadCustomerProfile,
    updateCustomerFullName,
    updateCustomerAddress,
    updateCustomerEmail,
    updateCustomerProfile,
    upadteCustomerProfileImage
  }
)(Profile);
