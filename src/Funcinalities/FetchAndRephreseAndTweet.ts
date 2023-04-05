import { Tweet } from "../TypesApi";
import { getUserNameUsedForTweets, checkRephresedTweets, insertRephresedTweets} from "../SQL";
import fetchTweets from "./FetchTweets";
import addRephrasedTweetToTwitter from "./AddRephrasedTweetToTwitter";
import chatGpt from "./ChatGpt";



export async function fetchAndRephreseAndTweet(index:number = 0, addTweets: Tweet[] = [], loginNameTwitter:string,  ){
    let isTrue: boolean = false
    if (index > 20){
      return 
    }
    let addToIndex: number = index; 
    let tweets: [] | Tweet[] = addTweets
    console.log(addToIndex + 'AddToIndex');
    console.log(index + 'index')

    if (index === 0 ) {
    const twitterAccountsUsedForTweets = await getUserNameUsedForTweets(loginNameTwitter)
    const randomNumber = Math.floor(Math.random() * twitterAccountsUsedForTweets.length)
    tweets = await fetchTweets(twitterAccountsUsedForTweets[randomNumber]);
    console.log(tweets[0].text + ' Tweet\n\n')
    console.log(tweets[0].tweetId)
    isTrue = await checkRephresedTweets(loginNameTwitter, tweets[index].tweetId); 
    } else {
    isTrue = await checkRephresedTweets(loginNameTwitter, tweets[index].tweetId)
    }
    console.log(isTrue + ' isTrue')
    if (isTrue) {
      console.log('Loop is executed')
      addToIndex += 1;
      await fetchAndRephreseAndTweet(addToIndex, tweets, loginNameTwitter);

    } else {
      const rephresedTweet = await chatGpt(`Rephrese this tweet as a intelectual teenager, do not use more than 280 charaters and write it in english: ${tweets[index].text}`)
      await addRephrasedTweetToTwitter(rephresedTweet, loginNameTwitter)
      await insertRephresedTweets(loginNameTwitter, tweets[index].tweetId)
    }


  }

  export default fetchAndRephreseAndTweet