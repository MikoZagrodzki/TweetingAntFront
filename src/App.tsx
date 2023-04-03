import "./App.css";
import React, { useEffect, useState } from "react";
import { useDailyTask } from "./CustomHooks";
import loginData from './Data/SimpleAccountList'
import { getUserNameUsedForTweets } from './SQL'
import { generateTwitterAccounts } from "./Funcinalities";




function App() {

 
  let twitterAccounts; 
  if (!twitterAccounts) {
  twitterAccounts =  useDailyTask()
}
  
  return (
    <div className="App">
      <button role='button' onClick={() => getUserNameUsedForTweets('ketaminion2137')}>GetLoginDataSql</button>
    </div>
  );
    }

export default App;


//
// we need a username array from which we will download tweets of specific twitter's user;
// fetch tweets; 
// select a tweet from tweets;
// check if tweet was already added;
// reprase tweet;
// trigger function AddRephrasedTweetToTwitter;



//SQL DATABASE
//Login_Password get/post request need for creating class. 
//