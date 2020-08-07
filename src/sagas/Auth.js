/**
 * Auth Sagas
 */
import { all, call,  put, takeEvery,select,delay } from 'redux-saga/effects';

// app config
import AppConfig from '../constants/AppConfig';

import {getAxiosRequestPublic} from "../util/helpers/helpers"

import {
    signinUserSuccess,
    signinUserFailure,
    socialSigninUserFailure,
    deleteUserSuccess,
    deleteUserFailure,
    sendDeleteUserLinkSuccess,
    sendDeleteUserLinkFailure,
    confirmUserWithPincodeSuccess,
    confirmUserWithPincodeFailure,
    authenticateUserSuccess,
    authenticateUserFailure,
    logOff,
    logOffFailure,
    logOffSuccess
} from '../actions';


export const user = (state) => state;
/**
 * Send Email address to server to get the magic link mailed.
 */

const magicLink = async (model) => {
    
    await getAxiosRequestPublic().post(`/account/magiclink`, model);
   
}

const confirmMagicLinkPin = async (model) => {
    
    const request =  await getAxiosRequestPublic().post(`/account/magicpinconfirmation`, model);
    return  await request;   
   
}

const socialLogin = async (model) => {
    const request = await getAxiosRequest().post(`${AppConfig.apiPath}/account/sociallogin`, model)
    return await request;   
}


const updateLoginTimestamp = async () => {
    // Update default consents
    const request = await getAxiosRequest.put(`${AppConfig.apiPath}/user/logintimestamp`, {})
    return await request;   
}

const deleteProfileLink = async () => {
    
        const request = await getAxiosRequest().get(`${AppConfig.apiPath}/account/delete`)
        return await request;
   
   
}


// generate the link for delete profile to be sent to user.
const deleteProfileFromServer = async (model) => {
        // Get default consents from the server
        const request = await getAxiosRequest().delete(`${AppConfig.apiPath}/account`, {data:model})
        return await request;
}

const authenticate = async () => {
    return await getAxiosRequest().get('/account/authenticate');
}

const logoff = async () => {
    return await getAxiosRequest().post('/account/logoff', {});
   
}


/**
 * Generate Magic Link
 */
function* sendMagicLink() {
   
    try {
        let model = yield select(user); // <-- get the model from state
        // generate model with user email and userid
        
        var magicLinkModel = {
            email: model.authUser.email,
            token: model.authUser.token
        }
        // call api to generate magic link
        const response = yield call(magicLink,magicLinkModel);
        
        yield put(signinUserSuccess(response))    
        
    } catch (error) {
      
        yield put(signinUserFailure());
        
    }
}


/**
 * Confirm User with Pin code received in magic link email.
 */
function* confirmUserWithPin() {
    try {
        let model = yield select(user); // <-- get the model from state
        // generate model with user email and userid
      
        var magicLinkModel = {
            email: model.authUser.email,
            token: model.authUser.token
        }
        
        // call api to generate magic link
        const response = yield call(confirmMagicLinkPin,magicLinkModel);
        
        const token=response.headers.gravitouid
        

        yield put(confirmUserWithPincodeSuccess(token))
         
           
    } catch (error) {
        
        yield put(confirmUserWithPincodeFailure(error));
    }
}
/**
 * Social Login
 */
function* socialLoginWithProvider() {
    try {
        let model = yield select(user); // <-- get the model from state
        // if the social provider has given back response.
        if(model.authUser.socialuser){
            // Call the sociallogin api route with social provider response
            const response = yield call(socialLogin,model.authUser.socialuser);
            // If api provides the response with JWT token
            if(response){

                // Set localStorage to indicate successful login
                localStorage.setItem('login', "1");
                
                // Write Cookie and redirect the user to root page, which will redirect the user to welcome page.
                yield put({
                    type: 'LOGIN_SOCIAL_USER_SUCCESS',
                    payload: response.data,
                  });
                  
                  yield call(updateLoginTimestamp);
                  yield call(delay, 2000)

                  
                  
            }
        
        }
        
    } catch (error) {
        
        
       
        if (error.response){
            yield put(socialSigninUserFailure(error.response.data));
        }
        //raise error
        
    }
}

function* sendDeleteProfileLink() {
    try {
        // call api to generate magic link
        const response = yield call(deleteProfileLink);
        yield put(sendDeleteUserLinkSuccess(response))     
    } catch (error) {
        yield put(sendDeleteUserLinkFailure(error.response.data.error));
    }
}

function* deleteProfile() {
    try {

        let model = yield select(user); // <-- get the model from state
        // generate model with user email and userid

        // call api to generate magic link
        
        const response = yield call(deleteProfileFromServer,model.authUser.deleteUser);
        yield put(deleteUserSuccess(response))     
    } catch (error) {
        yield put(deleteUserFailure(error.response.data.error));
    }
}
function* authenticateUser() {
    try {
        
        // call api to generate magic link
        const response = yield call(authenticate);
        yield put(authenticateUserSuccess(response.data))     
    } catch (error) {
        yield put(authenticateUserFailure(''));
    }
}
function* logOffUser() {
    try {
        // call api to generate magic link
        const response = yield call(logoff);
        yield put(logOffSuccess(response))    
        
    } catch (error) {
        yield put(logOffFailure(''));
    }
}
export const authenticationSagas = [
    takeEvery('LOGIN_USER', sendMagicLink),
    takeEvery('CONFIRM_USER_PINCODE', confirmUserWithPin),
    takeEvery("LOGIN_SOCIAL_USER", socialLoginWithProvider),
    takeEvery('DELETE_USER', deleteProfile),
    takeEvery("SEND_DELETE_PROFILE_LINK", sendDeleteProfileLink),
    takeEvery('AUTHENTICATE_USER', authenticateUser),
    takeEvery('LOGOUT_USER', logOffUser),

]
  


/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
    yield all([
        ...authenticationSagas,
      ])
}

