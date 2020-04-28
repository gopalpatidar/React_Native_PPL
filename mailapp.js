import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import App from './App'
import {Provider} from 'react-redux';
import store from './Redux/Store/store'

function Mailapp() {
  return (
    <Provider store={store}>
    <NavigationContainer>
       <App />
    </NavigationContainer>
    </Provider>
  );
}

export default Mailapp;
