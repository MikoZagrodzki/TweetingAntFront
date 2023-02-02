import "./App.css";
import { useEffect, useState } from "react";


function App() {
  const [chatGptResponse, setChatGptResponse] = useState("");
  const [inputChat, setInputChat] = useState("")


  // useEffect = (() =>{
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
    } catch (error) {}
  };
  // getApiGpt()
  //  },[])

  return (
    <div className="App">
      <input onChange={(e)=>{setInputChat(e.target.value)}}></input>
      <button onClick={getApiGpt}>test</button>
      <p>{chatGptResponse}</p>
      {/* <button onClick={twitterPost}>test</button> */}
    </div>
  );
}

export default App;
