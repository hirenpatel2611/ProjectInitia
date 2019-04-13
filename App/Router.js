import React,{Component} from 'react';
import {View} from 'react-native';

import {Scene,Router,ActionConst} from 'react-native-router-flux';
import Login from './components/login/Login';
import RegisterMobile from './components/register/RegisterMobile';
import RegisterOTP from './components/register/RegisterOTP';
import profile from './components/register/Profile';
import SplashFront from './components/splash/SplashFront';
import filter from './components/usermaps/filter';
import NearbyGaraje from './components/usermaps/NearbyGaraje';
import NearbyGarajeDiscover from './components/usermaps/NearbyGarajeDiscover';
import MessageToNearbyMechanic from './components/usermaps/MessageToNearbyMechanic';
import { loadFont } from "./actions";

import {connect} from 'react-redux';


class RouterComponent extends Component {
   componentDidMount() {

     this.props.loadFont();
    }





render() {

  if (!this.props.fontLoaded){
    return <View/>
  }


  return (
    <Router>

      <Scene key='root'>
        <Scene key="SplashFront" component={SplashFront} hideNavBar={true} navTransparent="true" type={ActionConst.RESET} initial />
        <Scene key="login" component={Login} hideNavBar={true} navTransparent="true" />
        <Scene key="registerMobile" component={RegisterMobile} hideNavBar={true} navTransparent="true"  />
    		<Scene key="registerOTP" component={RegisterOTP} hideNavBar={true} navTransparent="true"  />
    		<Scene key="profile" component={profile} hideNavBar={true} navTransparent="true"  type={ActionConst.RESET}/>
        <Scene key="filter" component={filter} hideNavBar={true} navTransparent="true" type={ActionConst.RESET}/>
        <Scene key="NearbyGaraje" component={NearbyGaraje} hideNavBar={true} navTransparent="true" />
        <Scene key="NearbyGarajeDiscover" component={NearbyGarajeDiscover} hideNavBar={true} navTransparent="true" />
        <Scene key="MessageToNearbyMechanic" component={MessageToNearbyMechanic} hideNavBar={true} navTransparent="true" />
      </Scene>
    </Router>
  )
}

}
const mapStateToProps = ({ ui }) => {
  const {fontLoaded} = ui;
  return { fontLoaded};
};



export default connect(mapStateToProps,{loadFont})(RouterComponent);
