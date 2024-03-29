import {requestApi} from "../Funcinalities"
import insertIntensivity from "./InsertIntensivity"

export const insertLoginData = async (email:string, loginNameTwitter: string, passwordTwitter: string ) => {
    const body = {
        email: email,
        loginNameTwitter : loginNameTwitter,
        passwordTwitter : passwordTwitter
    }
    try {
    await requestApi('http://localhost:3002/database/insert_login_Data', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body)
    })
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default insertLoginData