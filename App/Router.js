import React, { Component } from "react";
import { View, TouchableOpacity, Text, AsyncStorage,Dimensions } from "react-native";
import { Scene, Router, ActionConst } from "react-native-router-flux";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import Login from "./components/login/Login";
import RegisterMobile from "./components/register/RegisterMobile";
import RegisterOTP from "./components/register/RegisterOTP";
import profile from "./components/register/Profile";
import SplashFront from "./components/splash/SplashFront";
import filter from "./components/usermaps/filter";
import NearbyGaraje from "./components/usermaps/NearbyGaraje";
import UserProfile from "./components/usermaps/Profile";
import Booking from "./components/usermaps/Booking";
import VendorHome from "./components/usermaps/VendorHome";
import { Actions } from "react-native-router-flux";
import { loadFont, updateLoggedInState, updateIsVendor } from "./actions";
import SideMenu from "./components/drawer/SideMenu";

import { connect } from "react-redux";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class RouterComponent extends Component {
  componentDidMount() {
    this.props.loadFont();
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const valueUserName = await AsyncStorage.getItem("token");
      const valueIsvendor = await AsyncStorage.getItem("is_vendor");

      if (valueUserName !== null) {
        if (valueIsvendor === "1") {
          this.props.updateIsVendor(true);
        } else {
          this.props.updateLoggedInState(true);
        }
      } else {
        this.props.updateLoggedInState(false);
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  render() {
    if (!this.props.fontLoaded) {
      return <View />;
    }

    return (
      <Router>
        <Scene
          key="root"
          transitionConfig={() => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal
          })}
        >

            <Scene
              key="SplashFront"
              component={SplashFront}
              hideNavBar={true}
              navTransparent="true"
              type={ActionConst.RESET}
              initial={!this.props.isLoggedIn}
            />
            <Scene
              key="login"
              component={Login}
              hideNavBar={true}
              navTransparent="true"
              onBack={() => Actions.SplashFront()}
              type={ActionConst.RESET}
            />
            <Scene
              key="registerMobile"
              component={RegisterMobile}
              hideNavBar={true}
              navTransparent="true"
            />
            <Scene
              key="registerOTP"
              component={RegisterOTP}
              hideNavBar={true}
              navTransparent="true"
              type={ActionConst.RESET}
            />
            <Scene
              key="profile"
              component={profile}
              hideNavBar={true}
              navTransparent="true"
              type={ActionConst.RESET}
            />
            <Scene
              key="filter"
              component={filter}
              hideNavBar={true}
              navTransparent="true"

            />
            <Scene
              key="drawer"
              type={ActionConst.RESET}
              drawer
              initial={this.props.isLoggedIn}
              hideNavBar={true}
              drawerPosition="left"
              contentComponent={SideMenu}
              drawerWidth={0.50 *ScreenWidth}
            >
            <Scene
              key="NearbyGaraje"
              component={NearbyGaraje}
              hideNavBar={true}
              navTransparent="true"
            />


            <Scene
              key="UserProfile"
              component={UserProfile}
              hideNavBar={true}
              navTransparent="true"
            />
            <Scene
              key="Booking"
              component={Booking}
              hideNavBar={true}
              navTransparent="true"
            />
            <Scene
              key="VendorHome"
              component={VendorHome}
              hideNavBar={true}
              navTransparent="true"
              initial={this.props.isVendorLoggedIn}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
const mapStateToProps = ({ ui }) => {
  const { fontLoaded, isLoggedIn, isVendorLoggedIn } = ui;
  return { fontLoaded, isLoggedIn, isVendorLoggedIn };
};

export default connect(
  mapStateToProps,
  { loadFont, updateLoggedInState, updateIsVendor }
)(RouterComponent);
