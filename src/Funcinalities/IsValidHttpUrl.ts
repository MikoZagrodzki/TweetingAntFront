import { Tweet } from "../TypesApi";

export const isValidHttpUrl = (tweets: Tweet[]) => {
    // checks if tweets have valid or not valid url, if not valid url found in tweet function returns tweet. (tweet: string).
    let isUrl: boolean = false;
    let tweet!: string;

    for (let i = 0; i < tweets.length; i++) {
      let url;
      try {
        url = new URL(tweets[i].text);
      } catch (erorr) {
        tweet = tweets[i].text;
        return tweet;
      }
      isUrl = url.protocol === "http:" || url.protocol === "https:";
      if (isUrl === false) {
        tweet = tweets[i].text;
        return tweet;
      }
    }
    if (!tweet) {
        console.error("Proper Tweet to rephrase not found");
        return;
      }
  };

  export default isValidHttpUrl