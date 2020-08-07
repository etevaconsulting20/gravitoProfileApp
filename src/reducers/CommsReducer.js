/**
 *  User Comms Reducers
 */

import * as _ from 'lodash';

import {
GET_USER_EVENTS,
GET_USER_EVENTS_SUCCESS,
GET_USER_EVENTS_FAILURE
} from '../actions/types';

import {AsyncStorage,NotifyUser} from "../util/helpers/helpers"
import I18n from "react-native-i18n";
import moment from 'moment'




const INIT_STATE = {
    emailEvents: null,
    webEvents:null,
    smsEvents:null,
    mobileEvents:[], 
    loading:false
};



export default  (state = INIT_STATE, action) => {
   
    switch (action.type) {
        // USER LOGIN with the magic link request
        case GET_USER_EVENTS:
            return {...state,loading:true}
        case GET_USER_EVENTS_SUCCESS:
          
            var events = action.payload.data
           
            var emailEvents = []
            _.filter(events, {eventType: "emailProcessed"}).forEach((item, index) => {
                var element = {
                    title : I18n.t('communication-emailSent') + moment(item.timestamp).format("Do MMMM YYYY, h:mm:ss a"),
                    id:index,
                    content:JSON.parse(item.message).content[0].value,
                    type:'email'
                }
                emailEvents.push(element)
            });

            var webEvents = []
            _.filter(events, {eventType: "webProcessed"}).forEach((item, index) => {
                var element = {
                    title : I18n.t('communication-webNotificationSent') + moment(item.timestamp).format("Do MMMM YYYY, h:mm:ss a"),
                    id:index,
                    content:JSON.parse(item.message).content[0].value,
                    type:'web'
                }
                webEvents.push(element)
            });

            var mobileEvents = []
            _.filter(events, {eventType: "mobileProcessed"}).forEach((item, index) => {
                var element = {
                    title : I18n.t('communication-mobileNotificationSent') + moment(item.timestamp).format("Do MMMM YYYY, h:mm:ss a"),
                    id:index,
                    content:JSON.parse(item.message).content[0].value,
                    type:'mobile'
                }
                mobileEvents.push(element)
            });

            var smsEvents = []
            _.filter(events, {eventType: "smsProcessed"}).forEach((item, index) => {
                var element = {
                    title : I18n.t('communication-SMSSent') + moment(item.timestamp).format("Do MMMM YYYY, h:mm:ss a"),
                    id:index,
                    content:JSON.parse(item.message).content[0].value,
                    type:'sms'
                }
                smsEvents.push(element)
            });

           
            return {...state, webEvents: webEvents.length>0?webEvents:null, emailEvents:emailEvents.length>0?emailEvents:null, smsEvents:smsEvents.length>0?smsEvents:null, mobileEvents:mobileEvents.length>0?mobileEvents:null, loading:false}
  
        case GET_USER_EVENTS_FAILURE:
            NotifyUser.error(I18n.t("notification.networkerror"))

        

        default: return { ...state, loading: false };
    }
}
