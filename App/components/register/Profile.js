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
         updateLanguage
        } from "../../actions";
import _ from "lodash";
import styles from "./RegisterStyle";
import TimerMixin from "react-timer-mixin";

class Profile extends Component {
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
      profileHeadText
    } = styles;


    return (
      <View style={(containerStyle,[{opacity:this.props.visibleModalProfile?0.5:1}])}>
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
              Personal Details
            </Text>

            <View
              style={{
              }}
            >
            <Image
              source={require("../../images/USER2.png")}
              style={{ width: 64, height: 64, borderRadius:40, alignSelf:'center' }}
            />

            </View>
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
                value={""}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.email}
                onChangeText={text => {this.props.updateEmail(text);}}
              />
            </View>
            <View
              style={subContainerProfile}
            >
              <Text
                style={profileHeadText}
              >
                Date of Birth
              </Text>
              <TextInput
                style={textInputProfilStyle}
                underlineColorAndroid="transparent"
                placeholder="Date of Birth"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.dateOfBirth}
                onChangeText={text => {this.props.updateDateOfBirth(text);}}
              />
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
                value={""}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.password}
                onChangeText={text => {this.props.updatePasswordProfile(text);}}
              />
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
                value={""}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.password}
                onChangeText={text => {this.props.updatePasswordProfile(text);}}
              />
            </View>
            <View
              style={subContainerProfile}
            >
              <Text
                style={profileHeadText}
              >
                My Langauge
              </Text>
              <TextInput
                style={textInputProfilStyle}
                value={""}
                underlineColorAndroid="transparent"
                placeholder="Langauge"
                placeholderTextColor="#9D9D9D"
                autoCapitalize="none"
                value={this.props.language}
                onChangeText={text => {this.props.updateLanguage(text);}}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableHighlight
                onPress={() => this.props.toggleModalProfile(true)}
                underlayColor="white"
              >
                <View style={createButton}>
                  <Text style={[buttonText, whiteText]}>Continue</Text>
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

const mapStateToProps = ({ register }) => {
  const { visibleModalProfile,name,address,email,dateOfBirth,password,language } = register;
  return { visibleModalProfile,name,address,email,dateOfBirth,password,language };
};

export default connect(
  mapStateToProps,
  { toggleModalProfile,
    updateName,
    updateAddress,
    updateEmail,
    updateDateOfBirth,
    updatePasswordProfile,
    updateLanguage
   }
)(Profile);
