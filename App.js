/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, Component } from 'react';

import SplashScreen from 'react-native-splash-screen';
import {
  Alert, LogBox
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';
// import firebase from "react-native-firebase";
import 'react-native-gesture-handler';
import RootNavigationContainer from './src/containers/rootContainer';
import { appConfig } from "./src/settings/settings"
import {configureStore} from "./src/store/index";
import { Provider } from "react-redux"

class App extends Component {

  async componentDidMount() {
    //we check if user has granted permission to receive push notifications.
    // this.checkPermission();
    // Register all listener for notification 
    // this.createNotificationListeners();
    SplashScreen.hide()
    LogBox.ignoreAllLogs();
  }

  // async checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   // If Premission granted proceed towards token fetch
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     // If permission hasn’t been granted to our app, request user in requestPermission method. 
  //     this.requestPermission();
  //   }
  // }

  // async getToken() {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       // user has a device token
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //   }
  // }

  // async requestPermission() {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //     this.getToken();
  //   } catch (error) {
  //     // User has rejected permissions
  //     console.log('permission rejected');
  //   }
  // }

  // async createNotificationListeners() {

  //   // This listener triggered when notification has been received in foreground
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     const { title, body } = notification;
  //     this.displayNotification(title, body);
  //   });

  //   // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     const { title, body } = notificationOpen.notification;
  //     this.displayNotification(title, body);
  //   });

  //   // This listener triggered when app is closed and we click,tapped and opened notification 
  //   const notificationOpen = await firebase.notifications().getInitialNotification();
  //   if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification;
  //     this.displayNotification(title, body);
  //   }
  // }


  // displayNotification(title, body) {
  //   // we display notification in alert box with title and body
  //   Alert.alert(
  //     title, body,
  //     [
  //       { text: 'Ok', onPress: () => console.log('ok pressed') },
  //     ],
  //     { cancelable: false },
  //   );
  // }

  render() {
   
    return (
      <Provider store={configureStore()}>
        <RootNavigationContainer></RootNavigationContainer>
      </Provider>

    );
  }
}



export default App;
