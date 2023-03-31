import "./App.css";
import React, { useEffect, useState } from "react";
import { useDailyTask } from "./CustomHooks";
import loginData from './Data/SimpleAccountList'



function App() {

 
  let twitterAccounts; 
  if (!twitterAccounts) {
  twitterAccounts = useDailyTask(loginData)
  console.log(twitterAccounts)
}
  
 

  return (
    <div className="App">

    </div>
  );
    }

export default App;
