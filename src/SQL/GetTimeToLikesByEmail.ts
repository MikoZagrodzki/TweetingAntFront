import { requestApi } from "../Funcinalities";

export const getTimeToLikesByEmail = async (email: string) => {
  const body = {
    email: email,
  };
  try {
    const response = await requestApi(
      "http://localhost:3002/twitterClass/getTimeToLikesByEmail",
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
          email:x.email,
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

export default getTimeToLikesByEmail;
