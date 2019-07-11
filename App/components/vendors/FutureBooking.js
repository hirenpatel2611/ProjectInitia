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
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./vendorStyle";
import Header from "../../Common/Header";
import {
  getFutureBookings,
  getCustomerDistanceList,
  getBookingModal,
  getBookingUpdate,
  connectTosocketApprov,
  otpDone,
  connectTosocketBookingCancle,
  BookingListApprove,
  BookingListCancle,
  getCancleBookingModal,
  getReasonCheckboxVendor,
  getCancelBookingModalCloseVendor,
  startMapVendor,
  socketBookingCompleted,
  getCustomerRating,
  getCustomerRatingModal,
  getRatingToCustomer
} from "../../actions";
import { FutureBookingList, Spinner } from "../../Common";
import { CALL, BITMAP2 } from "../../images";
import call from "react-native-phone-call";
import CheckBox from "react-native-check-box";
import {TaskManager} from 'expo';
import { Rating, AirbnbRating } from "react-native-ratings";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let isVandor;
const LOCATION_TASK_NAME1 = "background-location-task-current";
class FutureBooking extends Component {
  componentDidMount() {
    this.props.getFutureBookings();

  }
calltocutomer()
  {
          const args = {
        number: this.props.bookUserData?this.props.bookUserData.userMobileno: 0,
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
      }

      call(args).catch(console.error)
  }
  render() {
    const { containerStyle } = styles;
    return (
      <View style={{opacity: this.props.isBooking || this.props.isMechanicOtp || this.props.modalCustomerRating || this.props.isConfirmModal?0.5:1}}>
        <Header headerText="Booking" />
        <ScrollView style={inStyle.ScrollViewStyle}>
          {this.props.isFutureBookingNoFound?<Text style={{ fontFamily: "circular-bold", alignSelf: "center",marginTop:0.40*ScreenHeight}}>  No booking found</Text>:this.props.loadingFutureBookigList ? (
            <View style={{height:0.80*ScreenHeight,justifyContent:'center',alignSelf:'center'}}><Spinner /></View>
          ) : (

            <FlatList
              data={this.props.FutureBookingList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    margin: 5,
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 4,
                    justifyContent: "space-around",
                    shadowColor: "#000000",
                    shadowOffset: { width: 0, height: 3 },
                    shadowRadius: 5,
                    shadowOpacity: 0.5
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
                        fontSize: 20,
                        color: "#4A4A4A",
                      }}
                    >
                      {item.customer.first_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#7960FF",
                        fontFamily: "circular-book"
                      }}
                    >
                      Dist.({item.customer.distance?item.customer.distance:0})
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
                        fontSize: 16,
                        color: "#4A4A4A",
                        fontFamily: "circular-book"
                      }}
                    >
                      {item.customer.mobile}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#4A4A4A",
                        fontFamily: "circular-book"
                      }}
                    >
                      {item.booking_otp}
                    </Text>


                    <Text
                      style={{
                        fontFamily: "circular-bold",
                        fontSize: 14,
                        color: "#7960FF"
                      }}
                    >
                      Status :{item.status}

                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10
                    }}
                  >
                  <View style={{width:140}}>
                  <Text
                      style={{
                        fontSize: 10,
                        color: "#7960FF",
                        fontFamily: "circular-book",
                        top:4
                      }}
                      numberOfLines= {1}
                      ellipsizeMode="tail"
                    >
                      {item.customer.email}
                    </Text>
                    </View>

                  </View>
                  {item.status === 'cancle' || item.status === 'completed'?null
                  :<View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 0.85 * ScreenWidth,
                      marginTop:5
                    }}
                  >
                  <TouchableOpacity
                    style={{
                      width: 75,
                      height: 28,
                      backgroundColor: "#7960FF",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      opacity: item.booking_otp
                        ? 1
                        : 0
                    }}
                    disabled={item.booking_otp? false
                      : true}
                    onPress={() => {
                      var startMapData = {
                        booking_id: item.booking_id,
                        customer_id:item.customer.customer_id,
                        otp:item.booking_otp
                      }
                      item.status === "reached"?
                      this.props.getCustomerRatingModal(item):
                     this.props.startMapVendor(startMapData)

                    }}

                  >

                      <Text
                        style={{
                          color: "white",
                          fontFamily:'circular-book',
                          fontSize:14
                        }}
                      >
                        {item.status === "reached"?'complete': this.props.loadingStartMap?'Loading...':'Start Map'}
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 70,
                      height: 28,
                      backgroundColor: "#7960FF",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      opacity: item.booking_otp
                        ? 1
                        : 0
                    }}
                    disabled={item.booking_otp? false
                      : true}
                    onPress={() => {
                      this.props.otpDone(item.booking_otp);
                    }}
                  >
                      <Text
                        style={{
                          color: "white",
                          fontFamily:'circular-book',
                          fontSize:14
                        }}
                      >
                        Share
                      </Text>
                  </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignSelf: "flex-end",
                        opacity: item.status === "pending" ? 1 : 0
                      }}
                      disabled={item.status === "pending" ? false : true}
                      onPress={() => {
                        var data ={
                          booking_id:item.booking_id,
                          customer_id:item.customer.customer_id
                        }
                        this.props.BookingListApprove(data);

                      }}
                    >
                      <View
                        style={{
                          width: 70,
                          height: 28,
                          backgroundColor: "#4EA352",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 3
                        }}
                      >
                        <Text
                          style={{
                            color: "white"
                          }}
                        >
                          {this.props.loadingBookigUpdate?'Loading...':'Approve'}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        alignSelf: "flex-end",
                        opacity:
                          item.status === "cancle" ||
                          item.status === "completed"
                            ? 0
                            : 1
                      }}
                      disabled={
                        item.status === "cancle" ||
                        item.status === "completed"
                          ? true
                          : false
                      }
                      onPress={() => {
                        var cancleBookingData = {
                          booking_id: item.booking_id,
                          customer_id: item.customer.customer_id
                        };
                        this.props.getCancleBookingModal(cancleBookingData);
                      }}
                    >
                      <View
                        style={{
                          width: 70,
                          height: 28,
                          backgroundColor: "#D35400",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 3
                        }}
                      >
                        <Text
                          style={{
                            color: "white"
                          }}
                        >
                          Cancel
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>}
                </View>
              )}
            />
          )}
          <Modal
            visible={this.props.isBooking}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={1}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: ScreenHeight,
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(100,100,100, 0.5)",
                height: ScreenHeight
              }}
            >
              <View
                style={{
                  marginTop: 0.3 * ScreenHeight,
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
                <Image
                  style={{ height: 130, width: 100, alignSelf: "center" }}
                  source={BITMAP2}
                />
                <Text
                  style={{
                    fontFamily: "circular-bold",
                    fontSize: 20,
                    color: "#4A4A4A",
                    padding: 10,
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                >
                  You Have a Booking.
                </Text>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    margin: 15
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
                      {this.props.bookUserData
                        ? this.props.bookUserData.userFullName
                        : null}
                    </Text>
                    <TouchableOpacity
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row"
                      }}
                      onPress={() => {
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
                        {this.props.bookUserData
                          ? this.props.bookUserData.userMobileno
                          : null}
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
                      {
                        this.props.customerDistance?this.props.customerDistance:0
                      }
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    margin: 15
                  }}
                >
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={async () => {
                      var status = "accept";
                      await this.props.getBookingUpdate(status);
                      this.props.connectTosocketApprov(
                        this.props.bookUserData.userId
                      );
                    }}
                  >
                    <View
                      style={{
                        width: 80,
                        height: 28,
                        backgroundColor: "#4EA352",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 3
                      }}
                    >
                      <Text
                        style={{
                          color: "white"
                        }}
                      >
                        {this.props.loadingBookigUpdate
                          ? "loading..."
                          : "Approve"}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      var cancleBookingData = {
                        booking_id: this.props.bookingData.booking_id,
                        customer_id: this.props.bookUserData.userId
                      };
                      this.props.getCancleBookingModal(cancleBookingData);
                    }}
                  >
                    <View
                      style={{
                        width: 80,
                        height: 28,
                        backgroundColor: "#D35400",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 3
                      }}
                    >
                      <Text
                        style={{
                          color: "white"
                        }}
                      >
                        Cancel
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={this.props.isMechanicOtp}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={1}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: ScreenHeight,
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(100,100,100, 0.5)",
                height: ScreenHeight
              }}
            >
              <View
                style={{
                  marginTop: 0.3 * ScreenHeight,
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
                <Text
                  style={{
                    fontFamily: "circular-bold",
                    fontSize: 20,
                    color: "#4A4A4A",
                    padding: 10,
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                >
                  Your OTP for Mechanic.
                </Text>
                <Text
                  style={{
                    fontFamily: "circular-bold",
                    fontSize: 20,
                    color: "#4A4A4A",
                    padding: 10,
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                >
                  {this.props.mechanicOTP ? this.props.mechanicOTP : null}
                </Text>
                <View style={{
                  flexDirection:'row',
                  justifyContent:'space-around'
                }}>
                {this.props.mechanicBookedData?null:<TouchableOpacity
                  style={{
                  width: 0.3 * ScreenWidth,
                  height: 28,
                  backgroundColor: "#7960FF",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3
                 }}
                  onPress={() => {
                    var startMapData = {
                      booking_id: this.props.bookingData.booking_id,
                      customer_id:this.props.bookingData.customer_id,
                      vendor_id:this.props.bookingData.vendor_id,
                      otp:this.props.mechanicOTP
                    }
                   this.props.startMapVendor(startMapData);
                  }}
                >
                    <Text
                      style={{
                        color: "white"
                      }}
                    >
                      {this.props.loadingStartMap?'Loading...':'Start Map'}
                    </Text>
                </TouchableOpacity>}
                <TouchableOpacity
                  style={{
                  width: 0.3 * ScreenWidth,
                  height: 28,
                  backgroundColor: "#7960FF",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3
                 }}
                  onPress={() => {
                    this.props.otpDone(this.props.mechanicOTP);
                  }}
                >
                    <Text
                      style={{
                        color: "white"
                      }}
                    >
                      Share
                    </Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={this.props.isConfirmModal}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={inStyle.modalStyle}
          >
            <View
              style={{
                backgroundColor: "rgba(100,100,100, 0.5)",
                height: ScreenHeight
              }}
            >
              <View
                style={{
                  marginTop: 0.4 * ScreenHeight,
                  alignSelf: "stretch",
                  backgroundColor: "#FFFFFF",
                  height: 0.25 * ScreenHeight,
                  margin: 15,
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "space-around"
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 0.1 * ScreenWidth,
                    alignSelf: "flex-end"
                  }}
                  onPress={() => {
                    this.props.getCancelBookingModalCloseVendor();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: "circular-bold",
                      alignSelf: "flex-end",
                      color: "#7960FF",
                      width: 0.1 * ScreenWidth
                    }}
                  >
                    x
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "circular-bold",
                    alignSelf: "center"
                  }}
                >
                  Reason of Cancel
                </Text>
                <CheckBox
                  isChecked={this.props.reasonCheckboxVendor[0]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="I am on another call."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckboxVendor(0);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckboxVendor[1]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="Customer is not done good deal."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckboxVendor(1);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckboxVendor[2]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="Today I m not Present."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckboxVendor(2);
                  }}
                />
                <TouchableOpacity
                  disabled={this.props.confirmDisableVendor ? false : true}
                  style={{
                    alignSelf: "center",
                    opacity: this.props.confirmDisableVendor ? 1 : 0.5,
                    backgroundColor: "#7960FF",
                    width: 0.4 * ScreenWidth,
                    borderRadius: 5,
                    alignItems: "center",
                    margin: 10,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  activeOpacity={1}
                  underlayColor="white"
                  onPress={() => {
                    this.props.BookingListCancle();
                  }}
                >
                  {this.props.loadingConfirm ? (
                    <Text style={inStyle.modalButtonCancleText}>
                      Loading...
                    </Text>
                  ) : (
                    <Text style={inStyle.modalButtonCancleText}>Confirm</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            visible={this.props.modalCustomerRating}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            opacity={0.5}
            style={inStyle.modalStyle}
          >
          <View style={{
            marginTop: 0.4 * ScreenHeight,
            alignSelf: "center",
            backgroundColor: "#FFFFFF",
            height: 0.25 * ScreenHeight,
            margin: 15,
            borderRadius: 10,
            padding: 10,
            justifyContent: "space-around"
          }}>
          <Text style={{fontFamily:'circular-book',alignSelf:'center',margin:0.01 * ScreenHeight}}>
          Rating for Customer
          </Text>
              <AirbnbRating
                type="star"
                ratingBackgroundColor="transparent"
                imageSize={25}
                defaultRating={this.props.customerRating}
                showRating={false}
                onFinishRating={rating => {
                  this.props.getCustomerRating(rating);
                }}
              />
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  backgroundColor: "#7960FF",
                  width: 0.4 * ScreenWidth,
                  borderRadius: 5,
                  alignItems: "center",
                  margin: 10,
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                activeOpacity={1}
                underlayColor="white"
                onPress={() => {
                  this.props.getRatingToCustomer();
                }}
              >
                  <Text style={inStyle.modalButtonCancleText}>{this.props.loadingRating ?'Loading...':'Done'}</Text>
              </TouchableOpacity>
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
  },
  modalButtonCancle: {
    backgroundColor: "#7960FF",
    height: 25,
    width: 70,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  modalButtonCancleText: {
    fontSize: 14,
    fontFamily: "circular-bold",
    color: "white"
  },
  modalStyle: {
    height: 0.2 * ScreenHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  }
};
const mapStateToProps = ({ vendors }) => {
  const {
    loadingFutureBookigList,
    isFutureBookingListFail,
    vendorBookingList,
    FutureBookingList,
    isBooking,
    bookingData,
    mechanicOTP,
    isMechanicOtp,
    loadingBookigUpdate,
    bookUserData,
    cancleBookingId,
    reasonCheckboxVendor,
    cancleReasonVendor,
    isConfirmModal,
    confirmDisableVendor,
    loadingConfirm,
    isFutureBookingNoFound,
    customerDistance,
    loadingStartMap,
    modalCustomerRating,
    customerRating,
    loadingRating
  } = vendors;
  return {
    loadingFutureBookigList,
    isFutureBookingListFail,
    vendorBookingList,
    FutureBookingList,
    isBooking,
    bookingData,
    mechanicOTP,
    isMechanicOtp,
    loadingBookigUpdate,
    bookUserData,
    cancleBookingId,
    isConfirmModal,
    reasonCheckboxVendor,
    cancleReasonVendor,
    confirmDisableVendor,
    loadingConfirm,
    isFutureBookingNoFound,
    customerDistance,
    loadingStartMap,
    modalCustomerRating,
    customerRating,
    loadingRating
  };
};

export default connect(
  mapStateToProps,
  {
    getFutureBookings,
    getCustomerDistanceList,
    getBookingModal,
    getBookingUpdate,
    connectTosocketApprov,
    otpDone,
    connectTosocketBookingCancle,
    BookingListApprove,
    BookingListCancle,
    getCancleBookingModal,
    getReasonCheckboxVendor,
    getCancelBookingModalCloseVendor,
    startMapVendor,
    socketBookingCompleted,
    getCustomerRating,
    getCustomerRatingModal,
    getRatingToCustomer
  }
)(FutureBooking);
