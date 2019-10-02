import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  WebView,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  Keyboard
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Header from "../../Common/Header";
import {
  getInputWalletAmount,
  addBalanceRequest,
  getWalletPaymentId,
  paymentSuccessOk,
  getWalletAmount,
  shareReferal,
  referalToCustomer,
  closePaymentPage
} from "../../actions";
import { SUCCESS, BITMAP2 } from "../../images";
import {paymentAmount} from '../../config'

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Wallet extends Component {
  componentWillMount() {

    this.props.getWalletAmount();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

  }
  state ={keyboardSpace:ScreenHeight}
  _keyboardDidShow(e) {
this.setState(()=>{keyboardSpace:e.endCoordinates.height})
}

_keyboardDidHide() {

this.setState(()=>{keyboardSpace:0})
}
  componentWillUnmount() {
    this.props.closePaymentPage();
    this.keyboardDidShowListener.remove();
   this.keyboardDidHideListener.remove();

  }
  render() {

    const htmls =
      `
    <div style="text-align:center;">
    <img src="http://ilifenetwork.com/api/web/icon2.png" style="display: inline-block; height:30%; width:70%; ">
    <button id="rzp-button1" style="width:50%; background-Color:#7960FF; color:#fff; font-Size:50; border-Radius:30px; margin-Top:20%;">Pay</button>
    </div>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
    var options = {
        "key": "rzp_live_nkpgAouOwojYJs", // Enter the Key ID generated from the Dashboard
        "amount": "29935", // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
        "currency": "INR",
        "name": "Velway Partner",
        "description": "Prompt breakdown service at your finger tip",
        "image": "http://ilifenetwork.com/api/web/icon2.png",
        "order_id": "` +
      this.props.WalletOrderId +
      `",
        "handler": function (response){
           window.postMessage(response.razorpay_payment_id);
        },
        "prefill": {
            "name": "`+ this.props.userData.userFullName +`",
            "email": "`+ this.props.userData.userEmail +`"
        },
        "notes": {
            "address": "note value"
        },
        "theme": {
            "color": "#7960FF"
        },
        "modal":{
          "backdropclose": "true",
          "handleback":"false"
        }
    };
    var rzp1 = new Razorpay(options);
    document.getElementById('rzp-button1').onclick = function(e){
        rzp1.open();
        e.preventDefault();
    }
    </script>
    `;

    return (
      <ScrollView
        style={{
          backgroundColor: "white",

          opacity: this.props.successPaymentModal ? 0.3 : 1
        }}
      >
        <Header headerText="Wallet" />
        {this.props.WalletOrderId ? (
          <WebView
            source={{ html: htmls }}
            javaScriptEnabled={true}
            injectedJavaScript={`(function() {
                                    var originalPostMessage = window.postMessage;

                                    var patchedPostMessage = function(message, targetOrigin, transfer) {
                                      originalPostMessage(message, targetOrigin, transfer);
                                    };

                                    patchedPostMessage.toString = function() {
                                      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
                                    };

                                    window.postMessage = patchedPostMessage;
                                  })();`}
            onMessage={event => {
              this.props.getWalletPaymentId(
                decodeURI(decodeURI(event.nativeEvent.data))
              );
            }}
            style={{height:this.state.keyboardSpace}}
            scrollEnabled={true}
          />
        ) : (
          <KeyboardAwareScrollView enableOnAndroid style={{ flex: 1 }}>
          <TouchableOpacity
              onPress={()=>{
                Actions.history();
              }}
              style={{height:40,width:40,margin:20,alignSelf:'flex-end'}}>
          <Image style={{height:40,width:40}} source={{uri:'http://ilifenetwork.com/api/web/history.png'}} />
          </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 0.2 * ScreenHeight
              }}
            >

              <View
                style={{
                  borderColor: "#7960FF",
                  borderWidth: 5,
                  width: 0.5 * ScreenWidth,
                  height: 0.5 * ScreenWidth,
                  borderRadius: ScreenHeight,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontFamily: "circular-book",
                    color: "#7960FF",
                    borderRadius: 100,
                    alignSelf: "center",
                    fontSize: 16
                  }}
                >
                  Available Points{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "circular-book",
                    fontSize: 40,
                    color: "#7960FF",
                    alignSelf: "center"
                  }}
                >
                  {this.props.walletBalance}
                </Text>
              </View>
            </View>
            <Dropdown
                label='Select a Plan'
                data={paymentAmount}
                containerStyle={{width:'74%',alignSelf: "center"}}
                itemTextStyle={{fontFamily:'circular-bold',fontSize:16}}
                pickerStyle={{height:'25%'}}
                baseColor={'rgba(0, 0, 0,1)'}
                onChangeText={(value,index)=>{
                  this.props.getInputWalletAmount(index);
                }}
              />
            <TouchableHighlight
              disabled={this.props.walletAmount ? false : true}
              onPress={() => {
                this.props.addBalanceRequest();
              }}
              underlayColor="white"
              style={{
                marginTop: 10,
                alignSelf: "center",
                backgroundColor: "#7960FF",
                height: 44,
                width: 0.78 * ScreenWidth,
                borderRadius: 25,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center",
                opacity: this.props.walletAmount ? 1 : 0.6
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
                  fontFamily: "circular-book",
                  color: "white"
                }}
              >
                {this.props.loadingAddBalace ? "Loading..." : "Add Balance"}
              </Text>
            </TouchableHighlight>
            <Text
              style={{
                marginTop: 0.07 * ScreenHeight,
                padding: 10,
                fontSize: 22,
                fontFamily: "circular-bold",
                alignSelf:'center'
              }}
            >
            Refer & Earn
            </Text>
            <TouchableHighlight
              onPress={() => {this.props.shareReferal()}}
              underlayColor="white"
              style={{
                alignSelf: "center",
                backgroundColor: "#ffffff",
                height: 44,
                width: 0.78 * ScreenWidth,
                borderRadius: 25,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center",
                borderColor: "#7960FF",
                borderWidth: 1,
                marginTop:20
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
                  fontFamily: "circular-book",
                  color: "#7960FF"
                }}
              >
                Refer a Workshop
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {this.props.referalToCustomer()}}
              underlayColor="white"
              style={{
                alignSelf: "center",
                backgroundColor: "#ffffff",
                height: 44,
                width: 0.78 * ScreenWidth,
                borderRadius: 25,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center",
                borderColor: "#7960FF",
                borderWidth: 1,
                marginTop:5
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
                  fontFamily: "circular-book",
                  color: "#7960FF"
                }}
              >
                Refer a Customer
              </Text>
            </TouchableHighlight>
          </KeyboardAwareScrollView>
        )}
        <Modal
          visible={this.props.successPaymentModal}
          animationType="slide"
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
          transparent={true}
          opacity={0.5}
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              width: 0.8 * ScreenWidth,
              height: 0.45 * ScreenHeight,
              marginTop: 0.3 * ScreenHeight,
              alignSelf: "center",
              borderRadius: 10,
              justifyContent: "space-between",
              padding: 10,
              borderWidth:1,
              borderColor:'#7960FF'
            }}
          >
            <Image
              style={{
                height: 0.15 * ScreenHeight,
                width: 0.45 * ScreenWidth,
                alignSelf: "center",
                margin: 5,
                resizeMode: "contain",
                tintColor: "#7960FF"
              }}
              source={SUCCESS}
            />
            <Text
              style={{
                fontFamily: "circular-book",
                alignSelf: "center",
                fontSize: 16
              }}
            >
              Your Payment is
            </Text>
            <Text
              style={{
                fontFamily: "circular-bold",
                alignSelf: "center",
                fontSize: 20
              }}
            >
              SUCCESS
            </Text>
            <Text
              style={{
                fontFamily: "circular-book",
                alignSelf: "center",
                fontSize: 16
              }}
            >
              Payment id :
            </Text>
            <Text
              style={{
                fontFamily: "circular-bold",
                alignSelf: "center",
                fontSize: 20
              }}
            >
              {this.props.paymentId ? this.props.paymentId : null}
            </Text>
            <TouchableHighlight
              onPress={() => {
                this.props.paymentSuccessOk();
              }}
              underlayColor="white"
              style={{
                marginTop: 0.05 * ScreenHeight,
                alignSelf: "center",
                backgroundColor: "#7960FF",
                height: 44,
                width: 0.74 * ScreenWidth,
                borderRadius: 25,
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
                  fontFamily: "circular-book",
                  color: "white"
                }}
              >
                OK
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ vendors, user }) => {
  const {
    walletAmount,
    loadingAddBalace,
    WalletOrderId,
    paymentId,
    successPaymentModal,
    walletBalance
  } = vendors;
  const { userData } = user;
  return {
    walletAmount,
    loadingAddBalace,
    WalletOrderId,
    userData,
    paymentId,
    successPaymentModal,
    walletBalance
  };
};

export default connect(
  mapStateToProps,
  {
    getInputWalletAmount,
    addBalanceRequest,
    getWalletPaymentId,
    paymentSuccessOk,
    getWalletAmount,
    shareReferal,
    referalToCustomer,
    closePaymentPage
  }
)(Wallet);
