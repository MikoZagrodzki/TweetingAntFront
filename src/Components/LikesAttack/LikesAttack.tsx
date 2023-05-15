import React, { useState } from 'react'
import "./LikesAttack.css"
import { FormData, LikesAttackFormData, TwitterAccountType } from "../../TypesApi";
// import { triggerLikeTweetUrl } from '../../Funcinalities';
import { useAuth } from '../../AuthContext';
import { insertLikesAttack } from '../../SQL';

interface Props {
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
}

function LikesAttack(props: Props) {
    const { twitterAccounts, setTwitterAccounts } = props;
    const { currentUser }: any = useAuth();
    const[url, setUrl]=useState<string>("");
    const [likesAttackFormData, setLikesAttackFormData] = useState<LikesAttackFormData[]>([]);

    const usernames = twitterAccounts.map((x) => {
        x.loginNameTwitter
    })

    const formSubmit = async (event:any) => {
        event.preventDefault();
        if(url===""){
            return;
        }
        if(url){
            // twitterAccounts.forEach(async (x) => {
            //     setLikesAttackFormData([
            //         ...likesAttackFormData,
            //         {
            //           email: currentUser.email,
            //           loginnametwitter: x.loginNameTwitter,
            //           url: url,
            //           performat: ""
            //         },
            //       ]);
            //   });
            const dataObject: any = { formData: [...likesAttackFormData] };
            twitterAccounts.map((x)=>{
                dataObject.formData.push({
                    email: currentUser.email,
                    loginnametwitter: x.loginNameTwitter,
                    url: url,
                    performat: ""
                });
            })
            await insertLikesAttack(dataObject)
            console.log(dataObject)
            setUrl("")
            setLikesAttackFormData([])
        }else{
            alert("Wrong URL provided.")
            return;
        }
    }


    return (
        <div className='LikesAttack_Container'>
            <p>Paste link to tweet and perform a burst likes attack </p>
            <form>
                <input type='url' placeholder='TWEET URL' value={url} onChange={(event) => setUrl(event.target.value)}/>
                <button onClick={(event) => formSubmit(event)}>Attack!</button>
            </form>
        </div>
    )
}

export default LikesAttack