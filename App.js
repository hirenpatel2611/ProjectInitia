import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { loadFont } from "./App/actions";
import ReduxThunk from "redux-thunk";
import reducers from "./App/reducers";
import Router from "./App/Router";
import { connect } from "react-redux";
import { Notifications } from 'expo';

class App extends Component {
  componentDidMount(){
  
  }
  render() {

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
