import { useState } from "react";
import { useAuth } from "../AuthContext";
import {checkLoginData, insertLoginData } from "../SQL";
import {createSingleTwitterAccount} from "../Funcinalities";
import TwitterAccount from "../TwitterAccount";
import FormTwitterCredentials from "../FormTwitterCredentials/FormTwitterCredentials";



function Main() {
  const { currentUser } = useAuth();
  
  return (
    <div className="Main-container">
      <FormTwitterCredentials/>
      <p>{currentUser.email} is logged in.</p>
    </div>
  );
}

export default Main;

// function handleFormSubmit(event) {
//     event.preventDefault(); // prevent the form from submitting normally

//     const form = event.target; // get a reference to the form element
//     const formData = new FormData(form); // create a FormData object from the form data
//     const values = Object.fromEntries(formData.entries()); // convert the FormData to an object

//     console.log(values); // log the object of form values
//   }
