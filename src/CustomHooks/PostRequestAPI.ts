  import {bodyPromptGpt, tweetContentJoin} from "../TypesApi"
  const postRequestAPI = async (url:string, bodyValue:bodyPromptGpt|tweetContentJoin) => {
   console.log("body walue here"+bodyValue)
    const response = await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(bodyValue),
      });
      if (!response.ok) {
        throw new Error("Please reload the app");
      }
      const apiResponse = await response.json();
      return apiResponse 
}

export default postRequestAPI