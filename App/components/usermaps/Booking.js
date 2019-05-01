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
import {
  getBookings,
} from "../../actions";
import BookingList from '../../Common/BookingList';


let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Booking extends Component {
  async componentWillMount() {
    this.props.getBookings();
  }
  renderBookingList(){
    if(this.props.vendorList.length){
      return this.props.vendorList.map(vendorsList=>
        <BookingList key={vendorsList.booking_id} vendor={vendorsList.vendor}/>
      );
    }
  }

  render() {
    const { containerStyle } = styles;
    return (
      <View>
        <Header headerText="Booking" />
        <ScrollView
        style={{
          height:0.88*ScreenHeight,
          paddingTop:10,
          marginBottom:35
        }}
        >
        {this.renderBookingList()}
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = ({ usermaps }) => {
  const {
    loadingBookigList,
    vendorList
  } = usermaps;
  return {
    loadingBookigList,
    vendorList
  };
};

export default connect(
  mapStateToProps,
  {
    getBookings,
  }
)(Booking);
