import React, { useEffect, useState } from "react";
import getUserNameUsedForTweetsByEmail from "../../SQL/GetUserNameUsedForTweetsByEmail";
import UserNameListLiElemet from "./UserNameListLiElemet";
import { getUserContent, getUserNameUsedForTweets } from "../../SQL";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import { TwitterAccountType } from "../../TypesApi";

interface Props {
  loginNameTwitter: string;
  purpose: string;
  names: [] | string[];
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<
    React.SetStateAction<[] | TwitterAccountType[]>
  >;
}

function UserNamesList(props: Props) {
  const {
    loginNameTwitter: twitterAccount,
    purpose,
    names,
    twitterAccounts,
    setTwitterAccounts,
  } = props;

  return (
    <div className="List-name-container">
      <p>List of Twitter accounts used for {purpose} from:</p>
      <ul>
        {names.map((name) => (
          <UserNameListLiElemet
            key={uuidv4()}
            purpose={purpose}
            username={name}
            loginNameTwitter={twitterAccount}
            twitterAccounts={twitterAccounts}
            setTwitterAccounts={setTwitterAccounts}
          />
        ))}
      </ul>
    </div>
  );
}

export default UserNamesList;
