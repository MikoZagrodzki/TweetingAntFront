import "./App.css";
import React, { useEffect, useState } from "react";
import { useDailyTask } from "./CustomHooks";



function App() {

 
  let twitterAccounts; 
  if (!twitterAccounts) {
  twitterAccounts = useDailyTask(['1','2','3','4','5'])
  console.log(twitterAccounts)
}
  
 

  return (
    <div className="App">

    </div>
  );
    }

export default App;
