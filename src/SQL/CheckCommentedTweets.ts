import {requestApi} from "../Funcinalities"


export const checkCommentedTweets = async (loginNameTwitter: string, tweetId: string ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        tweetId : tweetId,
       
    }
    try {
    const response = await requestApi('http://localhost:3002/database/check_Commented_Tweets', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body)

    })
    const exists = response.payload[0].exists
    return exists
    
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default checkCommentedTweets