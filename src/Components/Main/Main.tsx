import { useState, useEffect} from "react";
import { useAuth } from "../../AuthContext";
import { generateTwitterAccounts } from "../../Funcinalities";
import Card from "../Card/Card";
import PopupAddAccount from "../PopupAddAccount/PopupAddAccount";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { TwitterAccountType } from "../../TypesApi";

// interface TwitterAccounts {
//   loginNameTwitter: string;
//   email: string;
//   id?: number;
//   isAutomated: boolean;
//   timesToTweet: [] | { hours: number; minutes: number }[];
//   timesToLike: [] | { hours: number; minutes: number }[];
//   timesToRetweet: [] | { hours: number; minutes: number }[];
//   timesToComment: [] | { hours: number; minutes: number }[];
//   usernameForTweets: [] | string[];
//   usernameForContent: [] | string[];
// }

interface Props {
}

function Main() {
  const { currentUser, logOut }: any = useAuth();
  const [twitterAccounts, setTwitterAccounts] = useState<TwitterAccountType[] | []>([]);
  const [error, setError] = useState('');
  const [dbTrigger, setDbTrigger] = useState<boolean>(false)


  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logOut();
      navigate('/login', { replace: true });
    } catch(error) {
      setError('Failed to log out');
    }
  }

  const getLoginDataFromEmailFromSql = async () => {
    try {
      const responseWithClasses = await generateTwitterAccounts(currentUser.email);
      setTwitterAccounts(responseWithClasses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    getLoginDataFromEmailFromSql();
  }, [dbTrigger]);

  return (
    <div className="Main-container">
      <div className="Main-header">
      <p>{currentUser.email} is logged in.</p>
      <button onClick={handleLogout}> Log out </button>
      <PopupAddAccount
        dbTrigger={dbTrigger}
        setDbTrigger={setDbTrigger}
      />
      </div>
      <div className="listOfCards-container">
        <ul>
          {twitterAccounts.length > 0 &&
            twitterAccounts.map((x) => {
              return (
                <li key={x.id}>
                  <Card
                    loginNameTwitter={x.loginNameTwitter}
                    email={x.email}
                    isAutomated={x.isAutomated}
                    timesToTweet={x.timesToTweet}
                    timesToLike={x.timesToLike}
                    timesToRetweet={x.timesToRetweet}
                    timesToComment={x.timesToComment}
                    usernameForTweets={x.usernameForTweets}
                    usernameForContent={x.usernameForContent}
                    dbTrigger={dbTrigger}
                    setDbTrigger={setDbTrigger}
                    twitterAccounts={twitterAccounts}
                    setTwitterAccounts={setTwitterAccounts}
                  />
                </li>
              );
            })}
        </ul>
      </div>
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
