import React, { Component } from "react"
import { View, StyleSheet, Image, ActivityIndicator, Text } from "react-native";
import { Overlay } from "react-native-elements"

export default ({ isVissible, color, message }) => {
    return (
        <Overlay
            isVisible={isVissible}
            overlayStyle={{ backgroundColor: "transparent",elevation:0 }}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            width="auto"
            height="auto"
        >
            <>
                <ActivityIndicator style={{ padding: 10 }} size="large" color={color}></ActivityIndicator>
                <Text style={{ color: color }}>{message}</Text>
            </>
        </Overlay>
    )
}