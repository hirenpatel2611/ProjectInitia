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
  getReasonCheckboxVendor
} from "../../actions";
import { FutureBookingList, Spinner } from "../../Common";
import { CALL, BITMAP2 } from "../../images";
import call from "react-native-phone-call";
import CheckBox from "react-native-check-box";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let isVandor;

class FutureBooking extends Component {
  componentDidMount() {
    this.props.getFutureBookings();
  }

  renderBookingList() {
    if (this.props.FutureBookingList.length) {
      return this.props.FutureBookingList.map(vendorBookingList => (
        <FutureBookingList
          key={vendorBookingList.booking_id}
          customer={vendorBookingList.customer}
          bookstatus={vendorBookingList.status}
          onPressApprove={() => {
            this.props.BookingListApprove(vendorBookingList.booking_id);
            this.props.connectTosocketApprov(
              vendorBookingList.customer.customer_id
            );
          }}
          onPressCancle={() => {
            var cancleBookingData = {
              booking_id: vendorBookingList.booking_id,
              customer_id: vendorBookingList.customer.customer_id
            };
            this.props.getCancleBookingModal(cancleBookingData);
          }}
          opacityApprove={vendorBookingList.status === "pending" ? 1 : 0}
          opacityCancle={vendorBookingList.status === "cancle" ? 0 : 1}
          disabledApprove={
            vendorBookingList.status === "pending" ? false : true
          }
          disabledCancle={vendorBookingList.status === "cancle" ? true : false}
        />
      ));
    } else {
      return this.props.loadingFutureBookigList ? (
        <Spinner />
      ) : (
        <Text style={{ fontFamily: "circular-bold", alignSelf: "center" }}>
          No booking found
        </Text>
      );
    }
  }

  render() {
    const { containerStyle } = styles;
    return (
      <View>
        <Header headerText="Booking" />
        <ScrollView style={inStyle.ScrollViewStyle}>
          {this.renderBookingList()}
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
                      10 km
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
                        {this.props.loadingBookigUpdate
                          ? "loading..."
                          : "Cancel"}
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
                  {this.props.mechanicOTP ? (
                    <Text>{this.props.mechanicOTP}</Text>
                  ) : null}
                </Text>
                <TouchableOpacity
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => {
                    this.props.otpDone();
                  }}
                >
                  <View
                    style={{
                      width: 0.78 * ScreenWidth,
                      height: 28,
                      backgroundColor: "#7960FF",
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
                      continue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            visible={this.props.isConfirmModal}
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
                  rightText="Mechanic is not responding on booking."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckboxVendor(0);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckboxVendor[1]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="Mechanic is not done good deal."
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onClick={() => {
                    this.props.getReasonCheckboxVendor(1);
                  }}
                />
                <CheckBox
                  isChecked={this.props.reasonCheckboxVendor[2]}
                  checkedCheckBoxColor="#7960FF"
                  rightText="I Choose better option."
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
                    opacity: this.props.confirmDisableVendor ? 1 : 0.5
                  }}
                  activeOpacity={1}
                  underlayColor="white"
                  onPress={() => {
                    this.props.BookingListCancle(
                      this.props.cancleBookingId.booking_id
                    );
                    this.props.connectTosocketBookingCancle(
                      this.props.cancleBookingId.customer_id
                    );
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#7960FF",
                      width: 0.4 * ScreenWidth,
                      borderRadius: 5,
                      alignItems: "center",
                      margin: 10,
                      padding: 5,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {this.props.loadingBookig ? (
                      <Text style={inStyle.modalButtonCancleText}>
                        Loading...
                      </Text>
                    ) : (
                      <Text style={inStyle.modalButtonCancleText}>Confirm</Text>
                    )}
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
    confirmDisableVendor
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
    confirmDisableVendor
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
    getReasonCheckboxVendor
  }
)(FutureBooking);
