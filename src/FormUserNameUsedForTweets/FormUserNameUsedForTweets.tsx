import React from 'react'
import { useAuth } from "../AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { insertUserNameUsedForTweets, checkUserNameUsedForTweets } from '../SQL';

function FormUserNameUsedForTweets() {
    const [errorMessageLoginData, seterrorMessageLoginData] = useState<boolean>(false);
    const { currentUser }: any = useAuth();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const formSubmit = async (data: any) => {
      const response = await checkUserNameUsedForTweets(
        //loginNameTwitter - need to get it from CLASS
        data.loginNameTwitter,
        data.username
      );
      if (response) {
        seterrorMessageLoginData(true);
        return;
      }
      insertUserNameUsedForTweets(
        data.TwitterUsername,
        data.username
      );
      
      seterrorMessageLoginData(false);
      reset();
    };
  
    return (
      <div className="FormUserNameUsedForTweets-container">
        <form onSubmit={handleSubmit((data) => formSubmit(data))}>
          <input
          type="text"
            placeholder="Twitter Username"
            {...register("TwitterUsername", { required: true })}
          />
          {errors.TwitterUsername && <p>Twitter Username is required.</p>}
          {errorMessageLoginData && <p>Twitter Username already added.</p>}
          <input type="submit" />
        </form>
      </div>
    );
}

export default FormUserNameUsedForTweets