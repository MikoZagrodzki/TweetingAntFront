import "./App.css";
import React, { useState } from "react";
import { getLoginDataFromEmail, getUserContentByEmail } from "./SQL";
import { chatGpt, generateTwitterAccounts } from "./Funcinalities";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./AuthComponents/Login";
import Signup from "./AuthComponents/Signup";
import ForgotPassword from "./AuthComponents/ForgotPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Main from "./Components/Main/Main";
import TwitterAccount from "./TwitterAccount";
import { fetchTweets } from "./Funcinalities";
import getTimeToCommentsByEmail from "./SQL/GetTimeToCommentsByEmail";
import getTimeToLikesByEmail from "./SQL/GetTimeToLikesByEmail";
import getTimeToRetweetsByEmail from "./SQL/GetTimeToRetweetsByEmail";
import getTimeToTweetsByEmail from "./SQL/GetTimeToTweetsByEmail";
import getUserNameUsedForTweetsByEmail from "./SQL/GetUserNameUsedForTweetsByEmail";

function App() {
  const [twitterClasses, setTwitterClasses] = useState<TwitterAccount[] | []>(
    []
  );
  let twitterAccountswithClass: TwitterAccount[];

  // const createTwitterAccountsWithClass = async() => {
  //   const response = await getLoginDataFromEmail()
  //   twitterAccountswithClass = generateTwitterAccounts(response)
  //   setTwitterClasses(twitterAccountswithClass)
  //   // twitterAccountswithClass[0].fetchRephreseTweetTwitter()
  // }

  async function test() {
    let email = "admin@admin.admin";
    // await getLoginDataFromEmail(email);
    // await getTimeToCommentsByEmail(email);
    // await getTimeToLikesByEmail(email);
    // await getTimeToRetweetsByEmail(email)
    // await getTimeToTweetsByEmail(email)
    // await getUserContentByEmail(email)
    // await getUserNameUsedForTweetsByEmail(email)
  }
  return (
    <div className="App-container">
      <Router basename="/">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Main
                    setTwitterClasses={setTwitterClasses}
                    twitterClasses={twitterClasses}
                  />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
      <button onClick={test}>TEST</button>
      {/* <button role='button' onClick={() => createTwitterAccountsWithClass()}>Create Twitter Classes</button> */}
      {/* <button role='button' onClick={() => twitterAccountswithClass[2].fetchAndLikeTweet()}>TESTBITCH</button>
      <button role='button' onClick={() => chatGpt('whats up my baby')}>TEST GPT</button>
      <button role='button' onClick={() => fetchTweets('elonmusk')}>Fetchowanko</button> */}
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
