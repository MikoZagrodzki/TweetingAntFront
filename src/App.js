import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [chatGptResponse, setChatGptResponse] = useState("");
  const [inputChat, setInputChat] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [responseArray, setResponseArray] = useState([]);
  const [numberSentences, setNumberSentences] = useState(1)

  //to my byc wywolywane na chatGptResponsee✅
  //array✅
  //prompt+response do array✅
  //jezeli array jest pusty to prompt idzie do array✅
  //jezeli array nie jest pusty to tylko push response✅
  
  //getApiGpt logika na numSentences

  //useState wywolany na response - fetch
  //join cala array i podac jako prompt

  const getApiGpt = async () => {
    let bodyChat = {
      prompt: inputChat,
    };
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
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!inputChat && !buttonClick) {
      return;
    }

    if (responseArray.length - 1 === numberSentences) {
      return
    }
    getApiGpt();
  }, [buttonClick,responseArray]);

  const handleResponse = () => {
    if (responseArray.length === 0) {
      setResponseArray([...responseArray, inputChat, chatGptResponse]);
    } else {
      setResponseArray(...responseArray, chatGptResponse);
    }
  };
  // console.log(responseArray)
  // console.log(typeof responseArray)

  useEffect(() => {
    if (!chatGptResponse) {
      return 
    }
    handleResponse();
  }, [chatGptResponse]);

  // if (chatGptResponse) {
  //   handleResponse() }

  return (
    <div className="App">
      <input
        onChange={(e) => {
          setInputChat(e.target.value);
        }}
      ></input>
      <button onClick={() => setButtonClick(!buttonClick)}>test</button>
      <input type='number' onChange={(e) => setNumberSentences(e.target.value)}></input>
      <p>{chatGptResponse}</p>
      <h1>{responseArray}</h1>
    </div>
  );
}

export default App;
