import { useState } from "react";
import { useAuth } from "../AuthContext";
import { checkLoginData, insertLoginData } from "../SQL";
import { createSingleTwitterAccount } from "../Funcinalities";
import TwitterAccount from "../TwitterAccount";
import FormTwitterCredentials from "../Components/FormTwitterCredentials/FormTwitterCredentials";
import Card from "../Components/Card/Card";
import Popup from "reactjs-popup";
import PopupAddAccount from "../Components/PopupAddAccount/PopupAddAccount";
import "./Main.css";

interface Props {
  setTwitterClasses: React.Dispatch<
    React.SetStateAction<[] | TwitterAccount[]>
  >;
  twitterClasses: TwitterAccount[] | [];
}

function Main(props: Props) {
  const { currentUser }: any = useAuth();
  const { setTwitterClasses, twitterClasses } = props;
  const filteredTwitterClasses = twitterClasses.filter(
    (x) => x.email === currentUser.email
  );
  console.log(currentUser);
  return (
    <div className="Main-container">
      <PopupAddAccount
        setTwitterClasses={setTwitterClasses}
        twitterClasses={twitterClasses}
      />
      <div className="listOfCards-container">
        <ul>
          {filteredTwitterClasses.map((x) => {
            return (
              <li key={x.id}>
                <Card loginNameTwitter={x.loginNameTwitter} email={x.email} howManyTweets={x.howManyTweets} howManyLikes={x.howManyLikes} howManyRetweets={x.howManyLikes} howManyComments={x.howManyComments}/>
              </li>
            );
          })}
        </ul>
      </div>
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
