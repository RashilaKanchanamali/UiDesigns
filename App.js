import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import Auth from './src/screen/Auth';
import DashBoard from './src/screen/DashBoard';
import Done from './src/screen/Done';
import Postpone from './src/screen/Postpone';
import TimeSheet from './src/screen/TimeSheet';

const MainNavigator = createStackNavigator({
  Auth: {screen: Auth},
  DashBoard: {screen: DashBoard},
  TimeSheet: {screen: TimeSheet},
  Done: {screen: Done},
  Postpone: {screen: Postpone}

});




const App = createAppContainer(MainNavigator);

export default App;