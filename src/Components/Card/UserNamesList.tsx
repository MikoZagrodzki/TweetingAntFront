import React, { useEffect, useState } from "react";
import getUserNameUsedForTweetsByEmail from "../../SQL/GetUserNameUsedForTweetsByEmail";
import UserNameListLiElemet from "./UserNameListLiElemet";
import { getUserContent, getUserNameUsedForTweets } from "../../SQL";
import "./Card.css";

interface Props {
  loginNameTwitter: string;
  purpose: string;
}

function UserNamesList(props: Props) {
  const { loginNameTwitter: twitterAccount, purpose } = props;

  const [dbNamesData, setDbNamesData] = useState<string[]>([]);
  const [dbNamesTrigget, setDbNamesTrigger] = useState(false);

  const getNames = async () => {
    let dbNames;
    switch (purpose) {
      case "rephrasing tweets":
        console.log("IM TRIGGERING UNSERNAMEUSEDFOR TWEETS")
        dbNames = await getUserNameUsedForTweets(twitterAccount);
        break;
      case "like/comment/retweet":
        console.log("IM TRIGGERING UNSECONTENT")
        dbNames = await getUserContent(twitterAccount)
        break;
      default:
        console.error("No functionallity passed");
    }
    setDbNamesData(dbNames);
    setDbNamesTrigger(!dbNamesTrigget);
    return dbNamesData;
  };

  useEffect(() => {
    getNames();
  }, []);
  
  useEffect(() => {
    if (dbNamesTrigget) {
      getNames();
    }
  }, [dbNamesTrigget]);

  return (
    <div className="List-name-container">
      <p>List of Twitter accounts used for {purpose} from:</p>
      <ul>
        {dbNamesData.map((name: string, index: number) => (
          <UserNameListLiElemet key={index} username={name} />
        ))}
      </ul>
    </div>
  );
}

export default UserNamesList;