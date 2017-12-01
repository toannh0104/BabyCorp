import React, { Component } from "react";
import { Text } from "react-native";
import {combineReducers} from "redux";
import { Provider, connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import Routes from "./config/routers";
import getStore from "./store";

// const AppNavigator = StackNavigator(Routes);
// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));
// const navReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);

//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };



// const appReducer = combineReducers({
//   nav: navReducer
// });

// class App extends React.Component {
//   render() {
//     return (
//       <AppNavigator navigation={addNavigationHelpers({
//         dispatch: this.props.dispatch,
//         state: this.props.nav,
//       })} />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   nav: state.nav
// });
// const store = getStore(appReducer);

// const AppWithNavigationState = connect(mapStateToProps)(App);

const Home = StackNavigator(Routes);

module.exports = Home;