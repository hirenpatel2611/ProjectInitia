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
  TouchableHighlight
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
      headerTextStyle
    } = styles;
    const { validate } = this.props;
     errors=this.props.onSubmeetSignupForm?validate(this.props.register):{};
    return (
      <View style={(containerStyle,[{opacity:this.props.visibleModalProfile?0.5:1}])}>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />

          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "stretch", height:ScreenHeight }}
          >


            <Text
              style={headerTextStyle}
            >
              Personal Details
            </Text>
            <View style={{height:0.7 * ScreenHeight}}>
            <View style={subContainerProfile}>
              <Text
                style={profileHeadText}
              >
                Name
              </Text>
              <TextInput
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#4B4B4B",

                }}
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
            </View>
            <View style={{ alignItems: "center" }}>
              console.error({this.props.loadingSignup});
              <TouchableHighlight
                onPress={() =>{
                  this.props.updateOnSubmeetSignup();
                  this.props.isValid(this.props.register)?this.props.signupUser():null;
                  this.props.loadingSignup?this.props.toggleModalProfile():null;
                  }}
                underlayColor="white"
                style={{paddingTop:0.15*ScreenHeight}}
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
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "stretch",
                    marginTop: 50
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image style={{ width: 140, height: 140 }} source={BITMAP2} />
                  </View>
                  <View style={{ alignItems: "center", marginTop: 20, margin: 30 }}>
                    <Text
                      style={{ fontSize: 16, fontWeight: "bold", color: "#7960FF" }}
                    >
                      Congratulations
                    </Text>
                    <Text style={{ fontSize: 25, color: "#000000", marginTop: 13 }}>
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
