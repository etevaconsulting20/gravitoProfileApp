import React, { Component } from "react"
import {connect} from "react-redux"
import { View, Text } from "react-native"

import { CommonActions } from "@react-navigation/native"
import LoadingIndicator from "../components/loadingIndicator"
import { appConfig } from "../settings/settings"
import {logoutUser} from "../actions"


class LogoutScreen extends Component {
    componentDidMount(){
        this.props.logoutUser()
    }
    componentDidUpdate(){
        if(this.props.isLoggedIn===false){
           this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'login' },
                    
                  ],
                })
              );
           
        }
    }
    
    render() {
        const {loading} = this.props
        return (

            <LoadingIndicator isVissible={true} color={appConfig.primaryColor} message={"Loggin Off"}></LoadingIndicator>

        )
    }
}
const mapStateToProps=({authUser})=>{
    return authUser
}

export default connect(mapStateToProps,{
logoutUser
})(LogoutScreen);