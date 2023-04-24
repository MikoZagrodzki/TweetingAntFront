import {requestApi} from "../Funcinalities"

export const updateTweetsIntensivity = async (loginNameTwitter:string, intensivity:number) => {
    const body = {
        loginNameTwitter: loginNameTwitter,
        intensivity: intensivity,
    }
    try {
    await requestApi('http://localhost:3002/twitterClass/updateTweetsIntensivity', {
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

  export default updateTweetsIntensivity