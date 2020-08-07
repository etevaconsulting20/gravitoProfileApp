/**
 * App Reducers
 */
import { combineReducers } from 'redux';

import authUserReducer from './AuthUserReducer';
import profileReducer from './ProfileReducer';
import settingsReducer from "./SettingsReducer";
import dashboardReducer from "./SegmentDashboardReducer";
import commsReducer from "./CommsReducer";


const reducers = combineReducers({
  authUser: authUserReducer,
  profile: profileReducer,
  settings:settingsReducer,
  dashboard:dashboardReducer,
  comms:commsReducer
});

export default reducers;
