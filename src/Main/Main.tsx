import { useState } from "react";
import { useAuth } from "../AuthContext";
import {checkLoginData, insertLoginData } from "../SQL";
import {createSingleTwitterAccount} from "../Funcinalities";
import TwitterAccount from "../TwitterAccount";
import FormTwitterCredentials from "../FormTwitterCredentials/FormTwitterCredentials";
import Card from "../Card/Card";

interface Props {
    setTwitterClasses: React.Dispatch<React.SetStateAction<[] | TwitterAccount[]>>
    twitterClasses: TwitterAccount[] | []
}

function Main(props : Props) {
  const { currentUser } : any = useAuth();
  const {setTwitterClasses, twitterClasses} = props
  const filteredTwitterClasses = twitterClasses.filter(x => x.email === currentUser.email)
  console.log(currentUser)
  return (
    <div className="Main-container">
      <FormTwitterCredentials setTwitterClasses={setTwitterClasses} twitterClasses={twitterClasses}/>
      <ul>
      {filteredTwitterClasses.map( x => {
        return (<li key={x.id} ><Card loginNameTwitter={x.loginNameTwitter}
                          
        /></li>)
      })}
     </ul>
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
