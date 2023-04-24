import {requestApi} from "../Funcinalities"

export const getUserContent = async (loginNameTwitter:string) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
       
    }
    try {
        const response = await requestApi('http://localhost:3002/database/user_Content', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body)
    })
    if (!response?.payload) {
        throw new Error('Response not exist')
    }
   const mappedResponse = response.payload.map((x: any) => {
    return x.UserContent
   })
    return mappedResponse
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default getUserContent