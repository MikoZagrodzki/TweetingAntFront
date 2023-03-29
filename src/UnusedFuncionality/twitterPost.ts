import { tweetContentJoin } from "../TypesApi";
import { requestApi } from "../Funcinalities";

export const addTwitterPost = async (tweetContent: string[]) => {
    const tweetContentJoin: tweetContentJoin = { text: tweetContent.join(" ") };
    try {
      requestApi("http://localhost:3002/twitterpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(tweetContentJoin),
      });
    } catch (error) {
      console.error(error);
    }
  };