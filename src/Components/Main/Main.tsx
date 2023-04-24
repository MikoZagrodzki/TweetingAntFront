import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../AuthContext";
import { getLoginData, checkLoginData, insertLoginData } from "../../SQL";
import { generateTwitterAccounts } from "../../Funcinalities";
import TwitterAccount from "../../TwitterAccount";
import Card from "../Card/Card";
import Popup from "reactjs-popup";
import PopupAddAccount from "../PopupAddAccount/PopupAddAccount";
import "./Main.css";
import FormUserNameUsedForTweets from "../FormUserContent/FormUserContent";
import { useNavigate } from "react-router-dom";

interface LoginDataFromSql {
  loginNameTwitter: string;
  email: string;
  id?: string;
  isAutomated: boolean;
  howManyTweets: any;
  howManyLikes: [] | { hours: number; minutes: number }[];
  howManyRetweets: [] | { hours: number; minutes: number }[];
  howManyComments: [] | { hours: number; minutes: number }[];
}

interface Props {
  setTwitterClasses: React.Dispatch<
    React.SetStateAction<[] | TwitterAccount[]>
  >;
  twitterClasses: TwitterAccount[] | [];
}

function Main(props: Props) {
  const { currentUser, logOut }: any = useAuth();
  const { setTwitterClasses, twitterClasses } = props;
  const [loginDataFromSql, setLoginDataFromSql] = useState<LoginDataFromSql[] | []>([]);
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

  const getLoginDataFromSql = async () => {
    try {
      const response = await getLoginData(currentUser.email);
      console.log(response);
      const responseWithClasses = generateTwitterAccounts(response.payload);
      // const loginDataWithClass = new TwitterAccount()
      setLoginDataFromSql(responseWithClasses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    getLoginDataFromSql();
  }, [dbTrigger]);

  console.log(currentUser);
  return (
    <div className="Main-container">
      <div className="Main-header">
      <p>{currentUser.email} is logged in.</p>
      <button onClick={handleLogout}> Log out </button>
      <PopupAddAccount
        setTwitterClasses={setTwitterClasses}
        twitterClasses={twitterClasses}
      />
      </div>
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
                    dbTrigger={dbTrigger}
                    setDbTrigger={setDbTrigger}
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
