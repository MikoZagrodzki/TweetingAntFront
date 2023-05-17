import React, { useRef, useState } from "react";
import "./burstAttack.css";
import {
  FormData,
  BurstAttackFormData,
  TwitterAccountType,
} from "../../TypesApi";
// import { triggerLikeTweetUrl } from '../../Funcinalities';
import { useAuth } from "../../AuthContext";
import { insertCommentsAttack, insertLikesAttack, insertRephraseAttack, insertRetweetsAttack } from "../../SQL";
import { v4 as uuidv4 } from "uuid";

interface Props {
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<
    React.SetStateAction<[] | TwitterAccountType[]>
  >;
  closeTooltip: any;
}

type Time = {
  hours: number;
  minutes: number;
};

function LikesAttack(props: Props) {
  const { twitterAccounts, setTwitterAccounts, closeTooltip } = props;
  const { currentUser }: any = useAuth();
  const [url, setUrl] = useState<string>("");
  const [burstAttackFormData, setBurstAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [likesAttackFormData, setLikesAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [rephraseAttackFormData, setRephraseAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [retweetsAttackFormData, setRetweetsAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [commentsAttackFormData, setCommentsAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [filteredAccounts, setFilteredAccounts] =
    useState<TwitterAccountType[]>(twitterAccounts);
  const [selectValue, setSelectValue] = useState<string>("");
  const [rephraseSwitch, setRephraseSwitch] = useState<boolean>(false);
  const [likeSwitch, setLikeSwitch] = useState<boolean>(false);
  const [retweetSwitch, setRetweetSwitch] = useState<boolean>(false);
  const [commentSwitch, setCommentSwitch] = useState<boolean>(false);

  const handleRephraseChange = () => {
    setRephraseSwitch(!rephraseSwitch);
  };

  const handleLikeChange = () => {
    setLikeSwitch(!likeSwitch);
  };

  const handleCommentChange = () => {
    setCommentSwitch(!commentSwitch);
  };

  const handleRetweetChange = () => {
    setRetweetSwitch(!retweetSwitch);
  };

  const getRandomHour = (): number => {
    const currentDate = new Date();
    const hour = parseInt(
      Math.floor(
        Math.random() * (23 - currentDate.getHours()) + currentDate.getHours()
      )
        .toString()
        .padStart(2, "0")
    );
    // const minute = parseInt(
    //   Math.floor(Math.random() * 60)
    //     .toString()
    //     .padStart(2, '0')
    // );
    // const randomTime: Time = { hours: hour, minutes: minute };
    const randomHour = hour;
    return randomHour;
  };

  const getRandomMinutes = (): number => {
    const minute = parseInt(
      Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")
    );
    const randomMinutes = minute;
    return randomMinutes;
  };

  const personalitySetter = (personality: string) => {
    setSelectValue(personality);
    if (personality === "All Personalities") {
      setFilteredAccounts(twitterAccounts);
    }
    setFilteredAccounts(
      twitterAccounts.filter((account) => account.personality === personality)
    );
  };

  const formSubmit = async (event: any) => {
    event.preventDefault();
    if (url === "") {
      alert("Wrong URL provided.");
      return;
    }
    if (url) {
      // let time = getRandomTime()

      if(likeSwitch){
        let likesDataObject: any = { formData: [...likesAttackFormData] };
        filteredAccounts.map((x) => {
          likesDataObject.formData.push({
            email: currentUser.email,
            loginnametwitter: x.loginNameTwitter,
            url: url,
            hours: getRandomHour(),
            minutes: getRandomMinutes(),
          });
        });
        await insertLikesAttack(likesDataObject);
      }
      if(rephraseSwitch){
        let rephraseDataObject: any = { formData: [...rephraseAttackFormData] };
        filteredAccounts.map((x) => {
          rephraseDataObject.formData.push({
            email: currentUser.email,
            loginnametwitter: x.loginNameTwitter,
            url: url,
            hours: getRandomHour(),
            minutes: getRandomMinutes(),
          });
        });
        await insertRephraseAttack(rephraseDataObject);
      }
      if(retweetSwitch){
        let retweetDataObject: any = { formData: [...retweetsAttackFormData] };
        filteredAccounts.map((x) => {
          retweetDataObject.formData.push({
            email: currentUser.email,
            loginnametwitter: x.loginNameTwitter,
            url: url,
            hours: getRandomHour(),
            minutes: getRandomMinutes(),
          });
        });
        await insertRetweetsAttack(retweetDataObject);
      }
      if(commentSwitch){
        let commentDataObject: any = { formData: [...commentsAttackFormData] };
        filteredAccounts.map((x) => {
          commentDataObject.formData.push({
            email: currentUser.email,
            loginnametwitter: x.loginNameTwitter,
            url: url,
            hours: getRandomHour(),
            minutes: getRandomMinutes(),
          });
        });
        await insertCommentsAttack(commentDataObject);
      }
      setUrl("");
      setBurstAttackFormData([]);
      closeTooltip();
    } else {
      alert("Wrong URL provided.");
      return;
    }
  };

  const personalities = twitterAccounts.map((account) => {
    return account.personality;
  });
  const personalitiesNoDuplicates = Array.from(new Set(personalities));


  return (
    <div className="LikesAttack_Container">
      <p>Paste link to tweet and perform a burst attack </p>
      <form>
        <input
          type="url"
          placeholder="TWEET URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button onClick={(event) => formSubmit(event)}>Attack!</button>
      </form>
      <p>You are performing atatck with:</p>
      <select
        name="personality_setter"
        id=""
        onChange={(e) => personalitySetter(String(e.target.value))}
        value={selectValue}
      >
        <option key={uuidv4()} value="All Personalities">
          All Personalities
        </option>
        {personalitiesNoDuplicates.map((personality) => {
          return (
            <option key={uuidv4()} value={personality}>
              {personality} personality
            </option>
          );
        })}
      </select>
      <div className="select_container">
        <div className="select_single_container">
          <p>Rephrase</p>
          <label className="switch">
            <input type="checkbox" onChange={handleRephraseChange} checked={rephraseSwitch} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="select_single_container">
          <p>Like</p>
          <label className="switch">
            <input type="checkbox" onChange={handleLikeChange} checked={likeSwitch} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="select_single_container">
          <p>Comment</p>
          <label className="switch">
            <input type="checkbox" onChange={handleCommentChange} checked={commentSwitch} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="select_single_container">
          <p>Retweet</p>
          <label className="switch">
            <input type="checkbox" onChange={handleRetweetChange} checked={retweetSwitch} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <p></p>
    </div>
  );
}

export default LikesAttack;
