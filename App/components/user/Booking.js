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
import styles from "./usermapsStyle";
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
             style={{
               margin: 5,
               backgroundColor: "white",
               padding: 10,
               borderRadius: 5,
               justifyContent: "space-around"
             }}
           >
             <View
               style={{
                 flexDirection: "row",
                 justifyContent: "space-between"
               }}
             >
               <Text
                 style={{
                   fontFamily: "circular-bold",
                   fontSize: 18,
                   color: "#4A4A4A",
                   fontFamily: "circular-bold"
                 }}
               >
                 {item.vendor.first_name}
               </Text>
               <Text style={{
                 fontFamily: "circular-bold",
                 fontSize: 18,
                 color: "#4A4A4A",
                 fontFamily: "circular-bold"
               }}>
               {item.status}
               </Text>
             </View>
             <View
               style={{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 marginTop: 10
               }}
             >
               <Text
                 style={{
                   fontFamily: "circular-bold",
                   fontSize: 14,
                   color: "#4A4A4A",
                   fontFamily: "circular-book"
                 }}
               >
                 {item.vendor.mobile}
               </Text>
             </View>
             <View
               style={{
                 flexDirection: "row",
                 justifyContent: "space-between"
               }}
             >
               <Text
                 style={{
                   fontFamily: "circular-bold",
                   fontSize: 14,
                   color: "#7960FF",
                   fontFamily: "circular-book"
                 }}
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
  }
};
const mapStateToProps = ({ usermaps }) => {
  const {
    loadingBookigList,
    vendorList,
    isBookingListFail,
    vendorDistanceList,
    bookingListFound
  } = usermaps

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
