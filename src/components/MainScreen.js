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
  title: 'List Video',
};

export default MainScreen;