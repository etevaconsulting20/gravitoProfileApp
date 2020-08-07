import axios from 'axios';
import { appConfig } from "../../settings/settings"
import AsyncStorageBase from '@react-native-community/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message"


export const getAxiosRequestPublic = () => {

  var instance = axios.create({
    baseURL: `${appConfig.apiPath}`,
  });
  return instance;
}

export const getAxiosRequestAuth = () => {

  var instance = axios.create({
    baseURL: `${appConfig.apiPath}`
  });
  return instance;
}



export class AsyncStorage {
  static storeStringData = async (key, value) => {
    try {
      await AsyncStorageBase.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }
  static storeObjectData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorageBase.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }
  static getStringData = async (key) => {
    try {

      const value = await AsyncStorageBase.getItem(key)
      if (value !== null) {
        return value
      }
    } catch (e) {
      // error reading value
    }
  }

  static getObjectData = async (key) => {
    try {
      const jsonValue = await AsyncStorageBase.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }
  static remove = async (key) => {
    return await AsyncStorageBase.removeItem(key)
  }

}

export class NotifyUser {
  static error(message) {
    showMessage({
      message: message,
      type: "danger",
      icon: "danger",
      titleStyle: { fontFamily: 'Poppins-Medium', fontSize:14}
    })
  }
  static success(message){
    showMessage({
      message: message,
      type: "success",
      icon: "success",
      titleStyle: { fontFamily: 'Poppins-Medium', fontSize:14}
    })
    
  }
}

export function getLanguageFromCode(code){
  switch(code){
      case "en":
          return "English";
      case "fi":
          return "Finnish";
      default:
          break
  }
}
