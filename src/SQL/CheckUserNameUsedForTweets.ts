import {requestApi} from "../Funcinalities"

export const checkUserNameUsedForTweets = async (loginNameTwitter: string, username: string ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        username : username,
       
    }
    try {
    await requestApi('http://localhost:3002/database/check_User_Name_Used_For_Tweets', {
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

  export default checkUserNameUsedForTweets