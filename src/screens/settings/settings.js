import React, { Component } from "react"
import { connect } from "react-redux"
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { changeLanguage } from "../../actions/index"
import { _styles } from "../../util/helpers/styles";
import SettingsMainScreen from "./stacks/main";
import SettingsLanguageScreen from "./stacks/language"
import { appConfig } from "../../settings/settings";



const SettingsStack=createStackNavigator();

const stackScreenOptions={
    headerStyle:{backgroundColor:appConfig.primaryColor},
    headerTintColor:appConfig.secondaryColor
}

const SettingsScreen =(props)=>{
    onValueChange = (itemValue, itemIndex) => {
        props.changeLanguage(itemValue)
    }
    const { locale } = props.userSetting
    return (            
        <SettingsStack.Navigator screenOptions={stackScreenOptions} >
            <SettingsStack.Screen name={"settings-main"} options={{headerTitle:""}}>
              {props=><SettingsMainScreen {...props} locale={locale}/>}
            </SettingsStack.Screen>
            <SettingsStack.Screen name={"settings-language"}>
              {props=><SettingsLanguageScreen {...props} locale={locale}/>}
            </SettingsStack.Screen>
        </SettingsStack.Navigator>
)
}


const mapStateTopProps = ({ settings }) => {
    return { ...settings }
}
export default connect(mapStateTopProps, {
    changeLanguage
})(SettingsScreen);