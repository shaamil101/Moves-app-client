import React from 'react';
import { LogBox } from "react-native";
import MainTabBar from './navigation/main_tab_bar';

import 'react-native-gesture-handler';
import 'react-native-reanimated';


// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const App = (props) => {
  return <MainTabBar />;
};


export default App;