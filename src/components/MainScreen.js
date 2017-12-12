import React from 'react';
import { StyleSheet, View } from 'react-native';

import ListVideo from './ListVideo';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = () => (  
    <ListVideo />
);

MainScreen.navigationOptions = {
  StyleSheet:{
    backgroundColor: '#FF0033',
    color: 'red'
  },
  title: 'Gà con 22/07/2017 memories',
};

export default MainScreen;
