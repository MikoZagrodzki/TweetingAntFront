import "./App.css";
import React, { useEffect, useState } from "react";
import postRequestAPI from "./CustomHooks/PostRequestAPI";
import {bodyPromptGpt, tweetContentJoin} from "./TypesApi"

interface responseChatGpt{
  success: boolean,
  data:string
}


function App() {
  const [chatGptCompletion, setChatGptCompletion] = useState<string>("");
  const [inputChatGpt, setInputChatGpt] = useState<string>("");
  const [isChatButtonClicked, setIsChatButtonClicked] = useState<boolean>(false);
  const [gptPromptAndCompletions, setGptPromptAndCompletions] = useState<string[]>([]);
  const [isGptResponseEmpty, setIsGptResponseEmpty] = useState<boolean>(false);

  const getGptCompletion = async (inputChatGpt:string, gptPromptAndCompletions:string[]) => {
    // let bodyPromptGpt:bodyPromptGpt|Record<string, never> = {};
    // if (gptPromptAndCompletions?.length === 0) {
     const bodyPromptGpt:bodyPromptGpt = {
        prompt: inputChatGpt,
      };
    // } 
    // else {
    //   bodyPromptGpt = {
    //     prompt: gptPromptAndCompletions,
    //   };
    // }

    try {
      const responseChatGpt:responseChatGpt = await postRequestAPI(
        "http://localhost:3001/chat-gpt",
        bodyPromptGpt
      );
      console.log(responseChatGpt)
      console.log(responseChatGpt.data)
      setChatGptCompletion(responseChatGpt.data);
      if (!responseChatGpt.data) {
        setIsGptResponseEmpty(!isGptResponseEmpty);
      }
    } catch (error:any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!inputChatGpt) {
      return;
    }
    getGptCompletion(inputChatGpt, gptPromptAndCompletions);
  }, [isChatButtonClicked, isGptResponseEmpty]);

  const handleGptCompletion = (inputChatGpt:string, chatGptCompletion:string) => {
    setGptPromptAndCompletions([inputChatGpt, chatGptCompletion]);
    setInputChatGpt("");
  };

  useEffect(() => {
    if (!chatGptCompletion) {
      return;
    }
    handleGptCompletion(inputChatGpt, chatGptCompletion);
  }, [chatGptCompletion]);

  const requestGptCompletionButton = () => {
    if (gptPromptAndCompletions) {
      setGptPromptAndCompletions([]);
    }
    setIsChatButtonClicked(!isChatButtonClicked);
  };

  const addTwitterPost = async (tweetContent:string[]) => {
    const tweetContentJoin:tweetContentJoin = { text: tweetContent.join(" ") };
    try {
      postRequestAPI("http://localhost:3001/twitterpost", tweetContentJoin);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <textarea
        value={inputChatGpt}
        onChange={(e) => {
          setInputChatGpt(e.target.value);
        }}
      />
      <button onClick={requestGptCompletionButton}>Ask Chat GPT!</button>
      <button
        onClick={() => {
          addTwitterPost(gptPromptAndCompletions.slice(1));
        }}
      >
        Add to Twitter!
      </button>

      {gptPromptAndCompletions ? (
        <div>
          <p>Your Prompt: {gptPromptAndCompletions[0]}</p>
          <p>Chat GPT Answer: {gptPromptAndCompletions.slice(1)}</p>
        </div>
      ) : (
        <p>Type your question and find answer right away!</p>
      )}
    </div>
  );
}

export default App;
