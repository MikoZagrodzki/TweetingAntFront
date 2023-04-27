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
import TwitterAccount from "../TwitterAccount";

export const generateTwitterAccounts = async (email:string) => {
  let accountsWithTwitterClass: TwitterAccount[] = [];
  const loginData = await getLoginDataFromEmail(email)
  const timesToTweet = await getTimeToTweetsByEmail(email)
  const timesTolike = await getTimeToLikesByEmail(email)
  const timesToRetweet = await getTimeToRetweetsByEmail(email)
  const timesToComment = await getTimeToCommentsByEmail(email)
  const usernameForTweets = await getUserNameUsedForTweetsByEmail(email)
  const usernameForContent = await getUserContentByEmail(email)

  loginData?.forEach((account:any) => {
    const twitterAccount = new TwitterAccount(
      account.id,
      account.email,
      account.loginnametwitter,
      account.isAutomated,
      timesToTweet.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.tweetsTime || [],
      timesTolike.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.likesTime || [],
      timesToRetweet.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.retweetsTime || [],
      timesToComment.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.commentsTime || [],
      usernameForTweets.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.usernameusedfortweets || [],
      usernameForContent.find((item:any) => item.loginnametwitter === account.loginnametwitter)?.usercontent || []
    );

    accountsWithTwitterClass.push(twitterAccount);
  });

  return accountsWithTwitterClass;
};

export default generateTwitterAccounts;

