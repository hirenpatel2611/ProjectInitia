import React, {Component} from 'react';
import {Text,
        View,
        Dimensions
      } from 'react-native';
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import List from "../../Common/List";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class MessageToNearbyMechanic extends Component {
    render(){
      return(
        <View>
          <Header headerText="Message To Near by Mechanic"/>
          <View style={{
            height:0.81 * ScreenHeight,
          }}>
            <List />
          </View>
          <Footer />
        </View>
      );
    }
}

export default MessageToNearbyMechanic;
