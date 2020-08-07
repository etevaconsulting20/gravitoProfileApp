
import { 
    GET_SEGMENTS ,
    GET_SEGMENTS_SUCCESS,
    GET_SEGMENTS_FALIURE,
    SAVE_SEGMENTS ,
    SAVE_SEGMENTS_SUCCESS,
    SAVE_SEGMENTS_FALIURE,
    GET_GLOBAL_SEGMENTS,
    GET_GLOBAL_SEGMENTS_SUCCESS,
    GET_GLOBAL_SEGMENTS_FALIURE,
    
    } from'./types'

    export const getSegment = () => ({
        type: GET_SEGMENTS
    });
    export const getSegmentSuccess = (res) => ({
        type: GET_SEGMENTS_SUCCESS,
        payload:res
    });
    export const getSegmentFaliure = (error) => ({
        type: GET_SEGMENTS_FALIURE,
        payload:error
    });

    export const getGlobalSegment = () => ({
        type: GET_GLOBAL_SEGMENTS
    });
    export const getGlobalSegmentSuccess = (res) => ({
        type: GET_GLOBAL_SEGMENTS_SUCCESS,
        payload:res
    });
    export const getGlobalSegmentFaliure = (error) => ({
        type: GET_GLOBAL_SEGMENTS_FALIURE,
        payload:error
    });
    export const saveSegment = (data) => ({
        type: SAVE_SEGMENTS,
        payload:data
    });
    export const saveSegmentSuccess = (res) => ({
        type: SAVE_SEGMENTS_SUCCESS,
        payload:res
    });

    export const saveSegmentFaliure = (error) => ({
        type: SAVE_SEGMENTS_FALIURE,
        payload:error
    });
