import { useState, useEffect} from "react";
import { useAuth } from "../../AuthContext";
import { generateTwitterAccounts } from "../../Funcinalities";
import Card from "../Card/Card";
import PopupAddAccount from "./PopupAddAccount/PopupAddAccount";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { TwitterAccountType } from "../../TypesApi";
import PopupLikesAttack from "./PopupLikesAttack/PopupLikesAttack";

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
    getLoginDataFromEmailFromSql();
  }, [dbTrigger]);

  return (
    <div className="Main-container">
      <div className="Main-header">
      <p>{currentUser.email} is logged in.</p>
      <PopupAddAccount
        dbTrigger={dbTrigger}
        setDbTrigger={setDbTrigger}
      />
      <PopupLikesAttack twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts}/>
      <button onClick={handleLogout}> Log out </button>
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