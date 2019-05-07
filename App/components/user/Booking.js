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
  Animated,
  AsyncStorage,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./usermapsStyle";
import Header from "../../Common/Header";
import { getBookings, getDistanceList} from "../../actions";
import {BookingList,FutureBookingList} from "../../Common";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let isVandor;

class Booking extends Component {
  async componentWillMount() {
    const valueIsvendor = await AsyncStorage.getItem("is_vendor");
    isVandor=await AsyncStorage.getItem("is_vendor");
      this.props.getBookings();

  }
 renderBookingList() {
      if (this.props.vendorList.length) {
        if(isVandor === "1"){
        return this.props.vendorList.map(vendorsList => (
          <FutureBookingList key={vendorsList.booking_id} vendor={vendorsList.customer} />
        ));
        }else {
          return this.props.vendorList.map(vendorsList => (
            <BookingList key={vendorsList.booking_id} vendor={vendorsList.vendor} />
          ));
        }
      }
    }


  render() {
    const { containerStyle } = styles;
    return (
      <View>
        <Header headerText="Booking" />
        <ScrollView
          style={inStyle.ScrollViewStyle}
        >
          {this.props.loadingBookigList ? (
            <Text style={inStyle.textLoading}>
              Loading...
            </Text>
          ) : this.props.isBookingListFail ? (
            <TouchableOpacity
              style={inStyle.buttonReload}
              onPress={() => {
                this.props.getBookings();
              }}
            >
              <Text>Reload</Text>
            </TouchableOpacity>
          ) : (
            this.renderBookingList()
          )}
        </ScrollView>
      </View>
    );
  }
}
const inStyle ={
  ScrollViewStyle:{
    height: 0.88 * ScreenHeight,
    paddingTop: 7,
    paddingBottom: 10,
    marginBottom: 35
  },
  textLoading:{
    alignSelf: "center",
    paddingTop: 20
  },
  buttonReload:{
    alignSelf: "center",
    paddingTop: 20
  }
};
const mapStateToProps = ({ usermaps }) => {
  const { loadingBookigList, vendorList, isBookingListFail,vendorDistanceList } = usermaps;
  return {
    loadingBookigList,
    vendorList,
    isBookingListFail,
    vendorDistanceList
  };
};

export default connect(
  mapStateToProps,
  {
    getBookings,
    getDistanceList
  }
)(Booking);
