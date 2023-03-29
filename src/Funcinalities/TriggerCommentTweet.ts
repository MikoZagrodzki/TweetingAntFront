import requestApi from "./RequestApi"


export const triggerCommentTweet = async (driver: string, twitterUrl: string, commentText:string) => {
    const body = {
        driverId : driver,
        url : twitterUrl,
        text : commentText
    }
    try {
    await requestApi('http://localhost:3002/selenium/twitter_retweet_tweet', {
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

  export default triggerCommentTweet