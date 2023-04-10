import "./App.css";
import React from "react";
import { getLoginData } from './SQL'
import { chatGpt, generateTwitterAccounts } from "./Funcinalities";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {AuthProvider} from './AuthContext'
import Login from "./AuthComponents/Login";
import Signup from "./AuthComponents/Signup";
import ForgotPassword from "./AuthComponents/ForgotPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import Main from './Main/Main'


function App() {
    let twitterAccountswithClass: any
    const createTwitterAccountsWithClass = async() => {
      const response = await getLoginData()
      twitterAccountswithClass = generateTwitterAccounts(response)
      return twitterAccountswithClass
      // twitterAccountswithClass[0].fetchRephreseTweetTwitter()
    }

  
  return (
    <div className="App-container">
      <Router basename="/">
        <AuthProvider>
          <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/' element={<PrivateRoute><Main/></PrivateRoute>}/>
          </Routes>
        </AuthProvider>
      </Router>
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