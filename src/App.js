import "./App.css";
import React, { useEffect, useState } from "react";
import postRequestAPI from "./CustomHooks/PostRequestAPI";

function App() {
  const [chatGptCompletion, setChatGptCompletion] = useState("");
  const [inputChatGpt, setInputChatGpt] = useState("");
  const [isChatButtonClicked, setIsChatButtonClicked] = useState(false);
  const [gptPromptAndCompletions, setGptPromptAndCompletions] = useState(null);
  const [isGptResponseEmpty, setIsGptResponseEmpty] = useState(false);

  const getGptCompletion = async (inputChatGpt, gptPromptAndCompletions) => {
    let bodyPromptGpt = {};
    if (!gptPromptAndCompletions) {
      bodyPromptGpt = {
        prompt: inputChatGpt,
      };
    } else {
      bodyPromptGpt = {
        prompt: gptPromptAndCompletions,
      };
    }
    try {
      const responseChatGpt = await postRequestAPI(
        "http://localhost:3001/chat-gpt",
        bodyPromptGpt
      );
      setChatGptCompletion(responseChatGpt.data);
      if (!responseChatGpt.data) {
        setIsGptResponseEmpty(!isGptResponseEmpty);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!inputChatGpt) {
      return;
    }
    getGptCompletion(inputChatGpt, gptPromptAndCompletions);
  }, [isChatButtonClicked, isGptResponseEmpty]);

  const handleGptCompletion = (inputChatGpt, chatGptCompletion) => {
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
      setGptPromptAndCompletions(null);
    }
    setIsChatButtonClicked(!isChatButtonClicked);
  };

  const addTwitterPost = async (tweetContent) => {
    const tweetContentJoin = { text: tweetContent.join(" ") };
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
