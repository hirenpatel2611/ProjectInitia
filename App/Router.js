import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Dimensions,
  AppState
} from "react-native";
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
import customerRating from "./components/user/customerRating";
import FutureBooking from "./components/vendors/FutureBooking";
import VendorProfile from "./components/vendors/Profile";
import ForgotMobile from "./components/forgotPassword/ForgotMobile";
import ForgotOTP from "./components/forgotPassword/ForgotOTP";
import ForgotResetPassword from "./components/forgotPassword/ForgotResetPassword";
import { Actions } from "react-native-router-flux";
import {
  loadFont,
  updateLoggedInState,
  updateIsVendor,
  createSocketChannel,
  getUserData,
  getFutureBookings
} from "./actions";
import SideMenu from "./components/drawer/SideMenu";
import SideMenuVendor from "./components/drawer/SideMenuVendor";
import { Asset, SplashScreen } from "expo";

import { connect } from "react-redux";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class RouterComponent extends Component {
  componentWillMount() {
    this.props.loadFont();
    this._retrieveData();
    SplashScreen.preventAutoHide();
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = async nextAppState => {
    if (this.props.isLoggedIn) {
      const myId = await AsyncStorage.getItem("user_id");
      const valueIsvendor = await AsyncStorage.getItem("is_vendor");
      this.props.createSocketChannel(myId);
      console.log(valueIsvendor);
      if (valueIsvendor === '1') {
        this.props.getFutureBookings();
      } else {
        this.props.getUserData();
      }
    } // this.setState({appState: nextAppState});
  };

  _retrieveData = async () => {
    try {
      const valueUserName = await AsyncStorage.getItem("token");
      const valueIsvendor = await AsyncStorage.getItem("is_vendor");
      const myId = await AsyncStorage.getItem("user_id");

      if (valueUserName !== null) {
        if (valueIsvendor === "1") {
          this.props.updateIsVendor(true);
        }
        await this.props.updateLoggedInState(true);
        await this.props.getUserData();
        this.props.createSocketChannel(myId);
      } else {
        await this.props.updateLoggedInState(false);
        SplashScreen.hide();
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
            key="customerRating"
            component={customerRating}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
          <Scene
            key="ForgotMobile"
            component={ForgotMobile}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
          <Scene
            key="ForgotOTP"
            component={ForgotOTP}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
          <Scene
            key="ForgotResetPassword"
            component={ForgotResetPassword}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
          {!this.props.isVendorLoggedIn ? (
            <Scene
              key="drawer"
              type={ActionConst.RESET}
              drawer
              initial={this.props.isLoggedIn}
              hideNavBar={true}
              drawerPosition="left"
              contentComponent={SideMenu}
              drawerWidth={0.5 * ScreenWidth}
            >
              <Scene
                key="NearbyGaraje"
                component={NearbyGaraje}
                hideNavBar={true}
                navTransparent="true"
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
            </Scene>
          ) : (
            <Scene
              key="drawer"
              type={ActionConst.RESET}
              drawer
              initial={this.props.isLoggedIn}
              hideNavBar={true}
              drawerPosition="left"
              contentComponent={SideMenuVendor}
              drawerWidth={0.5 * ScreenWidth}
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
          )}
        </Scene>
      </Router>
    );
  }
}
const mapStateToProps = ({ ui, user }) => {
  const { fontLoaded, isLoggedIn } = ui;
  const { isVendorLoggedIn } = user;

  return { fontLoaded, isLoggedIn, isVendorLoggedIn };
};

export default connect(
  mapStateToProps,
  {
    loadFont,
    updateLoggedInState,
    updateIsVendor,
    createSocketChannel,
    getUserData,
    getFutureBookings
  }
)(RouterComponent);
