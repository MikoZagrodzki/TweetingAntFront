import { useRef } from "react";
import Popup from "reactjs-popup";
import "./Card.css";

interface Props {
  loginNameTwitter: string;
  email: string;
  howManyTweets: [] | { hours: number; minutes: number }[];
  howManyLikes: [] | { hours: number; minutes: number }[];
  howManyRetweets: [] | { hours: number; minutes: number }[];
  howManyComments: [] | { hours: number; minutes: number }[];
}

function Card(props: Props) {
  const {
    loginNameTwitter: twitterAccount,
    email,
    howManyTweets,
    howManyLikes,
    howManyRetweets,
    howManyComments,
  } = props;

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();

  console.log(howManyTweets);

  return (
    // <div className="Card-container">
    //     <p>{twitterAccount}</p>
    // </div>

    <div className="Card-container">
      <p>{twitterAccount}</p>
      <button type="button" className="Card openButton" onClick={openTooltip}>
        open
      </button>
      <Popup ref={ref}>
        <div className="Card-popup-container">
          <p>{twitterAccount}</p>
          <p>{email}</p>
          <ul>
            I am gonna tweet at:
            {howManyTweets.map((x) => {
              return (
                <li>
                  {x.hours}:{x.minutes}
                </li>
              );
            })}
          </ul>
          <ul>
            I am gonna tweet at:
            {howManyLikes.map((x) => {
              return (
                <li>
                  {x.hours}:{x.minutes}
                </li>
              );
            })}
          </ul>
          <ul>
            I am gonna retweet at:
            {howManyRetweets.map((x) => {
              return (
                <li>
                  {x.hours}:{x.minutes}
                </li>
              );
            })}
          </ul>
          <ul>
            I am gonna comment at:
            {howManyComments.map((x) => {
              return (
                <li>
                  {x.hours}:{x.minutes}
                </li>
              );
            })}
          </ul>
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
