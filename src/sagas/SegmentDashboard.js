/**
 * User Profile Sagas
 */
import { all, call, put, takeEvery,select } from 'redux-saga/effects';
// app config
import {getAxiosRequestAuth,AsyncStorage} from "../util/helpers/helpers"

import {
getSegmentSuccess,
getSegmentFaliure,
saveSegmentSuccess,
saveSegmentFaliure,
getGlobalSegmentSuccess,
getGlobalSegmentFaliure
} from '../actions';


/**
 * Send Domain Request To Servercons
 * The url will be changed to api url later
 */


// Get default consents from the state...
export const userSegments = (state) => state.dashboard;

// Get user consents for the default domain
const UserProfile = async (model) => {
    const userToken = await AsyncStorage.getObjectData('authToken');
        var config = {
            headers: { 'gravitoUid': userToken }
        };
    return await getAxiosRequestAuth().get('/user',config);
}

//Get global segments 
const GlobalSegments = async (model) => {
    const userToken = await AsyncStorage.getObjectData('authToken');
        var config = {
            headers: { 'gravitoUid': userToken }
        };
    return await getAxiosRequestAuth().get('/user/segments',config);
}
// Method to update the user segments
const UpdateSegments = async (model) => {
    const userToken = await AsyncStorage.getObjectData('authToken');
    var config = {
        headers: { 'gravitoUid': userToken }
    };
    return await getAxiosRequestAuth().put('/user/segments', model,config);
}


// Method to add social login to profile
/**
 * Get Default Consents From Server
 */
function* getUserSegments() {
    try {
        const response = yield call(UserProfile);
        
        yield put(getSegmentSuccess(response));
    } catch (error) {
        if(error.response &&error.response.status===401){
            return null
        }
        yield put(getSegmentFaliure(error));
    }
}


function* getGlobalSegments() {
    try {
        const response = yield call(GlobalSegments);
        yield put(getGlobalSegmentSuccess(response));
    } catch (error) {
        if(error.response &&error.response.status===401){
            return null
        }
        
        yield put(getGlobalSegmentFaliure(error));
    }
}

/**
 * Update Default Consents 
 */
function* updateUserSegments() {
    try {
        let model = yield select(userSegments);
        
        const response = yield call(UpdateSegments, model.profileSegments);
        
        yield put(saveSegmentSuccess(response));
    } catch (error) {
       
        console.log("error",error)
        yield put(saveSegmentFaliure(error));
    }
}


/**
* Get Domains
 */

export const userSegmentSagas = [
    takeEvery('GET_SEGMENTS', getUserSegments),
    takeEvery('GET_GLOBAL_SEGMENTS', getGlobalSegments),
    takeEvery("SAVE_SEGMENTS", updateUserSegments),
]
  


/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
    yield all([
        ...userSegmentSagas,
      ])
}