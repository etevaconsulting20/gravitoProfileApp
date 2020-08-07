/**
 * Profile Actions
 * 
 */
import {
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_USER_CONSENTS,
    GET_USER_CONSENTS_SUCCESS,
    GET_USER_CONSENTS_FAILURE,
    UPDATE_USER_CONSENT,
    UPDATE_USER_CONSENT_FAILURE,
    UPDATE_USER_CONSENT_SUCCESS,
    UPDATE_USER_PROFILE,
    UPDATE_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_SUCCESS
} from '../actions/types';

/**
 * Redux Action get the logged in user profile
 */
export const getProfile = () => ({
    type: GET_PROFILE
})
export const getProfileSuccess = (profile) => ({
    type: GET_PROFILE_SUCCESS,
    payload: profile
})

export const getProfileFailure = (error) => ({
    type: GET_PROFILE_FAILURE,
    payload:error
})

export const getUserConsents = () => ({
    type: GET_USER_CONSENTS
})
export const getUserConsentsSuccess = (consents) => ({
    type: GET_USER_CONSENTS_SUCCESS,
    payload: consents
})

export const getUserConsentsFailure = (error) => ({
    type: GET_USER_CONSENTS_FAILURE,
    payload:error
})

export const updateUserConsents = (updatedConsents) => ({
    type: UPDATE_USER_CONSENT,
    payload:updatedConsents
})

export const updateUserConsentsSuccess = () => ({
    type: UPDATE_USER_CONSENT_SUCCESS,
    
})

export const updateUserConsentsFailure = (error) => ({
    type: UPDATE_USER_CONSENT_FAILURE,
    payload:error
    
})

export const updateUserProfile = (updatedProfile) => ({
    type: UPDATE_USER_PROFILE,
    payload:updatedProfile
})

export const updateUserProfileSuccess = () => ({
    type: UPDATE_USER_PROFILE_SUCCESS,
    
})

export const updateUserProfileFailure = (error) => ({
    type: UPDATE_USER_PROFILE_FAILURE,
    payload:error
})
