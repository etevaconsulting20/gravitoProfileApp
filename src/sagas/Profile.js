/**
 * Auth Sagas
 */
import { all, call, put, takeEvery, select, delay } from 'redux-saga/effects';

// app config
import AppConfig from '../constants/AppConfig';

import { getAxiosRequestAuth, AsyncStorage } from "../util/helpers/helpers"
import { UPDATE_USER_CONSENT,UPDATE_USER_PROFILE } from "../actions/types"
import {
    getProfileSuccess,
    getProfileFailure,
    getUserConsentsSuccess,
    getUserConsentsFailure,
    updateUserConsents,
    updateUserConsentsFailure,
    updateUserConsentsSuccess,
    updateUserProfileFailure,
    updateUserProfileSuccess
} from '../actions';


export const profile = (state) => state.profile;
export const updatedConsents = (state) => state.profile.updatedConsent

const getProfile = async () => {
    const userToken = await AsyncStorage.getObjectData('authToken');
    var config = {
        headers: { 'gravitoUid': userToken }
    };
    const request = await getAxiosRequestAuth().get(`/user`, config)
    return await request;
}
const updateConsents = async (model) => {

    const userToken = await AsyncStorage.getObjectData('authToken');
    var config = {
        headers: { 'gravitoUid': userToken }
    };
    return await getAxiosRequestAuth().post('/consent', model, config);
}

const updateProfile = async (model) => {

    const userToken = await AsyncStorage.getObjectData('authToken');
    var config = {
        headers: { 'gravitoUid': userToken }
    };
    return await getAxiosRequestAuth().put('/user', model, config);
}
const getDefaultConsents = async () => {
    const userToken = await AsyncStorage.getObjectData('authToken');
    var config = {
        headers: { 'gravitoUid': userToken }
    };
    const request = await getAxiosRequestAuth().get(`/consent/default`, config)
    return await request;
}

const getDomainConsents = async () => {
    const userToken = await AsyncStorage.getObjectData('authToken');
    var config = {
        headers: { 'gravitoUid': userToken }
    };
    const request = await getAxiosRequestAuth().get(`/consent`, config)
    return await request;
}

/**
 * Generate Magic Link
 */
function* getLoggedInProfile() {

    try {

        // call api to generate magic link
        const response = yield call(getProfile);

        yield put(getProfileSuccess(response))

    } catch (error) {

        yield put(getProfileFailure());
        console.log("error", error)
    }
}

function* getConsents() {
    try {
        const [defaultConsents, domainConsents] = yield all([
            call(getDefaultConsents),
            call(getDomainConsents)
        ])

        var consents = {
            defaultConsents: null,
            domainConsents: null
        };
        if (domainConsents && defaultConsents) {
            consents.domainConsents = domainConsents.data;
            consents.defaultConsents = defaultConsents.data;
            yield put(getUserConsentsSuccess(consents));
        }


    } catch (error) {
        yield put(getUserConsentsFailure());
        console.log("error", error)
    }

}
function* updateUserConsent() {

    try {
        let model = yield select(updatedConsents);
        let consents = [];
        if (model.consentData) {
            model.consentData.map((consentItem) => {
                let consentItemModel = {
                    domain: model.domainName,
                    name: consentItem.name,
                    value: consentItem.value
                }
                consents.push(consentItemModel)
            })
            const response = yield call(updateConsents, consents);

            yield put(updateUserConsentsSuccess())
        }


    } catch (error) {
        console.log("eror profile", error)
        yield put(updateUserConsentsFailure(error))
    }
}
function* updateUserProfile() {

    try {
        let model = yield select(profile);
        let profileModel= model.profile;
        if (profileModel) {
            const response = yield call(updateProfile, profileModel);

            yield put(updateUserProfileSuccess())
        }


    } catch (error) {
        console.log("profile save", error)
        yield put(updateUserConsentsFailure(error))
    }
}

export const profileSagas = [
    takeEvery('GET_PROFILE', getLoggedInProfile),
    takeEvery('GET_USER_CONSENTS', getConsents),
    takeEvery(UPDATE_USER_CONSENT, updateUserConsent),
    takeEvery(UPDATE_USER_PROFILE,updateUserProfile)

]



/**
 * Default Consents Root Saga
 */
export default function* rootSaga() {
    yield all([
        ...profileSagas,
    ])
}

