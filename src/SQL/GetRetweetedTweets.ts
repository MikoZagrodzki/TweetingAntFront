import {requestApi} from "../Funcinalities"

export const getRetweetedTweets = async (loginNameTwitter:string) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
       
    }
    try {
        const response = await requestApi('http://localhost:3002/database/retweeted_Tweets', {
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

  export default getRetweetedTweets