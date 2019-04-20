import React, { Component } from "react";
import { View,TouchableOpacity,Text,AsyncStorage } from "react-native";
import { Scene, Router, ActionConst } from "react-native-router-flux";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import Login from "./components/login/Login";
import RegisterMobile from "./components/register/RegisterMobile";
import RegisterOTP from "./components/register/RegisterOTP";
import profile from "./components/register/Profile";
import SplashFront from "./components/splash/SplashFront";
import filter from "./components/usermaps/filter";
import NearbyGaraje from "./components/usermaps/NearbyGaraje";
import NearbyGarajeDiscover from "./components/usermaps/NearbyGarajeDiscover";
import MessageToNearbyMechanic from "./components/usermaps/MessageToNearbyMechanic";
import { Actions } from "react-native-router-flux";
import { loadFont,updateLoggedInState } from "./actions";

import { connect } from "react-redux";

class RouterComponent extends Component {
  componentDidMount() {
    this.props.loadFont();
    this._retrieveData ();
  }


  _retrieveData = async () => {
     try {

       const valueUserName = await AsyncStorage.getItem('token');

       if (valueUserName !== null) {
       this.props.updateLoggedInState(true)
       }
       else{
       this.props.updateLoggedInState(false)
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
            initial ={!this.props.isLoggedIn}
          />
          <Scene
            key="login"
            component={Login}
            hideNavBar={true}
            navTransparent="true"
            onBack={()=>Actions.SplashFront()}
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
            type={ActionConst.RESET }
          />
          <Scene
            key="filter"
            component={filter}
            hideNavBar={true}
            navTransparent="true"
            type={ActionConst.RESET}
          />
          <Scene
            key="NearbyGaraje"
            initial ={this.props.isLoggedIn}
            component={NearbyGaraje}
            hideNavBar={true}
            navTransparent="true"
          />
          <Scene
            key="NearbyGarajeDiscover"
            component={NearbyGarajeDiscover}
            hideNavBar={true}
            navTransparent="true"
          />
          <Scene
            key="MessageToNearbyMechanic"
            component={MessageToNearbyMechanic}
            hideNavBar={true}
            navTransparent="true"
          />
        </Scene>
      </Router>
    );
  }
}
const mapStateToProps = ({ ui }) => {
  const { fontLoaded,isLoggedIn } = ui;
  return { fontLoaded,isLoggedIn };
};

export default connect(
  mapStateToProps,
  { loadFont,updateLoggedInState }
)(RouterComponent);
