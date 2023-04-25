import { requestApi } from "../Funcinalities";

export const getUserNameUsedForTweetsByEmail = async (email: string) => {
  const body = {
    email: email,
  };
  try {
    const response = await requestApi(
      "http://localhost:3002/database/user_Name_Used_For_Tweets_By_Email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      }
    );
    if (!response?.payload) {
      throw new Error("Response not exist");
    }
    const mappedResponse = response.payload.map((x: any) => {
      return [
        {
          loginnametwitter: x.loginnametwitter,
          usernameusedfortweets: x.usernameusedfortweets,
        },
      ];
    });
    return mappedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserNameUsedForTweetsByEmail;
