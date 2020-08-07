import React from "react"
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getSegment } from "../../actions/index"
import { _styles } from "../../util/helpers/styles";
import CommunicationMainScreen from "./stacks/main";
import MessageOverlayComponent from "./stacks/messageoverlay"
import { appConfig } from "../../settings/settings";



const CommsStack = createStackNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: appConfig.primaryColor },
  headerTintColor: appConfig.secondaryColor
}

const CommunicationScreen = () => {
  return (
    <>

      <CommsStack.Navigator screenOptions={stackScreenOptions} >
        <CommsStack.Screen name={"comms-main"} options={{ headerTitle: "" }}>
          {props => <CommunicationMainScreen {...props} />}
        </CommsStack.Screen>
        <CommsStack.Screen name={"comms-message"} options={{ headerTitle: "" }}>
          {props => <MessageOverlayComponent {...props} />}
        </CommsStack.Screen>
      </CommsStack.Navigator>
    </>

  )
}


export default CommunicationScreen;