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
import { MOTORCYCLE, CAR, BACK_ARROW } from "../../images";
import { Actions } from "react-native-router-flux";
import {
  updateFilterVehicleBool,
  updateFilterCarBool,
  getFilterRating,
  getFilterCheckBox1,
  getFilterCheckBox2,
  getFilterCheckBox3,
  getFilterDistance,
  resetFilter
} from "../../actions";
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
    this.state = { km: 10 };
  }

  render() {
    const { containerStyle, continueButton, buttonText, createButton } = styles;

    return (
      <View style={containerStyle}>
        <KeyboardAwareScrollView>
          <StatusBar backgroundColor="#7960FF" />
          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "stretch"}}
          >
            <View
              style={{
                padding: 10,
                marginTop: 27,
                width: ScreenWidth,
                flexDirection: "row",
                marginBottom: 12,
                justifyContent:'space-between'
              }}
            >
              <TouchableOpacity
                style={{ width: 27 }}
                onPress={() => Actions.NearbyGaraje()}
              >
                <View
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    style={{ height: 17, width: 25,tintColor:'black' }}
                    source={BACK_ARROW}
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  paddingLeft: 16,
                  fontSize: 20,
                  fontFamily: "circular-bold",
                  color: "#4B4B4B"
                }}
              >
                Filter
              </Text>

              <TouchableOpacity
              onPress={()=>{
                this.props.resetFilter()
              }}
              >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "circular-book",
                  color: "#7960FF"
                }}
              >
                reset
              </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 0.55 * ScreenHeight,
                justifyContent:'space-around'
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 20,
                  color: "#4A4A4A",
                  fontFamily: "circular-book"
                }}
              >
                Mechanic Type
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "space-around",
                  width: 0.5 * ScreenWidth
                }}
              >
                <TouchableHighlight
                  activeOpacity={1}
                  onPress={() => {
                    this.props.updateFilterVehicleBool();
                  }}
                  style={{
                    borderRadius: 100
                  }}
                >
                  <View
                    elevation={5}
                    style={{
                      alignItems: "center",
                      padding: 4,
                      backgroundColor: this.props.isVehicle
                        ? "#7960FF"
                        : "white",
                      borderRadius: 60,
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowRadius: 5,
                      shadowOpacity: 1.0
                    }}
                  >
                    <Image
                      style={{ width: 33, height: 33, resizeMode: "contain" }}
                      source={MOTORCYCLE}
                    />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={1}
                  onPress={() => {
                    this.props.updateFilterCarBool();
                  }}
                  style={{
                    borderRadius: 100
                  }}
                >
                  <View
                    elevation={5}
                    style={{
                      alignItems: "center",
                      backgroundColor: this.props.isCar ? "#7960FF" : "white",
                      padding: 4,
                      borderRadius: 60,
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowRadius: 5,
                      shadowOpacity: 1.0
                    }}
                  >
                    <Image
                      style={{ width: 33, height: 33, resizeMode: "contain" }}
                      source={CAR}
                    />
                  </View>
                </TouchableHighlight>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 20,
                  color: "#4A4A4A",
                  fontFamily: "circular-book",
                  paddingTop: 10
                }}
              >
                Rating
              </Text>
              <View
                style={{
                  alignItems: "flex-start",
                  padding: 10,
                  flexDirection: "row"
                }}
              >
                <Rating
                  type="custom"
                  ratingBackgroundColor="transparent"
                  imageSize={30}
                  startingValue={this.props.rating.toString()}
                  onFinishRating={rating => {
                    this.props.getFilterRating(rating);
                  }}
                />
                <Text>{this.props.rating}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    paddingLeft: 20,
                    color: "#4A4A4A",
                    fontFamily: "circular-book",
                    paddingTop: 10,
                    flexDirection: "column"
                  }}
                >
                  Cost
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: ScreenWidth,
                    justifyContent: "space-around",
                    padding: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start"
                    }}
                  >
                    <CheckBox
                      isChecked={this.props.isChecked1}
                      checkedCheckBoxColor="#7960FF"
                      onClick={() => {
                        this.props.getFilterCheckBox1();
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "circular-book",
                        paddingLeft: 10,
                        paddingTop: 3,
                        color: this.props.isChecked1 ? "#7960FF" : "#4A4A4A"
                      }}
                    >
                      ₹₹
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start"
                    }}
                  >
                    <CheckBox
                      isChecked={this.props.isChecked2}
                      checkedCheckBoxColor="#7960FF"
                      onClick={() => {
                        this.props.getFilterCheckBox2();
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "circular-book",
                        paddingLeft: 10,
                        paddingTop: 3,
                        color: this.props.isChecked2 ? "#7960FF" : "#4A4A4A"
                      }}
                    >
                      ₹₹₹
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start"
                    }}
                  >
                    <CheckBox
                      isChecked={this.props.isChecked3}
                      checkedCheckBoxColor="#7960FF"
                      onClick={() => {
                        this.props.getFilterCheckBox3();
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "circular-book",
                        paddingLeft: 10,
                        paddingTop: 3,
                        color: this.props.isChecked3 ? "#7960FF" : "#4A4A4A"
                      }}
                    >
                      ₹₹₹₹
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 20,
                  color: "#4A4A4A",
                  fontFamily: "circular-book",
                  paddingTop: 10
                }}
              >
                Distance
              </Text>
              <View
                style={{
                  padding: 10,
                  justifyContent: "space-around"
                }}
              >
                <Slider
                  style={{ width: 0.92 * ScreenWidth }}
                  step={1}
                  minimumValue={5}
                  maximumValue={15}
                  value={this.props.distance}
                  minimumTrackTintColor="#7960FF"
                  thumbTintColor="#7960FF"
                  onValueChange={val => this.setState({ km: val })}
                  onSlidingComplete={val => this.props.getFilterDistance(val)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop:-10
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "circular-book",
                    color: "#4A4A4A"
                  }}
                >
                  5 km
                </Text>
                <Text
                  style={{
                    color: "#7960FF",
                    fontSize: 18,
                    fontFamily: "circular-book"
                  }}
                >
                  {this.props.distance} km
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "circular-book",
                    color: "#4A4A4A"
                  }}
                >
                  anyware
                </Text>
              </View>
            </View>
            <TouchableHighlight
              onPress={() => Actions.NearbyGaraje()}
              underlayColor="white"
              style={{
                alignSelf:'center',
                marginTop:0.23 * ScreenHeight
              }}
            >
              <View style={continueButton}>
                <Text style={buttonText}>See Mechanic</Text>
              </View>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ usermaps }) => {
  const {
    isVehicle,
    isCar,
    rating,
    isChecked1,
    isChecked2,
    isChecked3,
    distance
  } = usermaps;
  return {
    isVehicle,
    isCar,
    rating,
    isChecked1,
    isChecked2,
    isChecked3,
    distance
  };
};

export default connect(
  mapStateToProps,
  {
    updateFilterVehicleBool,
    updateFilterCarBool,
    getFilterRating,
    getFilterCheckBox1,
    getFilterCheckBox2,
    getFilterCheckBox3,
    getFilterDistance,
    resetFilter
  }
)(filter);
