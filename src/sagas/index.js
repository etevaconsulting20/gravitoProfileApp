/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import authSagas from './Auth';
import localAsync from "./LocalAsync";
import profileSagas from './Profile';
import dashboardSagas from "./SegmentDashboard"
import commsSagas from "./Comms"


export default function* rootSaga(getState) {
    yield all([
        authSagas(),localAsync(),profileSagas(),dashboardSagas(), commsSagas()
    ]);
}