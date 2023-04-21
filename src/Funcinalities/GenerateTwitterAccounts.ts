import TwitterAccount from '../TwitterAccount'
import { LoginData } from '../TypesApi';

export const generateTwitterAccounts = (loginData: LoginData[]) => {
  let accountsWithTwitterClass: TwitterAccount[] = []

  loginData?.forEach((account:LoginData) => {
        let  twitterAccountName = new TwitterAccount(account.loginnametwitter, account.passwordtwitter, account.email, account.isautomated );
    
        accountsWithTwitterClass.push(twitterAccountName);
    
  });

  return accountsWithTwitterClass
}





export default generateTwitterAccounts