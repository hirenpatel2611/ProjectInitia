import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Platform,
  Animated,
  AsyncStorage,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./vendorStyle";
import Header from "../../Common/Header";
import { getFutureBookings, getCustomerDistanceList,getBookingModal,getBookingApprove } from "../../actions";
import { FutureBookingList } from "../../Common";
import { CALL,BITMAP2 } from "../../images";
import call from 'react-native-phone-call'

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let isVandor;

class FutureBooking extends Component {
  componentWillMount() {
    this.props.getFutureBookings();
  }
  calltocutomer(){
    const args = {
                  number: '9173511807', // String value with the number to call
                  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
                  }

    call(args).catch(console.error)
  }
  renderBookingList() {
    if (this.props.FutureBookingList.length) {
      return this.props.FutureBookingList.map(vendorBookingList => (
        <FutureBookingList
          key={vendorBookingList.booking_id}
          customer={vendorBookingList.customer}
        />
      ));
    }
  }

  render() {
    const { containerStyle } = styles;
    return (
      <View>
        <Header headerText="Booking" />
        <ScrollView style={inStyle.ScrollViewStyle}>
          {this.props.loadingFutureBookigList ? (
            <Text style={inStyle.textLoading}>Loading...</Text>
          ) : this.props.isFutureBookingListFail ? (
            <TouchableOpacity
              style={inStyle.buttonReload}
              onPress={() => {
                this.props.getFutureBookings();
              }}
            >
              <Text>Reload</Text>
            </TouchableOpacity>
          ) : (
            this.renderBookingList()
          )}
          <Modal
            visible={false}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={1}
            style={{
              justifyContent:'center',
              alignItems:'center',
              height:ScreenHeight,
              backgroundColor: "rgba(0,0,0,0.9)"
            }}
          >
          <View
            style={{
              marginTop:0.40*ScreenHeight,
              alignSelf: "center",
              width: 0.95 * ScreenWidth,
              backgroundColor: "#FFFFFF",
              padding: 10,
              borderRadius: 4,
              justifyContent: "space-around",
              flexDirection: "row",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
              shadowOpacity: 0.5
            }}
          >
            <View
              style={{
                justifyContent: "space-around"
              }}
            >
              <Text
                style={{
                  fontFamily: "circular-bold",
                  fontSize: 20,
                  color: "#4A4A4A"
                }}
              >
                Name
              </Text>
              <TouchableOpacity
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: 0.3 * ScreenWidth
                }}
                onPress={()=>{
                  this.calltocutomer();
                }}
              >
                <Text
                  style={{
                    fontFamily: "circular-book",
                    fontSize: 16,
                    color: "#4A4A4A",
                    marginTop: 3
                  }}
                >
                  9601944914
                </Text>
                <Image
                  style={{ height: 20, width: 20, borderRadius: 10 }}
                  source={CALL}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "space-around"
              }}
            >
              <Text
                style={{
                  fontFamily: "circular-book",
                  fontSize: 16,
                  color: "#4A4A4A"
                }}
              >
                Distance
              </Text>
              <Text
                style={{
                  fontFamily: "circular-book",
                  fontSize: 16,
                  color: "#7960FF"
                }}
              >
                10 km
              </Text>
            </View>
          </View>
          </Modal>
          <Modal
            visible={this.props.isBooking}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={1}
            style={{
              justifyContent:'center',
              alignItems:'center',
              height:ScreenHeight,
              backgroundColor: "rgba(0,0,0,0.5)"

            }}
          >
          <View
            style={{
              marginTop:0.37*ScreenHeight,
              alignSelf: "center",
              width: 0.85 * ScreenWidth,
              backgroundColor: "#FFFFFF",
              padding: 10,
              borderRadius: 4,
              justifyContent: "space-between",
              flexDirection: "column",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
              shadowOpacity: 0.5
            }}
          >
          <Image style={{height:130, width:100,alignSelf:'center'}} source={BITMAP2} />
          <Text
            style={{
              fontFamily: "circular-bold",
              fontSize: 20,
              color: "#4A4A4A",
              padding:10,
              alignSelf:'center',
              marginBottom:10
            }}
          >
            You Have a Booking.
          </Text>
          <View style={{
            justifyContent: "space-between",
            flexDirection: "row",
            margin:15
          }}>
            <View
              style={{
                justifyContent: "space-around"
              }}
            >
              <Text
                style={{
                  fontFamily: "circular-bold",
                  fontSize: 20,
                  color: "#4A4A4A"
                }}
              >
                Name
              </Text>
              <TouchableOpacity
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
                onPress={()=>{
                  this.calltocutomer();
                }}
              >
                <Text
                  style={{
                    fontFamily: "circular-book",
                    fontSize: 16,
                    color: "#4A4A4A",
                    marginTop: 3
                  }}
                >
                  9601944914
                </Text>
                <Image
                  style={{ height: 20, width: 20, borderRadius: 10 }}
                  source={CALL}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "space-around"
              }}
            >
              <Text
                style={{
                  fontFamily: "circular-book",
                  fontSize: 16,
                  color: "#4A4A4A"
                }}
              >
                Distance
              </Text>
              <Text
                style={{
                  fontFamily: "circular-book",
                  fontSize: 16,
                  color: "#7960FF"
                }}
              >
                10 km
              </Text>
            </View>
            </View>
            <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin:15
            }}
            >
            <TouchableOpacity
            style={{alignSelf:'flex-end'}}
            onPress={()=>{
              this.props.getBookingApprove();
            }}
            >
              <View
              style={{
                width:80,
                height:28,
                backgroundColor:'#4EA352',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:3
              }}

              >
                <Text style={{
                  color:'white'
                }}>
                Approv
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            style={{alignSelf:'flex-end'}}
              onPress={()=>{this.props.getBookingModal(false)}}
            >
              <View
              style={{
                width:80,
                height:28,
                backgroundColor:'#D35400',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:3
              }}

              >
                <Text style={{
                  color:'white'
                }}>
                Cancel
                </Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}
const inStyle = {
  ScrollViewStyle: {
    height: 0.88 * ScreenHeight,
    paddingTop: 7,
    paddingBottom: 10,
    marginBottom: 35,
    paddingRight: 5,
    paddingLeft: 5
  },
  textLoading: {
    alignSelf: "center",
    paddingTop: 20
  },
  buttonReload: {
    alignSelf: "center",
    paddingTop: 20
  }
};
const mapStateToProps = ({ vendors }) => {
  const {
    loadingFutureBookigList,
    isFutureBookingListFail,
    vendorBookingList,
    FutureBookingList,
    isBooking
  } = vendors;
  return {
    loadingFutureBookigList,
    isFutureBookingListFail,
    vendorBookingList,
    FutureBookingList,
    isBooking
  };
};

export default connect(
  mapStateToProps,
  {
    getFutureBookings,
    getCustomerDistanceList,
    getBookingModal,
    getBookingApprove
  }
)(FutureBooking);
