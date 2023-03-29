import requestApi from "./RequestApi"


export const addRephrasedTweetToTwitter = async (fetchedTweets: any) => {
    try {
    await requestApi('http://localhost:3002/selenium/twitter_add_rephrased_post', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({text : fetchedTweets[0].text ? fetchedTweets[0].text : fetchedTweets})

    })
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default addRephrasedTweetToTwitter
