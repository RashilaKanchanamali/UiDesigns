import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Auth from './src/screen/Auth';
import DashBoard from './src/screen/DashBoard';

const MainNavigator = createStackNavigator({
  Auth: {screen: Auth},
  DashBoard: {screen: DashBoard}

});

const App = createAppContainer(MainNavigator);

export default App;