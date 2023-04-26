import {requestApi} from "../Funcinalities"

export const updatePersonality = async (loginNameTwitter:string, personality:string) => {
    const body = {
        loginNameTwitter: loginNameTwitter,
        personality: personality,
    }
    try {
    await requestApi('http://localhost:3002/twitterClass/updatePersonality', {
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

  export default updatePersonality