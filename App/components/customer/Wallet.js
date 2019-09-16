import React,{Component} from 'react';
import {View,Text,Dimensions,TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { shareCustomerReferal } from "../../actions";
import Header from "../../Common/Header";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
class Wallet extends Component {
  render(){
    return(
      <View style={inStyle.ContainerStyle}>
      <Header headerText="Referral Wallet" />
      <KeyboardAwareScrollView enableOnAndroid style={{ flex: 1 }}>
      <View style={{height:0.90*ScreenHeight,justifyContent:'space-around'}}>
        <View
          style={inStyle.ringContainor}
        >
          <Text
            style={inStyle.ringHeaderText}
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
            100
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => {this.props.shareCustomerReferal()}}
          underlayColor="white"
          style={{
            top:'3%',
            alignSelf: "center",
            backgroundColor: "#ffffff",
            height: 44,
            width: '78%',
            borderRadius: 25,
            alignItems: "center",
            marginBottom: 10,
            justifyContent: "center",
            borderColor: "#7960FF",
            borderWidth: 1,
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
            Refer Someone
          </Text>
        </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}

const inStyle = {
  ContainerStyle: {
    backgroundColor: "white",
    flex: 1,
    height:'100%'
  },
  ringContainor: {
    borderColor: "#7960FF",
    borderWidth: 5,
    width: 0.5 * ScreenWidth,
    height: 0.5 * ScreenWidth,
    borderRadius: ScreenHeight,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center',
    marginTop:0.07 * ScreenHeight,

  },
  ringHeaderText : {
    fontFamily: "circular-book",
    color: "#7960FF",
    borderRadius: 100,
    alignSelf: "center",
    fontSize: 16
  }

};

const mapStateToProps = ({ customers, user }) => {
  const {
bookData
  } = customers;
  const { userData } = user;
  return {
    bookData,
    userData
  };
};

export default connect(
  mapStateToProps,
  {
    shareCustomerReferal
  }
)(Wallet);
