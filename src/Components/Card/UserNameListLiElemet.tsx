import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Card.css";
interface Props {
  username: string;
}

function UserNameListLiElemet(props: Props) {
  const { username } = props;
  return (
    <li key={uuidv4()}>
      {username}
      <button className="button-li" onClick={() => {}}>
        ❌
      </button>
    </li>
  );
}

export default UserNameListLiElemet;
