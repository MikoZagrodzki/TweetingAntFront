import requestApi from "./RequestApi";

export const generateTwitterClassAndPush = async (
  loginNametwitter: string,
  passwordTwitter: string,
  email: string
) => {
  const body = {
    loginNametwitter: loginNametwitter,
    passwordTwitter: passwordTwitter,
    email: email
  };
  try {
    const response = await requestApi(
      "http://localhost:3002/twitterClass/generate_Twitter_Class_And_Push",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      }
    );
    return response.payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default generateTwitterClassAndPush;
