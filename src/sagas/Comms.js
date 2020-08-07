/**
 * Auth Sagas
 */
import { all, call,  put, takeEvery,select,delay } from 'redux-saga/effects';

// app config
import AppConfig from '../constants/AppConfig';

import {getAxiosRequestAuth, AsyncStorage} from "../util/helpers/helpers"

import {
    getCommsSuccess,
    getCommsFailure
} from '../actions';



const getComms = async () => {
        const userToken = await AsyncStorage.getObjectData('authToken');
        var config = {
            headers: { 'gravitoUid': userToken }
        };
        const request = await getAxiosRequestAuth().get(`/user/events`,config)
        return await request;
}


/**
 * Get the communication events
 */
function* getLoggedInEvents() {
   
    try {
       
        // call api to get user events
        const response = yield call(getComms);
        
        yield put(getCommsSuccess(response))    
        
    } catch (error) {
      
        yield put(getCommsFailure());
        console.log("error",error) 
    }
}


export const commsSagas = [
    takeEvery('GET_USER_EVENTS', getLoggedInEvents)
   
]
  


/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
    yield all([
        ...commsSagas,
      ])
}

