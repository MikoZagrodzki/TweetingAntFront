import React from "react";
import "./Card.css";
import updatePersonality from "../../SQL/UpdatePersonality";

interface Props {
  loginNameTwitter: string;
}

function Personality(props: Props) {
  const { loginNameTwitter: twitterAccount } = props;

  const personalitySetter = ()=>{
    
  }

  return (
    <div className="Personality-container">
      <p>Your accont personality</p>
      <select
        name="personality_setter"
        id=""
        onChange={(e) => updatePersonality(twitterAccount, String(e.target.value))}
      >
        <option value="">Personality</option>
        <option value="">Personality</option>
        <option value="">Personality</option>
        <option value="">Personality</option>
        <option value="">Personality</option>
        <option value="">Personality</option>
      </select>
    </div>
  );
}

export default Personality;
