import requestApi from "./RequestApi"


export const triggerLikeTweetUrl = async (driver: string, url:string  ) => {
    const body = {
        driverId : driver,
        url : url
    }
    try {
    await requestApi('http://localhost:3002/selenium/twitter_like_tweet', {
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

  export default triggerLikeTweetUrl