import { requestApi } from "../Funcinalities";

export const getUserContentByEmail = async (email: string) => {
  const body = {
    email: email,
  };
  try {
    const response = await requestApi(
      "http://localhost:3002/database/user_Content_By_Email",
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
    const groupedContent = response.payload.reduce((acc: any, curr: any) => {
      if (acc[curr.loginnametwitter]) {
        acc[curr.loginnametwitter].push(curr.usercontent);
      } else {
        acc[curr.loginnametwitter] = [curr.usercontent];
      }
      return acc;
    }, {});

    const mappedResponse = Object.keys(groupedContent).map((loginnametwitter) => {
      return {
        loginnametwitter,
        usercontent: groupedContent[loginnametwitter],
      };
    });

    // console.log(mappedResponse)
    return mappedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserContentByEmail;
