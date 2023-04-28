import React, { useState } from "react";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import {
  deleteTimeToTweetsSpecific,
  deleteTimeToLikesSpecific,
  deleteTimeToRetweetsSpecific,
  deleteTimeToCommentsSpecific,
  updateTimeToTweetsSpecific,
  updateTimeToLikesSpecific,
  updateTimeToRetweetsSpecific,
  updateTimeToCommentsSpecific,
} from "../../SQL";
import { TwitterAccountType } from "../../TypesApi";

interface Props {
    loginNameTwitter: string;
    purpose: string;
    dbTrigger: boolean;
    setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    hours:number;
    minutes:number;
    twitterAccounts: TwitterAccountType[];
    setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
  }
interface Times{
  hours?:number;
  minutes?:number
}

function SettingCardLiElement(props:Props) {
    const { loginNameTwitter, purpose, dbTrigger, setDbTrigger, hours, minutes, twitterAccounts, setTwitterAccounts } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [times, setTimes]=useState<Times>({})
    const [hoursState, setHoursState] = useState(hours);
    const [minutesState, setMinutesState] = useState(minutes);
  

    const deleteSpecificTime = async (hours: number, minutes: number) => {
      try {
        const twitterClassAccount = twitterAccounts.find(
          (account) => account.loginNameTwitter === loginNameTwitter
        );
        switch (purpose) {
          case "tweet":
            await deleteTimeToTweetsSpecific(loginNameTwitter, hours, minutes);
            if (twitterClassAccount && typeof twitterClassAccount.removeTimesToTweet === 'function') {
              twitterClassAccount.removeTimesToTweet(hours, minutes);
            }
            break;
          case "like":
            await deleteTimeToLikesSpecific(loginNameTwitter, hours, minutes);
            if (twitterClassAccount && typeof twitterClassAccount.removeTimesToLike === 'function') {
              twitterClassAccount.removeTimesToLike(hours, minutes);
            }
            break;
          case "retweet":
            await deleteTimeToRetweetsSpecific(loginNameTwitter, hours, minutes);
            if (twitterClassAccount && typeof twitterClassAccount.removeTimesToRetweet === 'function') {
              twitterClassAccount.removeTimesToRetweet(hours, minutes);
            }
            break;
          case "comment":
            await deleteTimeToCommentsSpecific(loginNameTwitter, hours, minutes);
            if (twitterClassAccount && typeof twitterClassAccount.removeTimesToComment === 'function') {
              twitterClassAccount.removeTimesToComment(hours, minutes);
            }
            break;
            default:
              break;
            }
            setTwitterAccounts([...twitterAccounts]);
      }catch(error){
        console.error(error)
      }
    };

    const updateSpecificTime = async (hours: number, minutes: number, updatedHours:number, updatedMinutes:number) => {
        try {
          switch (purpose) {
            case "tweet":
              await updateTimeToTweetsSpecific(loginNameTwitter, hours, minutes, updatedHours, updatedMinutes);
              break;
            case "like":
              await updateTimeToLikesSpecific(loginNameTwitter, hours, minutes, updatedHours, updatedMinutes);
              break;
            case "retweet":
              await updateTimeToRetweetsSpecific(loginNameTwitter, hours, minutes, updatedHours, updatedMinutes);
              break;
            case "comment":
              await updateTimeToCommentsSpecific(loginNameTwitter, hours, minutes, updatedHours, updatedMinutes);
              break;
            default:
              break;
          }
        }catch(error){
          console.error(error)
        }
        setIsEditing(!isEditing)
        setDbTrigger(!dbTrigger);
      };

      function inputValueHours(e: React.ChangeEvent<HTMLInputElement>){
        setHoursState(Number(e.target.value))
        setTimes({...times, hours: Number(e.target.value)})
      }
      function inputValueMinutes(e: React.ChangeEvent<HTMLInputElement>){
        setMinutesState(Number(e.target.value))
        setTimes({...times, minutes: Number(e.target.value)})
      }
      
      function isEditingTrigger(hours:number, minutes:number){
        setTimes({hours: hours, minutes: minutes})
        setIsEditing(!isEditing)
      }

  return (
    <li key={uuidv4()}>
    {!isEditing ? (
        <div className="setting-li-element">
          <p>{hours}:{minutes}</p>
        <button className="button-li" onClick={() => {isEditingTrigger(hours, minutes)}}>✍️</button>
        <button className="button-li" onClick={() => {deleteSpecificTime(hours, minutes)}}>❌</button>
      </div>
    ) : (
      <div className="setting-li-editing">
        <input defaultValue={hours} onChange={inputValueHours}></input>
        <input defaultValue={minutes} onChange={inputValueMinutes}></input>
        <button className="setting-edit-input-button" onClick={()=>{updateSpecificTime(hours, minutes, hoursState, minutesState)}}>✅</button>
      </div>
    )}
  </li>
  )
}

export default SettingCardLiElement