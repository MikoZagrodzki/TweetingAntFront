import requestApi from "./RequestApi"
import { FetchTweet, Tweet } from "../TypesApi";
const fetchTweetsMap = (tweet: FetchTweet): Tweet => {
    return {
      tweetId: tweet.id,
      authorId: tweet.author_id,
      likeCount: tweet.public_metrics.like_count,
      retweetCount: tweet.public_metrics.retweet_count,
      text: tweet.text,
    };
  };


export const fetchTweets = async (fetchTweetsQuery: string) => {
    try {
    const apiResponse = await requestApi(
      `http://localhost:3002/twittersearch?query=${fetchTweetsQuery}  -is:reply&max_results=20&tweet.fields=public_metrics&media.fields=public_metrics&expansions=author_id&sort_order=relevancy`,
      {
        method: "GET",
      }
    );
      if (!apiResponse?.payload?._realData?.data){
        throw new Error('No data found in API response');
      }
    const mappedTweets = apiResponse.payload._realData.data.map(fetchTweetsMap);
    return mappedTweets;


    } catch(error) {
        console.error(error);
        throw error
    }
  };

  export default fetchTweets