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

interface Props {
  loginNameTwitter: string;
  purpose: string;
  howMany: [] | { hours: number; minutes: number }[];
  dbTrigger: boolean;
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettingCard(props: Props) {
  const { loginNameTwitter, purpose, howMany, dbTrigger, setDbTrigger } = props;
  const [isEditing, setIsEditing] = useState(false);

  const updateIntensivity = async (value: number) => {
    try {
      switch (purpose) {
        case "tweet":
          await updateTweetsIntensivity(loginNameTwitter, value);
          break;
        case "like":
          await updateLikesIntensivity(loginNameTwitter, value);
          break;
        case "retweet":
          await updateRetweetsIntensivity(loginNameTwitter, value);
          break;
        case "comment":
          await updateCommentsIntensivity(loginNameTwitter, value);
          break;
        default:
          break;
      }
      setDbTrigger(!dbTrigger);
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
      >
        <option value={99}>{purpose} intensivity low</option>
        <option value={99}>{purpose} intensivity medium</option>
        <option value={99}>{purpose} intensivity high</option>
        <option value={0}>{purpose} OFF</option>
      </select>
      <p>I am gonna {props.purpose} at:</p>
      <ul>
        {howMany.length > 0 &&
          howMany.map((x) => {
            return (
              <SettingCardLiElement key={uuidv4()} loginNameTwitter={loginNameTwitter} purpose={purpose} dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} hours={x.hours} minutes={x.minutes}/>
            );
          })}
      </ul>
    </div>
  );
}

export default SettingCard;
