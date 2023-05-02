import React, { useState } from "react";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import {
  updateTweetsIntensivity,
  updateLikesIntensivity,
  updateRetweetsIntensivity,
  updateCommentsIntensivity,
  deleteTimeToTweetsSpecific,
  deleteTimeToLikesSpecific,
  deleteTimeToRetweetsSpecific,
  deleteTimeToCommentsSpecific,
} from "../../SQL";
import SettingCardLiElement from "./SettingCardLiElement";
import { TwitterAccountType } from "../../TypesApi";

interface Props {
  loginNameTwitter: string;
  purpose: string;
  howMany: [] | { hours: number; minutes: number }[];
  dbTrigger: boolean;
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<
    React.SetStateAction<[] | TwitterAccountType[]>
  >;
}

function SettingCard(props: Props) {
  const {
    loginNameTwitter,
    purpose,
    howMany,
    dbTrigger,
    setDbTrigger,
    twitterAccounts,
    setTwitterAccounts,
  } = props;
  const [isEditing, setIsEditing] = useState(false);

  const twitterClassAccount = twitterAccounts.find(
    (account) => account.loginNameTwitter === loginNameTwitter
  );

  const updateIntensivity = async (value: number) => {
    try {
      switch (purpose) {
        case "tweet":
          if (twitterClassAccount && typeof twitterClassAccount.updateTimesToTweetIntensivity === 'function') {
            twitterClassAccount.updateTimesToTweetIntensivity(value);
          }
          break;
        case "like":
          if (twitterClassAccount && typeof twitterClassAccount.updateTimesToLikeIntensivity === 'function') {
            twitterClassAccount.updateTimesToLikeIntensivity(value);
          }
          break;
        case "retweet":
          if (twitterClassAccount && typeof twitterClassAccount.updateTimesToRetweetIntensivity === 'function') {
            twitterClassAccount.updateTimesToRetweetIntensivity(value);
          }
          break;
        case "comment":
          if (twitterClassAccount && typeof twitterClassAccount.updateTimesToCommentIntensivity === 'function') {
            twitterClassAccount.updateTimesToCommentIntensivity(value);
          }
          break;
        default:
          break;
      }
      setTwitterAccounts([...twitterAccounts]);
    } catch (error) {
      console.error(error);
    }
  };

  const getDefaultIntensivity = () => {
    try {
      switch (purpose) {
        case "tweet":
          return twitterClassAccount?.tweetsIntensivity;
        case "like":
          return twitterClassAccount?.likesIntensivity;
        case "retweet":
          return twitterClassAccount?.retweetsIntensivity;
        case "comment":
          return twitterClassAccount?.commentsintensivity;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="SettingCard-container">
      <select
        name="intensivity_setter"
        id=""
        onChange={(e) => updateIntensivity(Number(e.target.value))}
        defaultValue={getDefaultIntensivity()}
      >
        <option value={1}>{purpose} intensivity low</option>
        <option value={5}>{purpose} intensivity medium</option>
        <option value={10}>{purpose} intensivity high</option>
        <option value={0}>{purpose} OFF</option>
      </select>
      <p>I am gonna {props.purpose} at:</p>
      <ul>
        {howMany.length > 0 &&
          howMany.map((x) => {
            return (
              <SettingCardLiElement
                loginNameTwitter={loginNameTwitter}
                purpose={purpose}
                hours={x.hours}
                minutes={x.minutes}
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default SettingCard;
