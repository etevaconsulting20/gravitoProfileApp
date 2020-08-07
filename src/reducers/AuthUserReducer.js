/**
 * Auth User Reducers
 */
//import { NotificationManager } from 'react-notifications';
// app config
import React from 'react';


import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    CONFIRM_USER_PINCODE,
    CONFIRM_USER_PINCODE_SUCCESS,
    CONFIRM_USER_PINCODE_FAILURE,
    RESET_LOGIN,
    CHECK_AUTH_STATUS,
    CHECK_AUTH_STATUS_SUCCESS
} from '../actions/types';

import {AsyncStorage,NotifyUser} from "../util/helpers/helpers"
import I18n from "react-native-i18n";




const INIT_STATE = {
    isLoggedIn:false,
    authToken:"",
    user: null,
    email: '',
    loading: false,
    emailSent: false,
    token:null,
    error: '',
    socialuser: null,  // This will be used for the social login
    deleteUser: null,
    userDeleted: false,
    serverState: null,
    role:null,
    merge:false,
    firstLogin:false
};



export default  (state = INIT_STATE, action) => {
   
    switch (action.type) {
        // USER LOGIN with the magic link request
        case CHECK_AUTH_STATUS:
            return {...state,loading:true}
        case CHECK_AUTH_STATUS_SUCCESS:
            if(action.payload){
                return {...state,loading:false,authToken:action.payload.token,isLoggedIn:true}
            }
           return {...state,loading:false,isLoggedIn:false}
        case LOGIN_USER:
            
            if (action.payload === '') {
                return { ...state, error: 'Please enter a valid email address' };
            } else {
                return { ...state, loading: true, email: action.payload.email, token: action.payload.email.token, emailSent: false };
            }
        
        case LOGIN_USER_SUCCESS:
            NotifyUser.success(I18n.t("notification.magiclink"))
            return { ...state, loading: false, emailSent: true };

      
        case LOGIN_USER_FAILURE:
                NotifyUser.error(I18n.t("notification.networkerror"))
            return { ...state, loading: false };
        case CONFIRM_USER_PINCODE:
            if (action.payload === '') {

                return { ...state, error: 'The Magic Link is invalid' };
            } else {
                return { ...state, loading: true, token: action.payload };
            }
        // Success in getting the JWTToken from the api
        case CONFIRM_USER_PINCODE_SUCCESS:
        
            AsyncStorage.storeStringData("authToken",action.payload)
            
            return { ...state,loading:false, token: action.payload,isLoggedIn:true};


        // Failure in getting the JWT token
        case CONFIRM_USER_PINCODE_FAILURE:
            NotifyUser.error(I18n.t("notification.magicpinerror"))
            return { ...state, loading: false, error: 1 };
        case RESET_LOGIN:
            return { ...state, emailSent: false };
        case LOGOUT_USER:
            
            return { ...state,loading:true };

        case LOGOUT_USER_SUCCESS:
            
            return { ...state, isLoggedIn:false,authToken:"",email:"",token:"",loading:false,emailSent: false  };

        case LOGOUT_USER_FAILURE:
            
            return { ...state,loading:false };
       

        default: return { ...state, loading: false };
    }
}
