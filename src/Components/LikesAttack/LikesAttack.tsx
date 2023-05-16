import React, { useRef, useState } from "react";
import "./LikesAttack.css";
import {
  FormData,
  LikesAttackFormData,
  TwitterAccountType,
} from "../../TypesApi";
// import { triggerLikeTweetUrl } from '../../Funcinalities';
import { useAuth } from "../../AuthContext";
import { insertLikesAttack } from "../../SQL";
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
  const [likesAttackFormData, setLikesAttackFormData] = useState<
    LikesAttackFormData[]
  >([]);
  const [filteredAccounts, setFilteredAccounts] =
    useState<TwitterAccountType[]>(twitterAccounts);
  const [selectValue, setSelectValue] = useState<string>("");

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
      let dataObject: any = { formData: [...likesAttackFormData] };
      filteredAccounts.map((x) => {
        dataObject.formData.push({
          email: currentUser.email,
          loginnametwitter: x.loginNameTwitter,
          url: url,
          hours: getRandomHour(),
          minutes: getRandomMinutes(),
        });
      });
      await insertLikesAttack(dataObject);
      console.log(dataObject);
      setUrl("");
      setLikesAttackFormData([]);
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
      <p>Paste link to tweet and perform a burst likes attack </p>
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
      <p></p>
    </div>
  );
}

export default LikesAttack;
