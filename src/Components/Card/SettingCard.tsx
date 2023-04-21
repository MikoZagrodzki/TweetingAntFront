import React from "react";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";

interface Props {
  purpose: string;
  howMany: [] | { hours: number; minutes: number }[];
}

function SettingCard(props: Props) {
  const { purpose, howMany } = props;
  return (
    <div className="SettingCard-container">
      <select name="" id="">
        <option value="">{purpose} intensivity low</option>
        <option value="">{purpose} intensivity medium</option>
        <option value="">{purpose} intensivity high</option>
        <option value="">{purpose} OFF</option>
      </select>
      <p>I am gonna {props.purpose} at:</p>
      <ul>
        {howMany.length > 0 &&
          howMany.map((x) => {
            return (
              <li key={uuidv4()}>
                {x.hours}:{x.minutes} <button className="button-li">x</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default SettingCard;
