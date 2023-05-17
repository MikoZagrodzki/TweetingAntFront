import { requestApi } from "../Funcinalities";

const getIntensivity = async () => {

  try {
    const response = await requestApi(
      "http://localhost:3002/twitterClass/getIntensivity",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
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
