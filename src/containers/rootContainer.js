import React, { Component, useEffect } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { connect } from "react-redux"
import { createStackNavigator } from '@react-navigation/stack';
import { appConfig } from "../settings/settings"
import I18n from "../util/locales/setup"
import { Icon } from "react-native-elements"
import FlashMessage from "react-native-flash-message"



import LoginScreen from "../screens/login"
import LogoutScreen from "../screens/logout"
import ModalScreen from "../screens/modal"
import MainApp from "../containers/mainAppContainer"
import LogoTitle from "../components/logoTitle"
import LoadingIndicator from "../components/loadingIndicator"
import { checkAuthStatus, getSettings, getSegment } from "../actions/index"
import moment, { locales } from "moment";

var fiLocale = require('moment/locale/fi');
var enLocale = require('moment/locale/en-in')


const StackNavigator = createStackNavigator();

const mainAppHeaderOptions = {
    headerTitle: props => <LogoTitle {...props} />,
    headerStyle: { backgroundColor: appConfig.primaryColor },
    headerTintColor: appConfig.secondaryColor
}
const modalScreenOptions = {
    headerShown: false,
    cardOverlayEnabled: true,
    cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
    cardStyleInterpolator: (input) => {
        const { current } = input
        return {
            cardStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1]
                })
            }
        }
    }
}

function changeMomentLocale(locale) {
    switch (locale) {
        case 'fi':
            moment.updateLocale('fi', fiLocale);
            break;
        case 'en':
            moment.updateLocale('en-in', enLocale);
            break;
        default:
            moment.updateLocale('en-in', enLocale);
            break;

    }
}

function RootNavigationContainer(props) {
    useEffect(() => {
        props.checkAuthStatus()
        props.getSettings()
        props
    }, [])
    const { isLoggedIn, userSetting, loading } = props

    I18n.locale = userSetting ? userSetting.locale : appConfig.defaultLocale;
    console.log(I18n.locale)
    changeMomentLocale(I18n.locale)


    return (
        <>
            <LoadingIndicator isVissible={loading} color={appConfig.primaryColor} message={"Setting Up things"} />
            <NavigationContainer>
                <StackNavigator.Navigator>
                    <StackNavigator.Screen name="mainApp" component={isLoggedIn ? MainApp : LoginScreen} options={isLoggedIn ? mainAppHeaderOptions : { headerShown: false }}></StackNavigator.Screen>
                    <StackNavigator.Screen name="login" component={LoginScreen} options={{ headerShown: false }}></StackNavigator.Screen>
                    <StackNavigator.Screen name="logout" component={LogoutScreen} options={{ headerShown: false }}></StackNavigator.Screen>
                    <StackNavigator.Screen name="modal" component={ModalScreen} options={modalScreenOptions}></StackNavigator.Screen>
                </StackNavigator.Navigator>
            </NavigationContainer>
            <FlashMessage position="bottom"></FlashMessage>
        </>

    )
}

const mapStateToProps = ({ authUser, settings, dashboard }) => {
    return { ...authUser, ...settings, }
}



export default connect(mapStateToProps, {
    checkAuthStatus,
    getSettings,
    getSegment
})(RootNavigationContainer)