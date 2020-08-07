import React from "react"
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getSegment } from "../../actions/index"
import { _styles } from "../../util/helpers/styles";
import DashboardMainScreen from "./stacks/main";
import { appConfig } from "../../settings/settings";



const DashboardStack = createStackNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: appConfig.primaryColor },
  headerTintColor: appConfig.secondaryColor
}

const DashboardScreen =()=>{
  return (
    <>
   
    <DashboardStack.Navigator screenOptions={stackScreenOptions} >
      <DashboardStack.Screen name={"dashboard-main"} options={{ headerTitle: "" }}>
        {props => <DashboardMainScreen {...props}  />}
      </DashboardStack.Screen>
    </DashboardStack.Navigator>
    </>
    
  )
}


export default DashboardScreen;