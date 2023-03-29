import requestApi from "./RequestApi"


export const likeAllTweetsFromArray = (driver: string,twitterUserName:any ,fetchedTweets:any ) => {

for (let i = 0; i < fetchedTweets.length; i++) {
    (function (index) {
      setTimeout(() => {
        handleLikeAllTweetsFromUser(driver,twitterUserName, fetchedTweets[index].tweetId);
      },5000 * (index + 1));
    })(i);
    
  }
}

const handleLikeAllTweetsFromUser = async(driver: string,twitterUserName: string, fetchedTweets: any)=>{
  try {
  const likeTweetsObject = {driverId : driver ,username : twitterUserName, tweetId:fetchedTweets}
   await requestApi('http://localhost:3002/selenium/twitter_like_all_tweets', {
   method: 'POST',
   headers: {
     "Content-Type": "application/json",
     "Access-Control-Allow-Origin": "*",
   },
   body: JSON.stringify(likeTweetsObject)
   })
  } catch(error){
    console.error(error)
  }
   
}
export default likeAllTweetsFromArray