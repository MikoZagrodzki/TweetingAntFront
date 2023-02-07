import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [chatGptResponse, setChatGptResponse] = useState("");
  const [inputChat, setInputChat] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [responseArray, setResponseArray] = useState([]);
  const [numberSentences, setNumberSentences] = useState(1);
  const [isResponseEmpty, setResponseEmpty] = useState(false);

  const getApiGpt = async () => {
    let bodyChat = {};
    if (responseArray.length === 0) {
      bodyChat = {
        prompt: inputChat,
      };
      console.log(4);
    } else {
      bodyChat = {
        prompt: responseArray,
      };
      console.log(3);
    }
    try {
      const response = await fetch("http://localhost:3001/find-complexity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(bodyChat),
      });
      if (!response.ok) {
        throw new Error("Please reload the app");
      }
      const chatResponse = await response.json();
      setChatGptResponse(chatResponse.data);
      console.log(chatResponse);

      if (!chatResponse.data) {
        setResponseEmpty(!isResponseEmpty);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!inputChat && !buttonClick) {
      return;
    }
    console.log(responseArray.length + "array ");
    console.log(numberSentences + "number of sentences ");
    if (
      responseArray.length - 1 === numberSentences ||
      responseArray.length > numberSentences
    ) {
      let lastElem = responseArray[responseArray.length - 1];
      let cutIndex = lastElem.search(/[.!?]/);

      if (cutIndex !== -1) {
        lastElem = lastElem.slice(0, cutIndex + 1);
      } else {
        getApiGpt();
      }
      responseArray[responseArray.length - 1] = lastElem;
      setResponseArray(responseArray);
      setInputChat("");
      setNumberSentences(1);
      return;
    }
    getApiGpt();
  }, [buttonClick, responseArray, isResponseEmpty]);

  const handleResponse = () => {
    if (responseArray.length === 0) {
      setResponseArray([...responseArray, inputChat, chatGptResponse]);
      console.log(1);
    } else {
      setResponseArray([...responseArray, chatGptResponse]);
      console.log(2);
    }
  };
  // console.log(responseArray)
  // console.log(typeof responseArray)

  useEffect(() => {
    if (!chatGptResponse) {
      return;
    }
    handleResponse();
  }, [chatGptResponse]);

  const handleClick = () => {
    if (responseArray) {
      setResponseArray([]);
      setButtonClick(!buttonClick);
    } else {
      setButtonClick(!buttonClick);
    }
  };

  // if (chatGptResponse) {
  //   handleResponse() }
  const twitterPostReq = async (tweetContent) => {
    const tweetContentJoin = tweetContent.join(" ");
    let body = { text: tweetContentJoin };
    try {
      const response = await fetch("http://localhost:3001/twitterpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Please reload the app");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <textarea
        value={inputChat}
        onChange={(e) => {
          setInputChat(e.target.value);
        }}
      />
      <button onClick={handleClick}>Ask Chat GPT!</button>
      <button
        onClick={() => {
          twitterPostReq(responseArray.slice(1));
        }}
      >
        Add to Twitter!
      </button>
      <select
        value={numberSentences}
        onChange={(e) => {
          setNumberSentences(e.target.value);
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      {responseArray.length > 0 ? (
        <div>
          <p>Your Prompt: {responseArray[0]}</p>
          <p>Chat GPT Answer: {responseArray.slice(1)}</p>
        </div>
      ) : (
        <p>Type your question and find answer right away!</p>
      )}
    </div>
  );
}

export default App;
