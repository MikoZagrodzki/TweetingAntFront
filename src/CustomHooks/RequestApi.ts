
const requestApi = async (
  url: string,
  reqParams:{}|undefined,
  // bodyValue: bodyPromptGpt | tweetContentJoin
) => {

    const response = await fetch(url, reqParams);
    if (!response.ok) {
      throw new Error("Please reload the app");
    }
    const apiResponse = await response.json();
    return apiResponse;

};

export default requestApi;

// {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
//   body: JSON.stringify(bodyValue),
// }
