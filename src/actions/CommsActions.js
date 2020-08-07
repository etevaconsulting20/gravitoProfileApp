/**
 * Profile Actions
 * 
 */
import {
    GET_USER_EVENTS,
    GET_USER_EVENTS_SUCCESS,
    GET_USER_EVENTS_FAILURE
} from '../actions/types';

/**
 * Redux Action get the logged in user events
 */
export const getComms = () => ({
    type: GET_USER_EVENTS
})
export const getCommsSuccess = (events) => ({
    type: GET_USER_EVENTS_SUCCESS,
    payload: events
})

export const getCommsFailure = (error) => ({
    type: GET_USER_EVENTS_FAILURE,
    payload:error
})
