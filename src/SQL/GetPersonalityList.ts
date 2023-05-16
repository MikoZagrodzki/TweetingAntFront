import { requestApi } from "../Funcinalities";

export const getPersonalityList = async () => {
  try {
    const response = await requestApi("http://localhost:3002/twitterClass/personality_List", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!response?.payload) {
      throw new Error("Response not exist");
    }

    const personalityList = response.payload.map((listItem: any) => {
      return listItem.personality
    })

    return personalityList
    
  } catch (error) {
    console.error(error);
  }
};

export default getPersonalityList;
