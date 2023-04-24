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

interface Props {
    loginNameTwitter: string;
    purpose: string;
    dbTrigger: boolean;
    setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    hours:number;
    minutes:number;
    key:any;
  }

function SettingCardLiElement(props:Props) {
    const { key, loginNameTwitter, purpose, dbTrigger, setDbTrigger, hours, minutes } = props;
    const [isEditing, setIsEditing] = useState(false);

    const deleteSpecificTime = async (hours: number, minutes: number) => {
        try {
          switch (purpose) {
            case "tweet":
              await deleteTimeToTweetsSpecific(loginNameTwitter, hours, minutes);
              break;
            case "like":
              await deleteTimeToLikesSpecific(loginNameTwitter, hours, minutes);
              break;
            case "retweet":
              await deleteTimeToRetweetsSpecific(loginNameTwitter, hours, minutes);
              break;
            case "comment":
              await deleteTimeToCommentsSpecific(loginNameTwitter, hours, minutes);
              break;
            default:
              break;
          }
        }catch(error){
          console.error(error)
        }
        setDbTrigger(!dbTrigger);
      };
      

  return (
    <li key={key}>
    {!isEditing ? (
        <div className="setting-li-element">
          <p>{hours}:{minutes}</p>
        <button className="button-li" onClick={() => {setIsEditing(!isEditing)}}>✍️</button>
        <button className="button-li" onClick={() => {deleteSpecificTime(hours, minutes);}}>❌</button>
      </div>
    ) : (
      <div className="setting-li-editing">
        <input defaultValue={hours}></input>
        <input defaultValue={minutes}></input>
        <button className="setting-edit-input-button" onClick={()=>{setIsEditing(!isEditing)}}>✅</button>
      </div>
    )}
  </li>
  )
}

export default SettingCardLiElement