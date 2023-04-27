import { requestApi } from "../Funcinalities";

const getTimeToCommentsByEmail = async (email: string) => {
  const body = {
    email: email,
  };
  try {
    const response = await requestApi(
      "http://localhost:3002/twitterClass/getTimeToCommentsByEmail",
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
    const groupedComments = response.payload.reduce((acc: any, curr: any) => {
      if (acc[curr.loginnametwitter]) {
        acc[curr.loginnametwitter].push({
          hours: curr.hours,
          minutes: curr.minutes,
        });
      } else {
        acc[curr.loginnametwitter] = [
          {
            hours: curr.hours,
            minutes: curr.minutes,
          },
        ];
      }
      return acc;
    }, {});

    const mappedResponse = Object.keys(groupedComments).map((loginnametwitter) => {
      return {
        loginnametwitter,
        commentsTime: groupedComments[loginnametwitter],
      };
    });
    console.log(mappedResponse)
    return mappedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export default getTimeToCommentsByEmail;
