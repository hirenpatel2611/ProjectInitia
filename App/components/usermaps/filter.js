import React, { Component } from "react";
import {
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
  Slider
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Col, Row, Grid } from "react-native-easy-grid";
import { MOTORCYCLE, CAR, CAR_ENGINE, TIMING_BELT } from "../../images";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore } from "../../actions";
import _ from "lodash";
import TimerMixin from "react-timer-mixin";
import styles from "./usermapsStyle";
import Header from "../../Common/Header";
import { Rating, AirbnbRating } from "react-native-ratings";
import CheckBox from "react-native-check-box";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class filter extends Component {
  constructor(props) {
    super(props);
    (this.state = { isChecked1: false }),
      (this.state = { isChecked2: false }),
      (this.state = { isChecked3: false }),
      (this.state = { km: 10 });
  }

  getVal(val) {}

  render() {
    const { containerStyle, continueButton, buttonText } = styles;

    return (
      <View style={containerStyle}>
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
              <Header headerText="Flter" />
            </Text>
            <View
              style={{
                height: 0.78 * ScreenHeight
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 20,
                    fontWeight: "bold"
                  }}
                >
                  Mechanic Type
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 10
                  }}
                >
                  <TouchableHighlight>
                    <View
                      elevation={5}
                      style={{
                        alignItems: "center",
                        padding: 10,
                        marginTop: 10,
                        backgroundColor: "white",
                        borderRadius: 60,
                        marginRight: 20,
                        marginLeft: 20,
                        marginBottom: 10,
                        shadowColor: "#000000",
                        shadowOffset: { width: 0, height: 3 },
                        shadowRadius: 5,
                        shadowOpacity: 1.0
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, resizeMode: "contain" }}
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
                        marginTop: 10,
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
                        style={{ width: 25, height: 25, resizeMode: "contain" }}
                        source={CAR}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 20,
                    fontWeight: "bold",
                    paddingTop:10
                  }}
                >
                  Ratting
                </Text>
                <View
                  style={{
                    alignItems: "left",
                    padding: 10
                  }}
                >
                  <Rating
                    style={{ backgroundColor: "#7960FF" }}
                    imageSize={30}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 20,
                    fontWeight: "bold",
                    paddingTop:10
                  }}
                >
                  Cost
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    padding: 10
                  }}
                >
                  <CheckBox
                    isChecked={this.state.isChecked1}
                    rightText={"₹₹"}
                    onClick={() => {
                      this.setState({
                        isChecked1: !this.state.isChecked1
                      });
                    }}
                  />

                  <CheckBox
                    isChecked={this.state.isChecked2}
                    rightText={"₹₹₹"}
                    onClick={() => {
                      this.setState({
                        isChecked2: !this.state.isChecked2
                      });
                    }}
                  />

                  <CheckBox
                    isChecked={this.state.isChecked3}
                    rightText={"₹₹₹"}
                    onClick={() => {
                      this.setState({
                        isChecked3: !this.state.isChecked3
                      });
                    }}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingLeft: 20,
                    fontWeight: "bold",
                    paddingTop:10
                  }}
                >
                  Distance
                </Text>
                <View
                  style={{
                    padding: 10,
                    justifyContent:'space-around'
                  }}
                >
                  <Slider
                    style={{ width: 0.92 * ScreenWidth }}
                    step={1}
                    minimumValue={0}
                    maximumValue={20}
                    value={this.state.km}
                    onValueChange={val => this.setState({ km: val })}
                    onSlidingComplete={val => this.getVal(val)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <Text>5 km</Text>
                  <Text
                    style={{
                      color: "blue"
                    }}
                  >
                    {this.state.km} km
                  </Text>
                  <Text>anyware</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: ScreenWidth,
                paddingTop: 16,
                paddingLeft: 16,
                flex: 1,
                flexDirection: "row",
                alignItems: "row",
                borderBottomWidth: 1,
                paddingBottom: 16,
                justifyContent: "center"
              }}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableHighlight
                  onPress={() => Actions.NearbyGaraje()}
                  underlayColor="white"
                >
                  <View style={continueButton}>
                    <Text style={buttonText}>See Mechanic</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default filter;
