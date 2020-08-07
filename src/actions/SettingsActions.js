import {CHANGE_LANGUAGE,GET_USER_SETTINGS,GET_USER_SETTINGS_SUCCESS} from "./types";


export const changeLanguage=(languageCode)=>(
    {
        type:CHANGE_LANGUAGE,
        payload:languageCode
    }
)

export const getSettings=()=>(
    {
        type:GET_USER_SETTINGS,
        
    }
)
export const getSettingsSuccess=(settings)=>(
    {
        type:GET_USER_SETTINGS_SUCCESS,
        payload:settings
        
    }
)

