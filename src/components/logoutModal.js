import React from "react";
import { StyleSheet } from "react-native"
import { Card, Text, Button } from "react-native-elements"
import { View } from "native-base";
import { appConfig } from "../settings/settings"
import I18n from "react-native-i18n"

const LogoutConfirmationModal = ({ onConfirm, onCancel }) => {


    return (
        <>
            <View style={style.mainDiv}>
                <Text style={{ fontSize: 18,fontFamily: 'Poppins-SemiBold' }}>{I18n.t("logout-confirmheader")}</Text>
                <View style={style.messageDiv}>
    <Text style={{ fontSize: 16, textAlign: "center",fontFamily: appConfig.fontFamily }}>{I18n.t("logout-confirmmessage")}</Text>
                </View>
                <View style={style.buttonDiv}>
                    <Button onPress={onConfirm} titleStyle={{ color: appConfig.primaryColor,fontFamily: 'Poppins-SemiBold' }} type="clear" title={I18n.t("logout-confirm")}></Button>
                    <Button onPress={onCancel} titleStyle={{ color: appConfig.primaryColor,fontFamily: 'Poppins-SemiBold' }} type="clear" title={I18n.t("logout-cancel")}></Button>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    text:{
        fontFamily: appConfig.fontFamily
    },
    mainDiv: {
        display: "flex",
        width: 250,
        height: 130,
        flexDirection: "column",
        alignItems: "center",

    },
    messageDiv: {
        flex: 1.5,
        padding: 5,
        marginTop: 10
    },
    buttonDiv: {
        alignSelf: "flex-end",
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }
})

export default LogoutConfirmationModal