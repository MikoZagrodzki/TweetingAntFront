import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { getLoginData, checkLoginData, insertLoginData } from "../../SQL";
import { generateTwitterAccounts }  from "../../Funcinalities";
import TwitterAccount from "../../TwitterAccount";
import FormTwitterCredentials from "../FormTwitterCredentials/FormTwitterCredentials";
import Card from "../Card/Card";
import Popup from "reactjs-popup";
import PopupAddAccount from "../PopupAddAccount/PopupAddAccount";
import "./Main.css";

interface LoginDataFromSql {
  loginNameTwitter : string; 
    email: string;
    id?: string;
    isAutomated: string;
    howManyTweets: any;
    howManyLikes: [] | { hours: number,  minutes: number }[];
    howManyRetweets: [] | { hours: number,  minutes: number }[];
    howManyComments: [] | { hours: number,  minutes: number }[];
}

interface Props {
  setTwitterClasses: React.Dispatch<
    React.SetStateAction<[] | TwitterAccount[]>
  >;
  twitterClasses: TwitterAccount[] | [];
}

function Main(props: Props) {
  const { currentUser }: any = useAuth();
  const { setTwitterClasses, twitterClasses } = props;
  const [loginDataFromSql, setLoginDataFromSql] = useState<LoginDataFromSql[] | []>([]);

  const getLoginDataFromSql = async () => {
    try{
    const response = await getLoginData(currentUser.email);
    console.log(response)
    const responseWithClasses = generateTwitterAccounts(response.payload)
    // const loginDataWithClass = new TwitterAccount()
    setLoginDataFromSql(responseWithClasses);
    }catch(error){
      console.log(error)
    }
  };

  useEffect(() => {
    getLoginDataFromSql();
  }, []);


  console.log(currentUser);
  return (
    <div className="Main-container">
      <PopupAddAccount
        setTwitterClasses={setTwitterClasses}
        twitterClasses={twitterClasses}
      />
      <div className="listOfCards-container">
        <ul>
          {loginDataFromSql.length > 0 &&
            loginDataFromSql.map((x) => {
              return (
                <li key={x.id}>
                  <Card
                    loginNameTwitter={x.loginNameTwitter}
                    email={x.email}
                    isAutomated={x.isAutomated}
                    howManyTweets={x.howManyTweets}
                    howManyLikes={x.howManyLikes}
                    howManyRetweets={x.howManyLikes}
                    howManyComments={x.howManyComments}
                  />
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
