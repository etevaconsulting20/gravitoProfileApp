/**
 * Auth User Reducers
 */
//import { NotificationManager } from 'react-notifications';
// app config
import React from 'react';
import * as _ from 'lodash';

import {
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_USER_CONSENTS,
    GET_USER_CONSENTS_SUCCESS,
    GET_USER_CONSENTS_FAILURE,
    UPDATE_USER_CONSENT_FAILURE,
    UPDATE_USER_CONSENT_SUCCESS,
    UPDATE_USER_CONSENT,
    UPDATE_USER_PROFILE,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE
} from '../actions/types';

import { AsyncStorage, NotifyUser } from "../util/helpers/helpers"
import I18n from "react-native-i18n";




const INIT_STATE = {
    profile: null,
    domainConsents: null,
    defaultConsents: null,
    segmentData: [],
    updatedConsent: []
};



export default (state = INIT_STATE, action) => {

    switch (action.type) {
        // USER LOGIN with the magic link request
        case GET_PROFILE:
            return { ...state, loading: true }
        case GET_PROFILE_SUCCESS:

            var profilesegment = action.payload.data.segmentDataSet
            var unique = _.uniq(_.map(profilesegment, _.property('domain')))

            var newStructure = unique.map((domain, index) => {
                return (
                    {
                        domain: domain,
                        segments: _.filter(profilesegment, { 'domain': domain })
                    }

                )
            })



            return { ...state, profile: action.payload.data, loading: false, segmentData: newStructure }

        case GET_PROFILE_FAILURE:
            NotifyUser.error(I18n.t("notification.networkerror"))

        case GET_USER_CONSENTS:
            return { ...state, loading: true }
        case GET_USER_CONSENTS_SUCCESS:


            return { ...state, domainConsents: action.payload.domainConsents, defaultConsents: action.payload.defaultConsents, loading: false }

        case GET_USER_CONSENTS_FAILURE:
            NotifyUser.error(I18n.t("notification.networkerror"))
        case UPDATE_USER_CONSENT:
            return { ...state, updatedConsent: { ...action.payload } }
        case UPDATE_USER_CONSENT_SUCCESS:
            return { ...state, updatedConsent: {} }
        case UPDATE_USER_CONSENT_FAILURE:
            NotifyUser.error(I18n.t("notification.networkerror"))
            return { ...state }
        case UPDATE_USER_PROFILE:
            return { ...state, loading: true, profile: action.payload }
        case UPDATE_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, }
        case UPDATE_USER_PROFILE_FAILURE:
            NotifyUser.error(I18n.t("notification.networkerror"))
            return { ...state, loading: false }

        default: return { ...state, loading: false };
    }
}
