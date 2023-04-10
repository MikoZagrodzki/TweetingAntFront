import {requestApi} from "../Funcinalities"

export const checkLoginData = async (loginNameTwitter: string, passwordTwitter: string ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        passwordTwitter : passwordTwitter,
       
    }
    try {
    const response = await requestApi('http://localhost:3002/database/check_Login_Data', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body)

    })
    if (!response?.payload){
      throw new Error('No response from API')
    }
    console.log(response.payload[0].exists)
    const exists = response.payload[0].exists
    return exists
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default checkLoginData