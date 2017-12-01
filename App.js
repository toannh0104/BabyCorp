import React, { Component } from 'react';
import store from './store.js';
import {Provider} from 'react-redux';
import YouTube from './Youtube';
import ListVideo from './ListVideo';
import { StackNavigator } from "react-navigation";

class App extends Component{

  render() {    
    return (
      <Provider store={store}>
        <ListVideo navigation={this.props.navigation} />
      </Provider>      
    );
  }
}
module.exports = App;