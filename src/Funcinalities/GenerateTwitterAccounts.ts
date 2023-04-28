// import TwitterAccount from '../TwitterAccount'
// import { LoginData } from '../TypesApi';

// export const generateTwitterAccounts = (loginData: LoginData[]) => {
//   let accountsWithTwitterClass: TwitterAccount[] = []

//   loginData?.forEach((account:LoginData) => {
//         let  twitterAccountName = new TwitterAccount(account.loginnametwitter, account.passwordtwitter, account.email, account.isautomated );
    
//         accountsWithTwitterClass.push(twitterAccountName);
    
//   });

//   return accountsWithTwitterClass
// }

// export default generateTwitterAccounts
////////////////////////////////////////////


import { getLoginDataFromEmail, getUserContentByEmail,getUserNameUsedForTweetsByEmail,getTimeToTweetsByEmail,getTimeToRetweetsByEmail, getTimeToLikesByEmail, getTimeToCommentsByEmail} from "../SQL";
import getIntensivityByEmail from "../SQL/GetIntensivityByEmail";
import TwitterAccount from "../TwitterAccount";

export const generateTwitterAccounts = async (email:string) => {
  let accountsWithTwitterClass: TwitterAccount[] = [];
  const loginData = await getLoginDataFromEmail(email);
  const timesToTweet = await getTimeToTweetsByEmail(email);
  const timesTolike = await getTimeToLikesByEmail(email);
  const timesToRetweet = await getTimeToRetweetsByEmail(email);
  const timesToComment = await getTimeToCommentsByEmail(email);
  const usernameForTweets = await getUserNameUsedForTweetsByEmail(email);
  const usernameForContent = await getUserContentByEmail(email);
  const intensivity = await getIntensivityByEmail(email);


  loginData?.forEach((account:any) => {
    const twitterAccount = new TwitterAccount(
      account.id,
      account.email,
      account.loginnametwitter,
      account.isautomated,
////////////////////////////////////////////////////////
      intensivity.find((item: any) => item.loginnametwitter === account.loginnametwitter)?.tweetsintensivity||5,
      timesToTweet.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.tweetsTime || [],
////////////////////////////////////////////////////////
      intensivity.find((item: any) => item.loginnametwitter === account.loginnametwitter)?.likesintensivity||5,
      timesTolike.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.likesTime || [],
////////////////////////////////////////////////////////
      intensivity.find((item: any) => item.loginnametwitter === account.loginnametwitter)?.retweetsintensivity||5,
      timesToRetweet.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.retweetsTime || [],
////////////////////////////////////////////////////////
      intensivity.find((item: any) => item.loginnametwitter === account.loginnametwitter)?.commentsintensivity||5,
      timesToComment.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.commentsTime || [],
////////////////////////////////////////////////////////
      usernameForTweets.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.usernameusedfortweets || [],
      usernameForContent.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.usercontent || [],
////////////////////////////////////////////////////////
    );
    accountsWithTwitterClass.push(twitterAccount);
  });
console.log(accountsWithTwitterClass)
  return accountsWithTwitterClass;
};

export default generateTwitterAccounts;

