import { requestApi } from "../Funcinalities";

const getIntensivity = async (loginNameTwitter: string) => {
  const body = {
    loginNameTwitter: loginNameTwitter,
  };
  try {
    const response = await requestApi(
      "http://localhost:3002/twitterClass/getIntensivity",
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
    return response.payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export default getIntensivity;