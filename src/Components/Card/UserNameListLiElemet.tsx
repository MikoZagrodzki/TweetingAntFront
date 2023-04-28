import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Card.css";
import { deleteUserContentSpecific, deleteUserNameUsedForTweetsSpecific } from "../../SQL";
import { TwitterAccountType } from "../../TypesApi";

interface Props {
  username: string;
  purpose:string;
  loginNameTwitter:string;
  // setDbNamesTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
}


function UserNameListLiElemet(props: Props) {
  const { username, purpose, loginNameTwitter:twitterAccount, twitterAccounts, setTwitterAccounts, } = props;

  const deleteUsername = async (twitterAccount: string, username: string) => {
    const twitterClassAccount = twitterAccounts.find(
      (account) => account.loginNameTwitter === twitterAccount
    );
    switch (purpose) {
      case "rephrasing tweets":
        console.log("IM TRIGGERING UNSERNAMEUSEDFOR TWEETS");
        await deleteUserNameUsedForTweetsSpecific(twitterAccount, username);
        if (twitterClassAccount && typeof twitterClassAccount.removeUsernameFromTweets === 'function') {
          twitterClassAccount.removeUsernameFromTweets(username);
          setTwitterAccounts([...twitterAccounts]);
        }
        break;
      case "like/comment/retweet":
        console.log("IM TRIGGERING UNSECONTENT");
        await deleteUserContentSpecific(twitterAccount, username);
        if (twitterClassAccount && typeof twitterClassAccount.removeUserContent === 'function') {
          twitterClassAccount.removeUserContent(username);
          setTwitterAccounts([...twitterAccounts]);
        }
        break;
      default:
        console.error("No functionality passed");
    }
  };

  return (
    <li key={uuidv4()}>
      {username}
      <button className="button-li" onClick={() => {deleteUsername(twitterAccount, username)}}>
        ❌
      </button>
    </li>
  );
}

export default UserNameListLiElemet;
