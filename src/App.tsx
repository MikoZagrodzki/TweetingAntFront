import "./App.css";
import React from "react";
import { getLoginData } from './SQL'
import { chatGpt, generateTwitterAccounts } from "./Funcinalities";

1


function App() {
    let twitterAccountswithClass: any
    const createTwitterAccountsWithClass = async() => {
      const response = await getLoginData()
      twitterAccountswithClass = generateTwitterAccounts(response)
      return twitterAccountswithClass
      // twitterAccountswithClass[0].fetchRephreseTweetTwitter()
    }

  
  return (
    <div className="App">
      <button role='button' onClick={() => createTwitterAccountsWithClass()}>Create Twitter Classes</button>
      <button role='button' onClick={() => twitterAccountswithClass[2].fetchAndLikeTweet()}>TESTBITCH</button>
      <button role='button' onClick={() => chatGpt('whats up my baby')}>TEST GPT</button>
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