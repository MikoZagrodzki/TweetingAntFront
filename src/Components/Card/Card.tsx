import { useRef } from "react";
import Popup from "reactjs-popup";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import SettingCard from "./SettingCard";
import FormUserContent from "../FormUserContent/FormUserContent";

interface Props {
  loginNameTwitter: string;
  email: string;
  isAutomated: string | undefined;
  howManyTweets: [] | { hours: number; minutes: number }[];
  howManyLikes: [] | { hours: number; minutes: number }[];
  howManyRetweets: [] | { hours: number; minutes: number }[];
  howManyComments: [] | { hours: number; minutes: number }[];
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
  } = props;

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();

  // console.log(howManyTweets);
  return (
    // <div className="Card-container">
    //     <p>{twitterAccount}</p>
    // </div>

    <div className="Card-container">
      <p>{twitterAccount}</p>
      <button type="button" className="Card openButton" onClick={openTooltip}>
        open
      </button>
      <p>{isAutomated === "1" ? "AUTOMATED" : "NOTAUTOMATED"}</p>
      <Popup ref={ref}>
        <div className="Card-popup-container">
          <div className="Card-popup-container-header">
            <h1>{twitterAccount}</h1>
            <p>{email}</p>
          </div>
          <div className="Card-settings-container">
            <SettingCard purpose="tweet" howMany={howManyTweets} />
            <SettingCard purpose="like" howMany={howManyLikes} />
            <SettingCard purpose="retweet" howMany={howManyRetweets} />
            <SettingCard purpose="comment" howMany={howManyComments} />
          </div>
          <div className="Card-forms-container">
            <FormUserContent
              purpose="rephrase tweets"
              loginNameTwitter={twitterAccount}
            />
            <FormUserContent
              purpose="like/comment/retweet"
              loginNameTwitter={twitterAccount}
            />
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
