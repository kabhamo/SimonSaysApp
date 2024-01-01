import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_AUTH_KEY: string = '@userAuthKey';

export const storeLocalData = async (value: number[]) => {
    try {
        const stringifyValue = JSON.stringify(value)
        await AsyncStorage.setItem(USER_AUTH_KEY, stringifyValue)
    } catch (ex) {
      // saving error
        console.log("asyncStorage-store Error: ",ex)
    }
}

export const getLocalData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_AUTH_KEY)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(ex) {
      // error reading value
      console.log("asyncStorage-read Error: ",ex)
    }
}

export const removeLocalValue = async () => {
    try {
      await AsyncStorage.removeItem(USER_AUTH_KEY)
    } catch(ex) {
      // remove error
      console.log("asyncStorage-remove Error: ",ex)
    }
  
    console.log('Done.')
  }