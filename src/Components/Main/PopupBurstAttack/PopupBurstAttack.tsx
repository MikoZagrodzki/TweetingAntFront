import React, { useRef } from "react";
import Popup from "reactjs-popup";
import FormTwitterCredentials from "../../FormTwitterCredentials/FormTwitterCredentials";
import "../PopupMain.css";
import { TwitterAccountType } from "../../../TypesApi";
import BurstAttack from "../../burstAttack/burstAttack";

interface Props {
    twitterAccounts: TwitterAccountType[];
    setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
}

function PopupLikesAttack(props: Props) {
    const { twitterAccounts, setTwitterAccounts } = props;

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
        Burst Attack
      </button>
      <Popup
        ref={ref}
      >
        <div className="Popup_Background">
          <BurstAttack twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts} closeTooltip={closeTooltip}/>
          <button
            type="button"
            // className="AddAccount closeButton"
            onClick={closeTooltip}
          >
            close
          </button>
        </div>
      </Popup>
    </>
  );
}

export default PopupLikesAttack;
