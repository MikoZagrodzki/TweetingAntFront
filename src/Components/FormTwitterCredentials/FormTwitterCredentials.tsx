import { checkLoginData, insertLoginData } from "../../SQL";
// import createSingleTwitterAccount from "../../Funcinalities/CreateSingleTwitterAccount";
import { useAuth } from "../../AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TwitterAccount from "../../TwitterAccount";
import "./FormTwitterCredentials.css";

interface Props {
  dbTrigger: boolean;
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormTwitterCredentials(props: Props) {
  const { dbTrigger, setDbTrigger } = props;
  const [errorMessageLoginData, seterrorMessageLoginData] =
    useState<boolean>(false);
  const { currentUser }: any = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data: any) => {
    const response = await checkLoginData(
      data.TwitterUsername,
      data.TwitterPassword
    );
    if (response) {
      seterrorMessageLoginData(true);
      return;
    }
    insertLoginData(
      currentUser.email,
      data.TwitterUsername,
      data.TwitterPassword
    );
    setDbTrigger(!dbTrigger)
    seterrorMessageLoginData(false);
    reset();
  };

  return (
    <div className="FormTwitterCredentials-container">
      <p>Add Twitter Account</p>
      <form onSubmit={handleSubmit((data) => formSubmit(data))}>
        <input
          type="text"
          placeholder="TwitterUsername"
          {...register("TwitterUsername", { required: true })}
        />
        {errors.TwitterUsername && <p>Twitter Username is required.</p>}
        <input
          type="password"
          placeholder="TwitterPassword"
          {...register("TwitterPassword", { required: true, minLength: 8 })}
        />
        {errors.TwitterPassword && (
          <p>Twitter Password is required and must be at least 8 characters.</p>
        )}
        {errorMessageLoginData && <p>Twitter Username already added.</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default FormTwitterCredentials;
