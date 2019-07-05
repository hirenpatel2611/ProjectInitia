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
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./customersStyle";
import Header from "../../Common/Header";
import { getBookings, getDistanceList} from "../../actions";
import {Spinner} from "../../Common";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let isVandor;

class Booking extends Component {
  async componentWillMount() {

      this.props.getBookings();

  }

  render() {
    const { containerStyle } = styles;
    return (
      <View>
        <Header headerText="Booking" />
        <ScrollView style={inStyle.ScrollViewStyle}>
        {this.props.bookingListFound?
          <Text style={{ fontFamily: "circular-bold", alignSelf: "center" }}>
            No booking found
          </Text>
          :null}
        {this.props.loadingBookigList?<Spinner />:
        <FlatList
         data={this.props.vendorList}
         keyExtractor={(item, index) => index.toString()}
         renderItem={({item}) => (
           <View
             style={inStyle.listMainView}
           >
             <View
               style={inStyle.viewMarginDirection}
             >
               <Text
                 style={inStyle.textFont18}
               >
                 {item.vendor.first_name}
               </Text>
               <Text style={inStyle.textFont18}>
               {item.status}
               </Text>
             </View>
             <View
               style={[
                 {marginTop: 10},
                 inStyle.viewMarginDirection
               ]}
             >
               <Text
                 style={inStyle.textFont14}
               >
                 {item.vendor.mobile}
               </Text>
             </View>
             <View
               style={inStyle.viewMarginDirection}
             >
               <Text
                 style={[inStyle.textFont14,{  color: "#7960FF",}]}
               >
                 {item.vendor.email}
               </Text>
             </View>
           </View>
         )}
         onEndReachedThreshold={10}
         />}
         </ScrollView>
      </View>
    );
  }
}
const inStyle ={
  ScrollViewStyle:{
    height: 0.88 * ScreenHeight,
    marginTop:5,
    paddingTop: 2,
    paddingBottom: 10,
    marginBottom: Platform.OS === 'android' ?0.1 * ScreenHeight:0,
  },
  textLoading:{
    alignSelf: "center",
    paddingTop: 20
  },
  buttonReload:{
    alignSelf: "center",
    paddingTop: 20
  },
  textFont18:{
    fontFamily: "circular-bold",
    fontSize: 18,
    color: "#4A4A4A",
  },
  textFont14:{
    fontFamily: "circular-bold",
    fontSize: 14,
    color: "#4A4A4A",
  },
  listMainView:{
    margin: 5,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-around"
  },
  viewMarginDirection:{
    flexDirection: "row",
    justifyContent: "space-between"
  }
};
const mapStateToProps = ({ customers }) => {
  const {
    loadingBookigList,
    vendorList,
    isBookingListFail,
    vendorDistanceList,
    bookingListFound
  } = customers

  return {
    loadingBookigList,
    vendorList,
    isBookingListFail,
    vendorDistanceList,
    bookingListFound
  };
};

export default connect(
  mapStateToProps,
  {
    getBookings,
    getDistanceList
  }
)(Booking);
