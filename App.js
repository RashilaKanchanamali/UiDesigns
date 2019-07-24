import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Auth from './src/screen/Auth';
import DashBoard from './src/screen/DashBoard';
import Done from './src/screen/Done';
import Postpone from './src/screen/Postpone';
import TimeSheet from './src/screen/TimeSheet';
import EditTask from './src/screen/EditTask';
import DayView from './src/screen/DayView';

const MainNavigator = createStackNavigator({
  Auth: {screen: Auth},
  DashBoard: {screen: DashBoard},
  TimeSheet: {screen: TimeSheet},
  Done: {screen: Done},
  Postpone: {screen: Postpone},
  EditTask: {screen: EditTask},
  DayView: {screen: DayView}

});




const App = createAppContainer(MainNavigator);

export default App;