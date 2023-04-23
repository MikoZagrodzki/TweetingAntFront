import React from "react";
import { useAuth } from "../../AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  insertUserNameUsedForTweets,
  checkUserNameUsedForTweets,
} from "../../SQL";
import "./FormUserContent.css";
import { v4 as uuidv4 } from "uuid";

interface Props {
  loginNameTwitter: string;
  purpose: string;
}
interface FormData {
  email: string;
  loginnametwitter: string;
  usernameusedfortweets: string;
}

function FormUserContent(props: Props) {
  const { loginNameTwitter: twitterAccount, purpose } = props;
  const [errorMessageLoginData, seterrorMessageLoginData] =
    useState<boolean>(false);
  const { currentUser }: any = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState<FormData[]>([]);

  const formSubmit = async () => {
    const dataObject: any = { formData: formData };
    if (formData.length < 1) {
      return;
    }
    await insertUserNameUsedForTweets(dataObject);
    seterrorMessageLoginData(false);
    reset();
  };

  const addNext = async (data: any) => {
    const response = await checkUserNameUsedForTweets(
      twitterAccount,
      data.usernameUsedForTweets
    );
    console.log("its going");
    if (response) {
      seterrorMessageLoginData(true);
      console.log("its not going");
      return;
    }
    setFormData([
      ...formData,
      {
        email: currentUser.email,
        loginnametwitter: twitterAccount,
        usernameusedfortweets: data.usernameUsedForTweets,
      },
    ]);
    seterrorMessageLoginData(false);
    reset();
  };
  const removeFormData = (index: number) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setFormData(newData);
  };

  // console.log(formData);

  return (
    <div className="FormUserContent-container">
      <p>Add Twitter Username to {purpose} from</p>
      <form onSubmit={handleSubmit((data) => addNext(data))}>
        <input
          type="text"
          placeholder="Twitter Username"
          {...register("usernameUsedForTweets", { required: true })}
        />
        <input type="submit" value={formData.length<1?"Add":"Add next"} />
        {errors.usernameUsedForTweets && <p>Twitter Username is required.</p>}
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
        <button className={formData.length<1?"submit-button-none":"submit-button"} onClick={() => { formSubmit() }}>Submit</button>
    </div>
  );
}

export default FormUserContent;
