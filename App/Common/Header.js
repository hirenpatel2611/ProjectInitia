import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  AsyncStorage
} from "react-native";
import { FILTER, MENU } from "../images";
import { Actions } from "react-native-router-flux";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

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
      <View
        style={{
          width: 0.1 * ScreenWidth,
          alignSelf: "center",
          alignItems: "flex-start"
        }}
      >
        <TouchableOpacity onPress={props.onPressMenu}>
          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain"
            }}
            source={MENU}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={props.isModalVisible}
        styles={{
          marginTop: 20,
          width: 0.6 * ScreenWidth,
          padding: 10,
          height: 0.92*ScreenHeight,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 10
        }}
        animationType="fade"
        transparent={true}
        opacity={0.5}
      >
        <View
          style={{
            marginTop: 10,
            width: 0.6 * ScreenWidth,
            padding: 10,
            height: 0.92*ScreenHeight,
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity onPress={props.onPressMenuCancle}>
              <View
                style={{
                  backgroundColor: "#7960FF",
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  alignItems: "center",
                  marginLeft: 10,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  X
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 10
            }}
          />
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this._deleteUser();
                Actions.SplashFront();
              }}
              style={{ width: 0.4 * ScreenWidth }}
            >
              <View>
                <View
                  style={{
                    backgroundColor: "#7960FF",
                    height: 30,
                    width: 70,
                    borderRadius: 15,
                    alignItems: "center",
                    marginLeft: 10,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white"
                    }}
                  >
                    Logout
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.textStyle}>{props.headerText}</Text>
      <View
        style={{
          flex: 1,
          width: 0.2 * ScreenWidth,
          alignSelf: "center",
          alignItems: "flex-end"
        }}
      >
      <TouchableOpacity style={{width:50}}
      onPress={()=>Actions.filter()}
      >
        <Image
          style={{
            borderRadius: 15,
            borderColor: "#7960FF",
            width: 30,
            height: 30,
            resizeMode: "contain"
          }}
          source={FILTER}
        />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 16,
    padding: 10,
    fontWeight: "bold"
  },
  viewStyle: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    width: ScreenWidth,
    paddingTop: 26,
    position: "relative",
    alignItems: "flex-start"
  }
};
export default Header;
