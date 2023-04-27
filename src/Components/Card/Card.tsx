import { useRef, useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import SettingCard from "./SettingCard";
import FormUserContent from "../FormUserContent/FormUserContent";
import { updateIsAutomated } from "../../SQL";
import UserNamesList from "./UserNamesList";
import Personality from "./Personality";
import { TwitterAccountType } from "../../TypesApi";


interface Props {
  loginNameTwitter: string;
  email: string;
  isAutomated: boolean | undefined;
  timesToTweet: [] | { hours: number; minutes: number }[];
  timesToLike: [] | { hours: number; minutes: number }[];
  timesToRetweet: [] | { hours: number; minutes: number }[];
  timesToComment: [] | { hours: number; minutes: number }[];
  usernameForTweets: [] | string[];
  usernameForContent: [] | string[];
  dbTrigger:boolean;
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
}

function Card(props: Props) {
  const {
    loginNameTwitter: twitterAccount,
    email,
    isAutomated,
    timesToTweet,
    timesToLike,
    timesToRetweet,
    timesToComment,
    usernameForTweets,
    usernameForContent,
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
            <SettingCard dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} loginNameTwitter={twitterAccount} purpose="tweet" howMany={timesToTweet} />
            <SettingCard dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} loginNameTwitter={twitterAccount} purpose="like" howMany={timesToLike} />
            <SettingCard dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} loginNameTwitter={twitterAccount} purpose="retweet" howMany={timesToRetweet} />
            <SettingCard dbTrigger={dbTrigger} setDbTrigger={setDbTrigger} loginNameTwitter={twitterAccount} purpose="comment" howMany={timesToComment} />
          </div>
          <div className="Card-forms-container">
            <Personality loginNameTwitter={twitterAccount}/>
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
            <Personality loginNameTwitter={twitterAccount}/>
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
