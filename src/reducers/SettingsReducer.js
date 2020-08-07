
import {appConfig} from "../settings/settings"
import {AsyncStorage} from "../util/helpers/helpers"
import {
    CHANGE_LANGUAGE,
    GET_USER_SETTINGS,
    GET_USER_SETTINGS_SUCCESS,
} from "../actions/types"


const INIT_STATE = {
    loading: true,
    userSetting:{
        locale: appConfig.defaultLocale,
    }
    

}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USER_SETTINGS:
         return   {...state,loading:true}
        case GET_USER_SETTINGS_SUCCESS:{
            var userSetting={...state.userSetting}
            userSetting=action.payload?action.payload:{...state.userSetting}
            return { ...state,userSetting:userSetting,loading:false}
        }
        case CHANGE_LANGUAGE:{
            var userSetting={...state.userSetting}
            userSetting.locale=action.payload
            AsyncStorage.storeObjectData("userSettings",userSetting)
            return { ...state,userSetting:userSetting,loading:false}
        }
        default:
            return { ...state }

    }
}