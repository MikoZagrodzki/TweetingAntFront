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
import LikesAttack from "../burstAttack/burstAttack";

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
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
  personalityList: string[]|[];
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
    twitterAccounts,
    setTwitterAccounts,
    personalityList,
  } = props;

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();
  
  const twitterClassAccount = twitterAccounts.find(
    (account) => account.loginNameTwitter === twitterAccount
  );

  const autommationSwitch = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    try{
      if (twitterClassAccount && typeof twitterClassAccount.updateIsAutometed === 'function') {
        twitterClassAccount.updateIsAutometed(!isAutomated);
        setTwitterAccounts([...twitterAccounts])
      }
    }catch(error){
      console.error(error)
    }
  };

  // const personality = () => {
  //   switch (twitterClassAccount?.personality) {
  //     case "default":
  //       return "Default";
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className="Card-container">
      <p>{twitterAccount}</p>
      <button type="button" onClick={openTooltip}>
        open
      </button>
      <div className="Card-automation-container">
        <p>{isAutomated ? "AUTOMATED" : "NOTAUTOMATED"}</p>
        <button className="Card-automation-button" onClick={autommationSwitch}>
          {isAutomated ? "TURN OFF" : "TURN ON"}
        </button>
      </div>
        <p>Personality: <br/>{twitterClassAccount?.personality}</p>
      <Popup ref={ref}>
        <div className="Card-popup-container">
          <div className="Card-popup-container-header">
            <h1>{twitterAccount}</h1>
            <p>{email}</p>
            <div className="Card-popup-automation-container"></div>
          </div>
          <div className="Card-settings-container">
            <SettingCard
              loginNameTwitter={twitterAccount}
              purpose="tweet"
              howMany={timesToTweet}
              twitterAccounts={twitterAccounts}
              setTwitterAccounts={setTwitterAccounts}
            />
            <SettingCard
              loginNameTwitter={twitterAccount}
              purpose="like"
              howMany={timesToLike}
              twitterAccounts={twitterAccounts}
              setTwitterAccounts={setTwitterAccounts}
            />
            <SettingCard
              loginNameTwitter={twitterAccount}
              purpose="retweet"
              howMany={timesToRetweet}
              twitterAccounts={twitterAccounts}
              setTwitterAccounts={setTwitterAccounts}
            />
            <SettingCard
              // key={uuidv4()}
              loginNameTwitter={twitterAccount}
              purpose="comment"
              howMany={timesToComment}
              twitterAccounts={twitterAccounts}
              setTwitterAccounts={setTwitterAccounts}
            />
          </div>
          <div className="Card-forms-container">
            <Personality loginNameTwitter={twitterAccount} twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts} personalityList={personalityList}/>
            <div className="Form-and-list-container">
              <FormUserContent
                purpose="rephrase tweets"
                loginNameTwitter={twitterAccount}
                funcionallity="UserNameUsedForTweets"
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
              <UserNamesList
                names={usernameForTweets}
                loginNameTwitter={twitterAccount}
                purpose="rephrasing tweets"
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
            </div>
            <div className="Form-and-list-container">
              <FormUserContent
                purpose="like/comment/retweet"
                loginNameTwitter={twitterAccount}
                funcionallity="UserContent"
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
              <UserNamesList
                names={usernameForContent}
                loginNameTwitter={twitterAccount}
                purpose="like/comment/retweet"
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
            </div>
            {/* <LikesAttack twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts}/> */}
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
