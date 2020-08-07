import React, { Component } from "react"
import {connect} from "react-redux"
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Button } from 'react-native-elements'
import { StackActions } from "@react-navigation/native"
import { Card, Input, Text, Icon, } from "react-native-elements"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import I18n from "react-native-i18n";
import { appConfig } from "../settings/settings";
import LoadingIndicator from "../components/loadingIndicator";

import {signin,
    resetLogin,
    confirmUserWithPincode,
    checkAuthStatus
} from "../actions/index"



class LoginScreen extends Component {
    state = {
        emailSent: false,
        email: '',
        token: '',
        emailError: false,
        tokenError:false,
        loading: false

    }
    isEmailValid = false;
    isTokenValid = false;
    
   componentDidUpdate(){
       if(this.props.isLoggedIn){
           this.gotoMainApp()
           
       }
   }
   
    onEmailChange(event) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gmi;
        this.setState({ email: event.nativeEvent.text, });
        if (re.test(event.nativeEvent.text)) {
            this.isEmailValid = true;
            this.setState({ emailError: false })
            return

        }
        this.isEmailValid = false
    }
    onPinChange(event){
        let regex = /^\d{6}$/;
        this.setState({token:event.nativeEvent.text})
        if(regex.test(event.nativeEvent.text)){
            this.isTokenValid=true;
            this.setState({ tokenError: false })
            return
        }
        this.isTokenValid=false;

    }
    reset = () => {
        this.isEmailValid=false
        this.isTokenValid=false
        this.setState({
            email: '',
            token: '',
            emailError: false,
            tokenError:false,
        })
        this.props.resetLogin()

    }
    confirmPin=()=>{
        
        if (this.isTokenValid) {
            this.props.confirmUserWithPincode(this.state.token)
        }
        else {
            this.setState({ tokenError: true })
        }
    }
    sendMagicLink = () => {
        
        if (this.isEmailValid) {
            this.props.signin(this.state.email)
            
        }
        else {
            this.setState({ emailError: true });
            
        }
        
    }
    gotoMainApp=()=>{
        this.props.navigation.dispatch(
            StackActions.replace("mainApp"))
    }
    getFormContent = (emailSent) => {
        if (emailSent) {
            return (
                <>
                    <Input
                        key="pin-input-key"
                        style={{fontFamily: appConfig.fontFamily}}
                        keyboardType="numeric"
                        value={this.state.token}
                        onChange={(e)=>this.onPinChange(e)}
                        errorMessage={this.state.tokenError ? I18n.t('login-pinErrorMessage') : null}
                        leftIcon={<Icon type="font-awesome" solid={true} size={18} name="user-secret" />}
                        label={<Text style={{fontFamily: appConfig.fontFamily}} h5>{I18n.t('login-pinLabel')}</Text>}
                        placeholder={I18n.t('login-pinPlaceholder')} >
                    </Input>
                    <View style={style.buttonGroup}>
                        <Button key="confirm-pin-btn-key" titleStyle={{fontFamily: appConfig.fontFamily}}  buttonStyle={{ backgroundColor: appConfig.primaryColor, width: 120 }} title={I18n.t('login-confirmPinButtonTitle')} onPress={() => this.confirmPin()}></Button>
                        <Button key="reset-btn-key" titleStyle={{fontFamily: appConfig.fontFamily}}  buttonStyle={{ backgroundColor: appConfig.primaryColor, width: 120 }} title={I18n.t('login-resetButtonTitle')} onPress={() => this.reset()}></Button>
                    </View>
                </>
            )
        }
        else {
            return (
                <>
                    <Input
                    style={{fontFamily: appConfig.fontFamily}}
                        key="email-input-key"
                        value={this.state.email}
                        errorMessage={this.state.emailError ? I18n.t('login-emailErrorMessage') : null}
                        onChange={(e) => this.onEmailChange(e)}
                        leftIcon={<Icon type="font-awesome" solid={true} size={18} name="envelope" />}
                        label={<Text style={{fontFamily: appConfig.fontFamily}} h5>{I18n.t('login-emailLabel')}</Text>}
                        placeholder={I18n.t('login-emailPlaceholder')} >
                    </Input>
                    <Button key="get-pin-btn-key" titleStyle={{fontFamily: appConfig.fontFamily}} buttonStyle={{ backgroundColor: appConfig.primaryColor, }} title={I18n.t('login-loginButtonTitle')} onPress={() => this.sendMagicLink()}></Button>
                </>
            )
        }
    }

    render() {
        
        const {loading,emailSent} = this.props
     
        return (
            <>
                <LoadingIndicator color={appConfig.primaryColor} isVissible={loading} message="Loading..."></LoadingIndicator>
                <KeyboardAwareScrollView
                    style={{ backgroundColor: 'white' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}

                    scrollEnabled={true}
                >
                    <View style={style.mainDiv} >

                        <View style={style.header} >
                            <View style={{ padding: 20 }}>
                                <Image
                                    style={{ width: 50, height: 50 }}
                                    source={{
                                        uri: appConfig.headerLogoUrl
                                    }}
                                />
                            </View>
                            <Text style={{fontFamily: appConfig.fontFamily}} h3 >{I18n.t('login-header')} </Text>
                        </View>

                        <View style={style.loginCard}>
                            {this.getFormContent(emailSent)}
                            <View style={{ paddingTop: 10, }}>
                                <Text style={{ fontSize: 16, color: "grey",fontFamily: appConfig.fontFamily }}>{I18n.t('login-alternativeSignIn')} </Text>
                            </View>
                            <View style={style.logoGroup}>
                                <Icon
                                    reverse
                                    name='logo-facebook'
                                    type='ionicon'
                                    color='#4267B2'
                                />
                                <Icon
                                    reverse
                                    name='logo-google'
                                    type='ionicon'
                                    color='#DB4437'
                                />
                            </View>
                            <View style={{ paddingTop: 10,marginTop:10 }} >
                                <Text style={{ fontSize: 16, color: "grey",fontFamily: appConfig.fontFamily }}>{I18n.t('login-termsOfServiceText')}</Text>

                            </View>
                            <View style={{ paddingTop: 10, }} >
                                <Text style={{ fontSize: 16, color: appConfig.primaryColor,fontFamily: appConfig.fontFamily }}>{I18n.t('login-termsOfServiceLinkLabel')}</Text>
                            </View>

                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </>
        )
    }
}

const style = StyleSheet.create({
    mainDiv: {
        display: "flex",
        flex: 1,
        height: 550,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    loginCard: {
        flex: 1.7,
        width: "100%",
        padding: 20,
        alignItems: "center"
    },
    logoDiv: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        flexDirection: "column",

    },
    header: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignContent: "center",
        alignItems: "center"
    },
    footer: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center"
    },
    logoGroup: {
        flex: 1,
       
        width: 200,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",

    },
    buttonGroup: {
        display: "flex",
        width: 250,
        flexDirection: "row",
        justifyContent: "space-between"
    }

})

const mapStateToProps=({authUser})=>{
    return authUser
}
export default connect(mapStateToProps,{
signin,
resetLogin,
confirmUserWithPincode,
checkAuthStatus
})(LoginScreen);