import { requestApi } from "../Funcinalities";

const getTimeToRetweetsByEmail = async (email: string) => {
  const body = {
    email: email,
  };
  try {
    const response = await requestApi(
      "http://localhost:3002/twitterClass/getTimeToRetweetsByEmail",
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
    const groupedRetweets = response.payload.reduce((acc: any, curr: any) => {
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

    const mappedResponse = Object.keys(groupedRetweets).map((loginnametwitter) => {
      return {
        loginnametwitter,
        retweetsTime: groupedRetweets[loginnametwitter],
      };
    });
    // console.log(mappedResponse)
    return mappedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTimeToRetweetsByEmail;
