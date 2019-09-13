import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  Slider
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Col, Row, Grid } from "react-native-easy-grid";
import { MOTORCYCLE, CAR, BACK_ARROW,HEAVY_VEHICLE,TOWING,TYRE } from "../../images";
import { Actions } from "react-native-router-flux";
import {
  getFilterRating,
  getFilterDistance,
  resetFilter,
  getFilterSubmeet
} from "../../actions";
import _ from "lodash";
import TimerMixin from "react-timer-mixin";
import styles from "./customersStyle";
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
          <View style={inStyle.mainView}>
            <View style={inStyle.headerView}>
              <TouchableOpacity
                style={{ width: 27 }}
                onPress={() => Actions.NearbyGaraje()}
              >
                <View style={inStyle.backButton}>
                  <Image style={inStyle.ImageBack} source={BACK_ARROW} />
                </View>
              </TouchableOpacity>
              <Text style={inStyle.headerTextMain}>Filter</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.resetFilter();
                }}
              >
                <Text style={inStyle.textReset}>reset</Text>
              </TouchableOpacity>
            </View>
            <View style={inStyle.bodyView}>
              <Text style={[inStyle.textMechanic, { paddingTop: 10 }]}>
                Rating
              </Text>
              <View style={inStyle.ratingView}>
                <AirbnbRating
                  type="star"
                  ratingBackgroundColor="transparent"
                  imageSize={25}
                  defaultRating={this.props.rating.toString()}
                  showRating={false}
                  onFinishRating={rating => {
                    this.props.getFilterRating(rating);
                  }}
                />
                <Text>{this.props.rating}</Text>
              </View>
              <Text style={[inStyle.textMechanic, { paddingTop: 10 }]}>
                Distance
              </Text>
              <View style={inStyle.distanceView1}>
                <Slider
                  style={{ width: 0.92 * ScreenWidth }}
                  step={1}
                  minimumValue={5}
                  maximumValue={50}
                  value={this.props.distance}
                  minimumTrackTintColor="#7960FF"
                  thumbTintColor="#7960FF"
                  onValueChange={val => this.setState({ km: val })}
                  onSlidingComplete={val => this.props.getFilterDistance(val)}
                />
              </View>
              <View style={inStyle.distanceView2}>
                <Text style={inStyle.distanceBlackText}>5 km</Text>
                <Text style={inStyle.distanceBlueText}>
                  {this.props.distance} km
                </Text>
                <Text style={inStyle.distanceBlackText}>Anywhere</Text>
              </View>
            </View>
            <TouchableHighlight
              onPress={() =>{
                this.props.getFilterSubmeet();
              }}
              underlayColor="white"
              style={inStyle.mainButtonStyle}
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

const inStyle = {
  mainView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch"
  },
  headerView: {
    padding: 10,
    marginTop: 27,
    width: ScreenWidth,
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between"
  },
  backButton: {
    height: 25,
    width: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  ImageBack: {
    height: 17,
    width: 25,
    tintColor: "black"
  },
  headerTextMain: {
    paddingLeft: 16,
    fontSize: 20,
    fontFamily: "circular-bold",
    color: "#4B4B4B"
  },
  textReset: {
    fontSize: 16,
    fontFamily: "circular-book",
    color: "#7960FF"
  },
  bodyView: {
    height: 0.55 * ScreenHeight,
    justifyContent: "space-around"
  },
  textMechanic: {
    fontSize: 18,
    paddingLeft: 20,
    color: "#4A4A4A",
    fontFamily: "circular-book"
  },
  ratingView: {
    alignItems: "flex-start",
    padding: 10,
    flexDirection: "row"
  },
  costView: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: ScreenWidth,
    justifyContent: "space-around",
    padding: 10
  },
  costInnView: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  costInnText: {
    fontSize: 16,
    fontFamily: "circular-book",
    paddingLeft: 10,
    paddingTop: 3
  },
  distanceView1: {
    padding: 10,
    justifyContent: "space-around"
  },
  distanceView2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -10
  },
  distanceBlackText: {
    fontSize: 18,
    fontFamily: "circular-book",
    color: "#4A4A4A"
  },
  distanceBlueText: {
    color: "#7960FF",
    fontSize: 18,
    fontFamily: "circular-book"
  },
  mainButtonStyle: {
    alignSelf: "center",
    marginTop: 0.23 * ScreenHeight
  }
};

const mapStateToProps = ({ customers }) => {
  const {

    rating,
    distance
  } = customers;
  return {

    rating,
    distance
  };
};

export default connect(
  mapStateToProps,
  {
    getFilterRating,
    getFilterDistance,
    resetFilter,
    getFilterSubmeet
  }
)(filter);
