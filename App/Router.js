import React, { Component } from "react";
import { View, TouchableOpacity, Text, AsyncStorage,Dimensions } from "react-native";
import { Scene, Router, ActionConst } from "react-native-router-flux";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import Login from "./components/login/Login";
import RegisterMobile from "./components/register/RegisterMobile";
import RegisterOTP from "./components/register/RegisterOTP";
import profile from "./components/register/Profile";
import SplashFront from "./components/splash/SplashFront";
import filter from "./components/user/filter";
import NearbyGaraje from "./components/user/NearbyGaraje";
import UserProfile from "./components/user/Profile";
import NavigationMap from "./components/user/NavigationMap";
import Booking from "./components/user/Booking";
import VendorHome from "./components/vendors/VendorHome";
import FutureBooking from "./components/vendors/FutureBooking";
import VendorProfile from "./components/vendors/Profile";
import { Actions } from "react-native-router-flux";
import { loadFont, updateLoggedInState, updateIsVendor,createSocketChannel,getUserData } from "./actions";
import SideMenu from "./components/drawer/SideMenu";
import SideMenuVendor from "./components/drawer/SideMenuVendor";

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

      if (valueIsvendor === "1") {
          this.props.updateIsVendor(true);
      }
      if (valueUserName !== null) {
        await  this.props.updateLoggedInState(true);
         this.props.createSocketChannel();
       }
      else {
        this.props.updateLoggedInState(false);
      }
      this.props.getUserData()
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

      {

        !this.props.isVendorLoggedIn?
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
              initial={!this.props.isVendorLoggedIn}
            />
            <Scene
              key="FutureBooking"
              component={FutureBooking}
              hideNavBar={true}
              navTransparent="true"
            />
            <Scene
              key="VendorProfile"
              component={VendorProfile}
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
              key="NavigationMap"
              component={NavigationMap}
              hideNavBar={true}
              navTransparent="true"
            />

          </Scene>:
          <Scene
               key="drawer"
               type={ActionConst.RESET}
               drawer
               initial={this.props.isLoggedIn}
               hideNavBar={true}
               drawerPosition="left"
               contentComponent={SideMenuVendor}
               drawerWidth={0.50 *ScreenWidth}
             >

             <Scene
               key="FutureBooking"
               component={FutureBooking}
               hideNavBar={true}
               navTransparent="true"
             />
             <Scene
               key="VendorProfile"
               component={VendorProfile}
               hideNavBar={true}
               navTransparent="true"
             />
           </Scene>
        }
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
  { loadFont, updateLoggedInState, updateIsVendor,createSocketChannel,getUserData }
)(RouterComponent);
