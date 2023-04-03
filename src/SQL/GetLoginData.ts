
import {requestApi} from "../Funcinalities"
import { LoginData } from "../TypesApi"

export const getLoginData = async () => {
   
   
    const { payload : loginData } = await requestApi('http://localhost:3002/database/login_Data', {
    method: 'GET',
    })
    if (!loginData) {
        throw new Error('No data found in API response!')
    }
    return loginData

  }

  export default getLoginData