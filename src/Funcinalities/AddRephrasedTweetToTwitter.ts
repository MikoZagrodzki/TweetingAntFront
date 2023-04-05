import requestApi from "./RequestApi"


export const addRephrasedTweetToTwitter = async (fetchedTweets: any, twitterAccountName:string) => {
    try {
    await requestApi('http://localhost:3002/selenium/twitter_add_rephrased_post', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({driverId: twitterAccountName, text : fetchedTweets})

    })
    }catch(error){
        console.error(error)
        throw error
    }
  }
  //{drvierId: twitterAccountName, text : fetchedTweets}
  export default addRephrasedTweetToTwitter
