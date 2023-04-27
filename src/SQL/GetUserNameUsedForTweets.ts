import { requestApi } from "../Funcinalities";

export const getUserNameUsedForTweets = async (loginNameTwitter: string) => {
  const body = {
    loginNameTwitter: loginNameTwitter,
  };
  try {
    const response = await requestApi(
      "http://localhost:3002/database/user_Name_Used_For_Tweets",
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
        return x.usernameusedfortweets
       })
        return mappedResponse
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserNameUsedForTweets;
