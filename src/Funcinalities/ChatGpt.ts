import requestApi from "./RequestApi";
import { bodyPromptGpt, ResponseChatGpt } from "../TypesApi";

export const chatGpt = async (inputChatGpt: string) => {
  const bodyPromptGpt: bodyPromptGpt = {
    prompt: inputChatGpt,
  };

  try {
    const responseChatGpt: ResponseChatGpt = await requestApi(
      "http://localhost:3002/chat-gpt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(bodyPromptGpt),
      }
    );
   
    // if (!responseChatGpt.data) {
    //   setIsGptResponseEmpty(!isGptResponseEmpty);
    // }
   const chatGptCompletion = responseChatGpt.data;
   return chatGptCompletion;
  } catch (error: any) {
    console.error(error.message);
  }
};

export default chatGpt;
