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
import { Actions } from "react-native-router-flux";
import {
  getBookingUpdateUser,
  getVendorRating
} from "../../actions";
import styles from "./usermapsStyle";
import { Rating, AirbnbRating } from "react-native-ratings";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class customerRating extends Component {
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
          <View style={{marginTop: 0.40 * ScreenHeight}}>
            <Text style={{fontFamily:'circular-book',alignSelf:'center',margin:0.03 * ScreenHeight}}>
            Rating for vendor service
            </Text>
                <AirbnbRating
                  type="star"
                  ratingBackgroundColor="transparent"
                  imageSize={25}
                  defaultRating={this.props.vendorRating}
                  showRating={false}
                  onFinishRating={rating => {
                    console.log(rating);
                    this.props.getVendorRating(rating);
                  }}
                />

            <TouchableHighlight
              onPress={() => {
                var sts = 'completed'
                this.props.getBookingUpdateUser(sts)
              }}
              underlayColor="white"
              style={{alignSelf: "center",
              marginTop: 0.03 * ScreenHeight}}
            >
              <View style={continueButton}>
                <Text style={buttonText}>{this.props.loadingRatingDone?'loading...':'Done'}</Text>
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
  vendorRating,
  loadingRatingDone
  } = usermaps;
  return {
vendorRating,
loadingRatingDone
  };
};

export default connect(
  mapStateToProps,
  {
    getVendorRating,
    getBookingUpdateUser
  }
)(customerRating);
