import React,{Component} from 'react';
import {Scene,Router,ActionConst} from 'react-native-router-flux';
import login0 from './components/login/Login0';
import login1 from './components/login/Login1';
import login2 from './components/login/Login2';
import login3 from './components/login/Login3';
import profile from './components/profile/profile';
import SplashFront from './components/login/SplashFront'
import {connect} from 'react-redux';


class RouterComponent extends Component {


render() {

  return (
    <Router>
    
      <Scene key='root'>
      <Scene key="SplashFront" component={SplashFront} hideNavBar={true} navTransparent="true" type={ActionConst.RESET} initial/>
        <Scene key="login1" component={login1} hideNavBar={true} navTransparent="true"  />
        <Scene key="login2" component={login2} hideNavBar={true} navTransparent="true" />
		<Scene key="login0" component={login0} hideNavBar={true} navTransparent="true" />
		<Scene key="login3" component={login3} hideNavBar={true} navTransparent="true" />
		<Scene key="profile" component={profile} hideNavBar={true} navTransparent="true" />
      </Scene>
    </Router>
  )
}

}


export default RouterComponent;
