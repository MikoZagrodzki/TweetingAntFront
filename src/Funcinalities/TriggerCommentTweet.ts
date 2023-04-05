import requestApi from "./RequestApi"


export const triggerCommentTweet = async (driver: string, commentText:string, author_id:string, tweetId:string ) => {
    const body = {
        driverId : driver,
        url : `https://twitter.com/${author_id}/status/${tweetId}`,
        text : commentText
    }
    try {
    await requestApi('http://localhost:3002/selenium/twitter_comment_tweet', {
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