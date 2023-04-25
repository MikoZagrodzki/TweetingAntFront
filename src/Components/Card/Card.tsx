import { useRef, useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import SettingCard from "./SettingCard";
import FormUserContent from "../FormUserContent/FormUserContent";
import { updateIsAutomated } from "../../SQL";
import getUserNameUsedForTweetsByEmail from "../../SQL/GetUserNameUsedForTweetsByEmail";
import UserNamesList from "./UserNamesList";


interface Props {
  loginNameTwitter: string;
  email: string;
  isAutomated: boolean | undefined;
  howManyTweets: [] | { hours: number; minutes: number }[];
  howManyLikes: [] | { hours: number; minutes: number }[];
  howManyRetweets: [] | { hours: number; minutes: number }[];
  howManyComments: [] | { hours: number; minutes: number }[];
  dbTrigger:boolean,
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>,
}

function Card(props: Props) {
  const {
    loginNameTwitter: twitterAccount,
    email,
    isAutomated,
    howManyTweets,
    howManyLikes,
    howManyRetweets,
    howManyComments,
    dbTrigger,
    setDbTrigger
  } = props;


  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();

  const autommationSwitch = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    event.stopPropagation();
    await updateIsAutomated(twitterAccount, !isAutomated)
    setDbTrigger(!dbTrigger)
  }
  

  return (
    <div className="Card-container">
      <p>{twitterAccount}</p>
      <button type="button" onClick={openTooltip}>
        open
      </button>
      <div className="Card-automation-container">
        <p>{isAutomated ? "AUTOMATED" : "NOTAUTOMATED"}</p>
        <button className="Card-automation-button" onClick={autommationSwitch}>{isAutomated?"TURN OFF":"TURN ON"}</button>
      </div>
      <Popup ref={ref}>
        <div className="Card-popup-container">
          <div className="Card-popup-container-header">
            <h1>{twitterAccount}</h1>
            <p>{email}</p>
            <div className="Card-popup-automation-container">
            </div>
          </div>
          <div className="Card-settings-container">
            <SettingCard dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} loginNameTwitter={twitterAccount} purpose="tweet" howMany={howManyTweets} />
            <SettingCard dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} loginNameTwitter={twitterAccount} purpose="like" howMany={howManyLikes} />
            <SettingCard dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} loginNameTwitter={twitterAccount} purpose="retweet" howMany={howManyRetweets} />
            <SettingCard dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} loginNameTwitter={twitterAccount} purpose="comment" howMany={howManyComments} />
          </div>
          <div className="Card-forms-container">
            <div className="Form-and-list-container">
              <FormUserContent
                purpose="rephrase tweets"
                loginNameTwitter={twitterAccount}
                funcionallity="UserNameUsedForTweets"
              />
              <UserNamesList loginNameTwitter={twitterAccount} purpose="rephrasing tweets"/>
            </div>
            <div className="Form-and-list-container">
              <FormUserContent
                purpose="like/comment/retweet"
                loginNameTwitter={twitterAccount}
                funcionallity="UserContent"
              />
              <UserNamesList loginNameTwitter={twitterAccount} purpose="like/comment/retweet"/>
            </div>
          </div>
          <button
            type="button"
            className="Card closeButton"
            onClick={closeTooltip}
          >
            close
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default Card;
