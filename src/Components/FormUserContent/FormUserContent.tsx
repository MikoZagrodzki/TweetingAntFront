import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import {
  insertUserNameUsedForTweets,
  checkUserNameUsedForTweets,
  insertUserContent,
  checkUserContent,
} from "../../SQL";
import "./FormUserContent.css";
import { v4 as uuidv4 } from "uuid";

interface Props {
  loginNameTwitter: string;
  purpose: string;
  funcionallity?:string;
}

interface FormData {
  email: string;
  loginnametwitter: string;
  usernameusedfortweets: string;
}

function FormUserContent(props: Props) {
  const { loginNameTwitter: twitterAccount, purpose, funcionallity } = props;
  const [formData, setFormData] = useState<FormData[]>([]);
  const [inputValue, setinputValue] = useState<string>("");
  const [errorMessageLoginData, seterrorMessageLoginData] =
    useState<boolean>(false);
  const { currentUser }: any = useAuth();

  const addNext = async () => {
    let doesExist;
    switch (funcionallity) {
      case "UserNameUsedForTweets":
        doesExist = await checkUserNameUsedForTweets(
          twitterAccount,
          inputValue
        );
        break;
      case "UserContent":
        doesExist = await checkUserContent(
          twitterAccount,
          inputValue
        );
        break;
      default:
       console.error("No functionallity passed")
    }
    if (doesExist) {
      seterrorMessageLoginData(true);
      return;
    }
    setFormData([
      ...formData,
      {
        email: currentUser.email,
        loginnametwitter: twitterAccount,
        usernameusedfortweets: inputValue,
      },
    ]);
    setinputValue("");
    seterrorMessageLoginData(false);
  };

  const formSubmit = async (event:any) => {
    event.preventDefault()
    if (formData.length < 1 && !inputValue) {
      return;
    }
    const dataObject: any = { formData: [...formData] };
    if (inputValue) {
      dataObject.formData.push({
        email: currentUser.email,
        loginnametwitter: twitterAccount,
        usernameusedfortweets: inputValue,
      });
    }
    switch (funcionallity) {
      case "UserNameUsedForTweets":
        await insertUserNameUsedForTweets(dataObject);
        break;
      case "UserContent":
        await insertUserContent(dataObject);
        break;
      default:
       console.error("No functionallity passed")
    }
    setFormData([]);
    setinputValue("");
    seterrorMessageLoginData(false);
  };

  const removeFormData = (index: number) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setFormData(newData);
  };

  return (
    <div className="FormUserContent-container">
      <p>Add Twitter Username to {purpose} from</p>
      <form>
        <input
          type="text"
          placeholder="Twitter Username"
          value={inputValue}
          onChange={(event) => setinputValue(event.target.value)}
        />
        <button type="button" onClick={() => addNext()}>
          {formData.length < 1 ? "Add" : "Add next"}
        </button>
        <button onClick={(event) => formSubmit(event)}>Submit</button>
        {errorMessageLoginData && <p>Twitter Username already added.</p>}
      </form>
      <div className="FormUserContent-elements-container">
        {formData.length > 0 &&
          formData.map((data, index) => {
            return (
              <div className="FormUserContent-element" key={uuidv4()}>
                <p>{data.usernameusedfortweets}</p>
                <button
                  className="button-FormUserContent-element"
                  onClick={() => removeFormData(index)}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FormUserContent;
