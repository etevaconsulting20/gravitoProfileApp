import React from "react"
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getSegment } from "../../actions/index"
import { _styles } from "../../util/helpers/styles";
import ProfileMainScreen from "./stacks/main";
import ProfileManageScreen from "./stacks/manage"
import AboutYou from "./stacks/aboutyou"
import { appConfig } from "../../settings/settings";



const ProfileStack = createStackNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: appConfig.primaryColor },
  headerTintColor: appConfig.secondaryColor
}

const ProfileScreen = () => {
  return (
    <>

      <ProfileStack.Navigator screenOptions={stackScreenOptions} >
        <ProfileStack.Screen name={"profile-main"} options={{ headerTitle: "" }}>
          {props => <ProfileMainScreen {...props} />}
        </ProfileStack.Screen>
        <ProfileStack.Screen name={"profile-manage"} options={{ headerTitle: "" }}>
          {props => <ProfileManageScreen {...props} />}
        </ProfileStack.Screen>
        <ProfileStack.Screen name={"profile-aboutyou"} options={{ headerTitle: "" }}>
          {props => <AboutYou {...props} />}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    </>

  )
}


export default ProfileScreen;