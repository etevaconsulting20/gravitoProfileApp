import { all, call, put, takeEvery, select, delay } from 'redux-saga/effects';
import { AsyncStorage } from "../util/helpers/helpers";

import {
    CHECK_AUTH_STATUS, LOGOUT_USER, GET_USER_SETTINGS

} from "../actions/types"
import {
    checkAuthStatusSuccess,
    logoutUserSuccess,
    logoutUserFailure,
    getSettingsSuccess
} from "../actions/"

const getValue = async (key) => {
    return await AsyncStorage.getStringData(key);
}

const removeValue = async (key) => {

    return await AsyncStorage.remove(key)
}
const getObjectValue = async (key) => {
    return await AsyncStorage.getObjectData(key);
}
function* getAuthStatus() {
    try {
        let value = yield call(getValue,"authToken")

        yield put(checkAuthStatusSuccess(value))
    } catch (error) {
        console.log("async error", error)
    }
}

function* logoutUser() {
    try {
        yield call(removeValue, "authToken")
        yield delay(2000)
        yield put(logoutUserSuccess())
    } catch (error) {
        
       
        yield put(logoutUserFailure())
    }
}
function* getUserSettings() {
    try {
       var settings = yield call(getObjectValue, "userSettings")
    //    yield delay(2000)
        yield put(getSettingsSuccess(settings))
    } catch (error) {
       
        console.log("async error", error)
        
    }
}

export const LocalAsyncSagas = [
    takeEvery(CHECK_AUTH_STATUS, getAuthStatus),
    takeEvery(GET_USER_SETTINGS,getUserSettings),
    takeEvery(LOGOUT_USER, logoutUser)

]


export default function* rootSaga() {
    yield all([
        ...LocalAsyncSagas,
    ])
}