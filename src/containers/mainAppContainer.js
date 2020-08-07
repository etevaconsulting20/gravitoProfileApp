import * as React from 'react';
import { Text, View, Button, Alert, Modal, StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from "react-redux"
import I18n from "react-native-i18n";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import { appConfig } from "../settings/settings"
import CommunicationScreen from "../screens/communication/communication";
import DashboardScreen from "../screens/dashboard/dashboard";
import ProfileScreen from "../screens/profile/profile";
import SettingScreen from "../screens/settings/settings";
import SegmentsScreen from "../screens/segments/segments"
import { size } from 'lodash';



const Tab = createBottomTabNavigator();



function MainApp(props) {
    const tabNavigatorData = [
        
        // {

        //     name: "segments",
        //     component: SegmentsScreen,
        //     label: "tabs.segments",
        //     iconName: "layer-group",
        //     iconType: 'font-awesome-5',
        //     iconColor: appConfig.textColor
        // },
        {

            name: "dashboard",
            component: DashboardScreen,
            label: "tabs-dashboard",
            iconName: "dashboard",
            iconType: 'MaterialCommunityIcons',
            iconColor: appConfig.textColor
        },
        {
            name: "communication",
            component: CommunicationScreen,
            label: "tabs-communication",
            solid:true,
            iconName: "message",
            iconType: 'MaterialCommunityIcons',
            iconColor: appConfig.textColor,
        },
        
        
        {
            name: "profile",
            component: ProfileScreen,
            label: "tabs-profile",
            iconName: "account-box",
            iconType: 'MaterialCommunityIcons',
            iconColor: appConfig.textColor
        },
        {
            name: "settings",
            component: SettingScreen,
            label: "tabs-settings",
            iconName: "settings",
            iconType: 'MaterialCommunityIcons',
            iconColor: appConfig.textColor
        }
    ]




    
    const customTabBarOption = {
       
        activeTintColor: 'black',
        labelStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 12,
            letterSpacing: 0.09,
        },
        inactiveTintColor: "black",
        style: {
            backgroundColor: appConfig.secondaryColor
        }
    }
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <TouchableOpacity onPress={openModal}>
                    <Text style={style.textBold}>{I18n.t('settings-signout')}</Text>
                    </TouchableOpacity>
                   
                    {/* <Icon size={30} type="font-awesome" name="sign-out" onPress={openModal} /> */}
                </View>

            ),
        });
    }, [props.navigation])



    const openModal = () => {

        props.navigation.navigate("modal", {
            type: "delete-confirmation"
        })
    }
    return (
        <>
            <Tab.Navigator tabBarOptions={customTabBarOption} initialRouteName="dashboard">
                {
                    tabNavigatorData.map((tabItem) => (
                        <Tab.Screen
                            key={`${"tab-screen-" + tabItem.name}`}
                            name={tabItem.name} component={tabItem.component} options={{
                                tabBarLabel: I18n.t(tabItem.label),

                                tabBarIcon: ({ tintColor, focused }) => <Icon
                                    size={tabItem.size?tabItem.size:20}
                                    name={tabItem.iconName}
                                    type={tabItem.iconType}
                                    solid={tabItem.solid?true:false}
                                    color={focused ? appConfig.primaryColor : tabItem.iconColor}

                                />
                            }} />
                    ))
                }
            </Tab.Navigator>
        </>
    );
}
const mapStateToProps = ({ settings }) => {
    return settings
}

const style = StyleSheet.create({
    textBold: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        letterSpacing: 0.09,
        color:appConfig.secondaryColor
    }
})


export default connect(mapStateToProps, {})(MainApp)