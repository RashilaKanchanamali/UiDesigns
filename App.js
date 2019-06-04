import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import Auth from './src/screen/Auth';
import DashBoard from './src/screen/DashBoard';
import Home from './src/screen/Home';
import Settings from './src/screen/Settings';
import TimeSheet from './src/screen/TimeSheet';

const MainNavigator = createStackNavigator({
  Auth: {screen: Auth},
  DashBoard: {screen: DashBoard},
  TimeSheet: {screen: TimeSheet}

});




const App = createAppContainer(MainNavigator);

export default App;