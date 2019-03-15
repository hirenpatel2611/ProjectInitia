import React, { Component } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  ImageBackground,
  Dimensions,
  Button,
  TouchableHighlight,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Col, Row, Grid } from "react-native-easy-grid";
import { BITMAP1, BITMAP2, CAR, MOTORCYCLE } from "../../images";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore } from "../../actions";
import _ from "lodash";
import styles from "./LoginStyle";
import TimerMixin from "react-timer-mixin";

class Game extends Component {

  state = {
    modalVisible: false,
    modal1Visible: false,
    containerOpac: 1
  };
  toggleModal(visible) {
    if (visible == true) {
      this.setState({ containerOpac: 0.5 });
    }
    this.setState({ modalVisible: visible });
    // if(visible == false)
    // this.setState({ modal1Visible: true });
  }
  toggleModal1(visible) {
    this.setState({ modalVisible: false });
    this.setState({ modal1Visible: visible });

    if (visible == false) {
      Actions.profile();
    }
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
      inputStyle,
      verificationInputStyle
    } = styles;

    return (
      <View style={(containerStyle, [{ opacity: this.state.containerOpac }])}>
        <Modal
          visible={this.state.modalVisible}
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
                  Get ready to find your mechanic
                </Text>
                <TouchableHighlight
                  onPress={() => {
                    this.toggleModal1(true);
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

        <Modal
          visible={this.state.modal1Visible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.containertwo}>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={{ marginLeft: 40 }}>
                <Text
                  style={{
                    fontSize: 25,
                    color: "#000000",
                    marginTop: 13,
                    fontWeight: "bold"
                  }}
                >
                  Select your vechile Type
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 84
                }}
              >
                <TouchableHighlight>
                  <View
                    elevation={5}
                    style={{
                      alignItems: "center",
                      padding: 10,
                      marginTop: 50,
                      backgroundColor: "white",
                      borderRadius: 60,
                      marginRight: 20,
                      marginLeft: 50,
                      marginBottom: 10,
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowRadius: 5,
                      shadowOpacity: 1.0
                    }}
                  >
                    <Image
                      style={{ width: 90, height: 90, resizeMode: "contain" }}
                      source={MOTORCYCLE}
                    />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight>
                  <View
                    elevation={5}
                    style={{
                      alignItems: "center",
                      padding: 10,
                      marginTop: 50,
                      backgroundColor: "white",
                      borderRadius: 60,
                      marginLeft: 20,
                      marginBottom: 10,
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowRadius: 5,
                      shadowOpacity: 1.0
                    }}
                  >
                    <Image
                      style={{ width: 90, height: 90, resizeMode: "contain" }}
                      source={CAR}
                    />
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{ alignItems: "center", marginTop: 114, margin: 30 }}
              >
                <TouchableHighlight
                  onPress={() => {
                    this.toggleModal1(!this.state.modal1Visible);
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
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "stretch",
              marginTop: 75
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image style={{ width: 140, height: 140 }} source={BITMAP1} />
            </View>
            <View style={{ alignItems: "center", marginTop: 32 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}
              >
                Verification
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  width: 350,
                  marginTop: 16,
                  paddingRight: 33,
                  paddingLeft: 33
                }}
              >
                {" "}
                Enter 4 digit number that sent to +917416283027
              </Text>
            </View>
          </View>
          <View
            elevation={5}
            style={{
              alignItems: "center",
              marginTop: 50,
              backgroundColor: "white",
              borderRadius: 5,
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 10,
              paddingBottom: 30,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
              shadowOpacity: 1.0
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <TextInput
                style={verificationInputStyle}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                maxLength={1}
                keyboardType={"phone-pad"}
              />
              <TextInput
                style={verificationInputStyle}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                maxLength={1}
                keyboardType={"phone-pad"}
              />
              <TextInput
                style={verificationInputStyle}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                maxLength={1}
                keyboardType={"phone-pad"}
              />
              <TextInput
                style={verificationInputStyle}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                maxLength={1}
                keyboardType={"phone-pad"}
              />
            </View>
            <TouchableHighlight
              onPress={() => {
                this.toggleModal(true);
              }}
              underlayColor="white"
            >
              <View style={createButton}>
                <Text style={[buttonText, whiteText]}>Continue</Text>
              </View>
            </TouchableHighlight>
            <Text
              style={{ fontSize: 14, textAlign: "center", color: "#7960FF" }}
            >
              Re-send code in 00:30 Second
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ game }) => {
  const { time, score } = game;
  return { time, score };
};

export default connect(
  mapStateToProps,
  { setTimer, setScore }
)(Game);
