import React, { Component } from "react";
import {
  Modal,
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
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { BITMAP1, BITMAP2, CAR, MOTORCYCLE,ICON_REFRESH } from "../../images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Slider } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

// import { Col, Row, Grid } from "react-native-easy-grid";
import {
  MECHANIC,
  HAND_HOLDING_UP,
  CAR_ENGINE,
  TIMING_BELT
} from "../../images";
import { Actions } from "react-native-router-flux";
import { toggleModalProfile,
         updateName,
         updateAddress,
         updateEmail,
         updateDateOfBirth,
         updatePasswordProfile,
         updateConfirmPassword,
         updateLanguage,
         signupUser,
         updateMobileNoProfile,
         updateOnSubmeetSignup
        } from "../../actions";
import _ from "lodash";
import styles from "./RegisterStyle";
import TimerMixin from "react-timer-mixin";
import withValidation from "simple-hoc-validator";
import isEmpty from "is-empty";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {

componentDidMount() {

}

  constructor(props){
    super(props);
    this.state ={isChecked:false}

  }

  render() {
    const {
      containerStyle,
      loginButton,
      createButton,
      button,
      buttonText,
      themeColor,
      whiteText,
      phoneinputStyle,
      inputStyle,
      textInputProfilStyle,
      subContainerProfile,
      profileHeadText,
      textError,
      headerTextStyle,
      headerViewProfile,
      profileNameText,
      profileModalView,
      profilImage1style,
      profileModal1View,
      profileModalText1,
      profileModalText2,
      profileButtonView
    } = styles;
    const { validate } = this.props;
     errors=this.props.onSubmeetSignupForm?validate(this.props.register):{};
    return (
      <View style={(containerStyle,[{opacity:this.props.visibleModalProfile?0.5:1}])}>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#FFFFFFFF" />

          <View
            style={headerViewProfile}
          >


            <Text
              style={headerTextStyle}
            >
              Personal Details
            </Text>
            <View style={{height:0.82 * ScreenHeight}}>
            <View style={subContainerProfile}>
              <Text
                style={profileHeadText}
              >
                Name
              </Text>
              <TextInput
                style={textInputProfilStyle}
                placeholder="Name"
                value={this.props.name}
                onChangeText={text=> {this.props.updateName(text);}}
              >
              </TextInput>
              {errors.name ? (
                <Text style={styles.textError}>{errors.name[0]}</Text>
              ) :null}
            </View>
            <View
              style={subContainerProfile}
            >
              <Text
                style={profileHeadText}
              >
                Address
              </Text>
              <TextInput
                style={textInputProfilStyle}
                underlineColorAndroid="transparent"
                placeholder="Address"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.address}
                onChangeText={text => {this.props.updateAddress(text);}}
              />
              {errors.address ? (
                <Text style={styles.textError}>{errors.address[0]}</Text>
              ) :null}
            </View>
            <View
              style={subContainerProfile}
            >
              <Text
                style={profileHeadText}
              >
                Mobile
              </Text>
              <TextInput
                style={ textInputProfilStyle}
                underlineColorAndroid="transparent"
                placeholder="Mobile"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.mobilenoProfile}
                onChangeText={text => {this.props.updateMobileNoProfile(text);}}
              />
              {errors.mobilenoProfile ? (
                <Text style={styles.textError}>{errors.mobilenoProfile[0]}</Text>
              ) :null}
            </View>
            <View
              style={subContainerProfile}
            >
              <Text
                style={profileHeadText}
              >
                Email
              </Text>
              <TextInput
                style={ textInputProfilStyle}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.email}
                onChangeText={text => {this.props.updateEmail(text);}}
              />
              {errors.email ? (
                <Text style={styles.textError}>{errors.email[0]}</Text>
              ) :null}
            </View>

            <View
              style={subContainerProfile}
            >
              <Text
                style={profileHeadText}
              >
                Password
              </Text>
              <TextInput
                style={textInputProfilStyle}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.password}
                onChangeText={text => {this.props.updatePasswordProfile(text);}}
              />
              {errors.password ? (
                <Text style={styles.textError}>{errors.password[0]}</Text>
              ) :null}
            </View>
            <View
              style={subContainerProfile}
            >
              <Text
                style={profileHeadText}
              >
                Confirm Password
              </Text>
              <TextInput
                style={textInputProfilStyle}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.confirmPassword}
                onChangeText={text => {this.props.updateConfirmPassword(text);}}
              />
              {errors.confirmPassword ? (
                <Text style={styles.textError}>{errors.confirmPassword[0]}</Text>
              ) :null}
            </View>
            <View
            hide={true}
              style={{
                height:0.24*ScreenHeight,
                marginBottom:10,
                marginRight:10,
                marginLeft:10,

              }}
            >
            <MapView
               provider={PROVIDER_GOOGLE} // remove if not using Google Maps
               style={{...StyleSheet.absoluteFillObject,
                 borderRadius:10,
                 borderWidth:1,
                 borderColor:'#7960FF',
               }}
               region={{
                 latitude: 23.0216238,
                 longitude: 72.5797068,
                 latitudeDelta: 0.015,
                 longitudeDelta: 0.0121,
               }}
             >
                 <MapView.Marker
                     coordinate={{
                       latitude: 23.0216238,
                       longitude: 72.5797068}}
                     title={'Hiren'}
                  />

                  <MapView.Marker
                      coordinate={{
                        latitude: 23.024338,
                        longitude: 72.5797068}}
                      title={'Devansh'}
                   />
                   <MapView.Marker
                   coordinate={{
                     latitude: 23.028338,
                     longitude: 72.5797068}}
                   title={'Devansh'}
                  />
             </MapView>
            </View>
            </View>
            <View style={profileButtonView}>
              <TouchableHighlight
                onPress={() =>{
                  this.props.updateOnSubmeetSignup();
                  this.props.isValid(this.props.register)?this.props.signupUser():null;
                  this.props.loadingSignup?this.props.toggleModalProfile():null;
                  }}
                underlayColor="white"
              >
                <View style={createButton}>
                  { this.props.loadingSignup?<Text style={[buttonText, whiteText]}>Loading...</Text>:<Text style={[buttonText, whiteText]}>Continue</Text>}
                </View>
              </TouchableHighlight>
            </View>
            <View />
            <Modal
              visible={this.props.visibleModalProfile?true:false}
              animationType="slide"
              onRequestClose={() => {
                console.log("Modal has been closed.");
              }}
              transparent={true}
              opacity={0.5}
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <View style={styles.containertwo}>
                <View
                  style={profileModalView}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image style={profilImage1style} source={BITMAP2} />
                  </View>
                  <View style={profileModal1View}>
                    <Text
                      style={profileModalText1}
                    >
                      Congratulations
                    </Text>
                    <Text style={profileModalText2}>
                      Now you are registered.
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        width: 350,
                        marginTop: 13
                      }}
                    >
                    {
                      this.props.isVendor?<Text>Wait for an approval from us.</Text>
                                          :<Text>Get ready to find your mechanic.</Text>
                    }

                    </Text>
                    <TouchableHighlight
                      onPress={() => {
                        this.props.toggleModalProfile(false);
                        Actions.filter();
                      }}
                      underlayColor="white"
                      style={{ marginTop: 13 }}
                    >
                      <View style={createButton}>
                        <Text style={[buttonText, whiteText]}>Continue</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const notEmpty = test => !isEmpty(test);
const rules = [
  {
    field: "name",
    condition: notEmpty,
    error: "Name is Require"
  },
  {
    field: "address",
    condition: notEmpty,
    error: "Address is Require"
  },
  {
    field: "email",
    condition: notEmpty,
    error: "Email is Require"
  },
  {
    field: "mobilenoProfile",
    condition: notEmpty,
    error: "Mobile No is Require"
  },
  {
    field: "password",
    condition: notEmpty,
    error: "Password is Require"
  },
  {
    field: "confirmPassword",
    condition: (confirmPassword, state) => confirmPassword === state.password,
    error: "Password is not match."
  },

  // {
  //   field: 'avatar',
  //   condition: avatar => avatar,
  //   error: 'Please select a profile photo',
  // },
];

const mapStateToProps = ({ register }) => {
  const { visibleModalProfile,
          name,
          address,
          email,
          dateOfBirth,
          password,
          language,
          loadingSignup,
          confirmPassword,
          mobilenoProfile,
          onSubmeetSignupForm,
          isVendor} = register;
  return { visibleModalProfile,
           name,
           address,
           email,
           dateOfBirth,
           password,
           language,
           loadingSignup,
           confirmPassword,
           mobilenoProfile,
           onSubmeetSignupForm,
           isVendor,
           register
          };
};

export default connect(
  mapStateToProps,
  { toggleModalProfile,
    updateName,
    updateAddress,
    updateEmail,
    updateDateOfBirth,
    updatePasswordProfile,
    updateConfirmPassword,
    updateLanguage,
    signupUser,
    updateMobileNoProfile,
    updateOnSubmeetSignup
   }
)(withValidation(rules,Profile));
