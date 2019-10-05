import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import { FILTER, MENU } from "../images";
import { Actions } from "react-native-router-flux";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
  const valueIsvendor = AsyncStorage.getItem("is_vendor");
const Header = props => {
  _deleteUser = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  return (
    <View style={styles.viewStyle}>

        <TouchableOpacity onPress={()=>{
          Actions.drawerOpen()
        }}>
          <Image
            style={{
              width: 25,
              height: 25,
              marginLeft:10,
              resizeMode: "contain",
             tintColor:'#7960FF'
            }}
            source={MENU}
          />
        </TouchableOpacity>


      <Text style={styles.textStyle}>{props.headerText}</Text>

      <TouchableOpacity style={{width:50}}
      onPress={props.filterPress}
      >
        <Image
          style={{
            borderRadius: 15,
            tintColor:'#7960FF',
            width: 30,
            height: 30,
            resizeMode: "contain"
          }}
          source={props.filterIcon}
        />
        <Text style={props.filterTextStyle}>{props.filterText}</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 16,
    padding: 10,
    fontWeight: "bold",
    fontFamily:'circular-book'
  },
  viewStyle: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    width: ScreenWidth,
    height:77,
    alignItems: "center",
    paddingTop:15,
    justifyContent:'space-between',
  //   shadowOffset: {
  //   width: 0,
  //   height: 2
  // },
  // shadowOpacity: 0.4,
  elevation: 2,
  },
};
export default Header;
