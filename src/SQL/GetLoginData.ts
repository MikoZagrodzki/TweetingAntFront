import {requestApi} from "../Funcinalities"

export const getLoginData = async (email:string) => {
    const body = {
        email: email,
    }
    try {
        const response = await requestApi('http://localhost:3002/database/login_Data_From_Email', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body)
    })
    return response
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default getLoginData