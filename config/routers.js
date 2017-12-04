import React from 'react';
import App from "../App";
//import YouTube from "../Youtube";
import SecondScreen from "../src/SecondScreen";

const reactNavigationSample = props => {
  return <App navigation={props.navigation} />;
};

reactNavigationSample.navigationOptions = {
  title: "Home Screen"
};

export default Routes = {
  Home: { screen: reactNavigationSample },
  SecondScreen: { screen: SecondScreen, title: "Second Screen" }
};

