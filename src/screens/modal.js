import React, { Component } from "react";
import LogoutConfirmationModal from "../components/logoutModal"
import { Overlay,Text } from "react-native-elements";
import {View, StyleSheet} from "react-native"



class ModalScreen extends Component {

    getChild=(type)=>{
        switch(type){
            case "delete-confirmation":{
                return <LogoutConfirmationModal onCancel={this.onBackdropPress} onConfirm={this.goToLogoutScreen}></LogoutConfirmationModal>
            }
            default :{
                return ""
            }
            
        }
    }
    onBackdropPress=()=>{
        this.props.navigation.pop()
        
    }
    goToLogoutScreen=()=>{
        this.props.navigation.push("logout")
        
    }
    render() {
        const {type} = this.props.route.params
        return (
            <>
                <View style={style.modalView}>
                    <View style={style.contentView}>
                    {this.getChild(type)}
                    </View>
                </View>
            </>
        )
    }
}

const style= StyleSheet.create({
   modalView: {
       flex:1,
       display:"flex",
       flexDirection:"column",
       alignContent:"center",
       alignItems:"center",
       justifyContent:"center",
       
       
    },
    contentView:{
        display:"flex",
        backgroundColor:"white",
        padding:10,
        alignSelf:"center",
        borderRadius:15
        

    }
})
export default ModalScreen