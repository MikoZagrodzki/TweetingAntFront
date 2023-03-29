import requestApi from "./RequestApi"


export const triggerLikeTweet = async (driver: string, TwitterUrl: string) => {
    const body = {
        driverId : driver,
        url : TwitterUrl
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

  export default triggerLikeTweet