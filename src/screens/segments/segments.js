import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import SegmentsMainScreen from "./stacks/main"
import { appConfig } from "../../settings/settings"

const SegmentsStack = createStackNavigator();

const stackScreenOptions = {
    headerStyle: { backgroundColor: appConfig.primaryColor },
    headerTintColor: appConfig.secondaryColor
}

const SegmentScreen =()=>{
    return (
        <>
            <SegmentsStack.Navigator screenOptions={stackScreenOptions} >
                <SegmentsStack.Screen name={"segments-main"} options={{ headerTitle: "" }}>
                    {props => <SegmentsMainScreen {...props} />}
                </SegmentsStack.Screen>
            </SegmentsStack.Navigator>
        </>

    )
}



export default SegmentScreen;