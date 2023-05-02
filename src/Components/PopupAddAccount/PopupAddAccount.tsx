import React, { useRef } from "react";
import Popup from "reactjs-popup";
import FormTwitterCredentials from "../FormTwitterCredentials/FormTwitterCredentials";
import "./PopupAddAccount.css";

interface Props {
  dbTrigger: boolean;
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

function PopupAddAccount(props: Props) {
  const { dbTrigger, setDbTrigger } = props;

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();

  return (
    <>
      <button
        type="button"
        className="AddAccount openButton"
        onClick={openTooltip}
      >
        Add Twitter Account
      </button>
      <Popup
        ref={ref}
        //   trigger={
        //     <button type="button" className="button" onClick={openTooltip}>
        //     open
        //   </button>
        //   }
      >
        <div className="PopupAddAccount-container">
          <FormTwitterCredentials
            setDbTrigger={setDbTrigger}
            dbTrigger={dbTrigger}
          />
          <button
            type="button"
            className="AddAccount closeButton"
            onClick={closeTooltip}
          >
            close
          </button>
        </div>
      </Popup>
    </>
  );
}

export default PopupAddAccount;
