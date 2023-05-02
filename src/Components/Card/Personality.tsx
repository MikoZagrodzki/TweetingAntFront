import React from "react";
import "./Card.css";
import { TwitterAccountType } from "../../TypesApi";

interface Props {
  loginNameTwitter: string;
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
}

function Personality(props: Props) {
  const { loginNameTwitter: twitterAccount, twitterAccounts, setTwitterAccounts } = props;

  const twitterClassAccount = twitterAccounts.find(
    (account) => account.loginNameTwitter === twitterAccount
  );

  const getDefaultPersonality = () => {
    return twitterClassAccount?.personality;
  }

  const personalitySetter = (personality:string) => {
    if (twitterClassAccount && typeof twitterClassAccount.updatePersonality === "function") {
      twitterClassAccount.updatePersonality(personality);
      setTwitterAccounts([...twitterAccounts]);
    }
  }

  return (
    <div className="Personality-container">
      <p>Your accont personality</p>
      <select
        name="personality_setter"
        id=""
        onChange={(e) => personalitySetter(String(e.target.value))}
        defaultValue={getDefaultPersonality()}
      >
        <option value="default">Personality</option>
      </select>
    </div>
  );
}

export default Personality;
