import {requestApi} from "../Funcinalities"

export const checkRetweetedTweets = async (loginNameTwitter: string, tweetId: string ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        tweetId : tweetId,
       
    }
    try {
    await requestApi('http://localhost:3002/database/check_Retweeted_Tweets', {
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

  export default checkRetweetedTweets