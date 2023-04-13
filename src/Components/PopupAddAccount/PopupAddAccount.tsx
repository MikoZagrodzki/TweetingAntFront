import React, { useRef } from "react";
import Popup from "reactjs-popup";
import FormTwitterCredentials from "../FormTwitterCredentials/FormTwitterCredentials";
import TwitterAccount from "../../TwitterAccount";
import { useAuth } from "../../AuthContext";
import "./PopupAddAccount.css"

interface Props {
  setTwitterClasses: React.Dispatch<
    React.SetStateAction<[] | TwitterAccount[]>
  >;
  twitterClasses: TwitterAccount[] | [];
}

function PopupAddAccount(props: Props) {
  const { setTwitterClasses, twitterClasses } = props;
  const { currentUser }: any = useAuth();

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();

  return (
    <>
      <button type="button" className="AddAccount openButton" onClick={openTooltip}>
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
            setTwitterClasses={props.setTwitterClasses}
            twitterClasses={props.twitterClasses}
          />
          <button type="button" className="AddAccount closeButton" onClick={closeTooltip}>
            close
          </button>
        </div>
      </Popup>
      </>
  );
}

export default PopupAddAccount;
