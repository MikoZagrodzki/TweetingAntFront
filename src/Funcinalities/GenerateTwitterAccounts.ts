import TwitterAccount from '../TwitterAccount'
import { LoginData } from '../TypesApi';
import { getLoginData } from '../SQL';

export const generateTwitterAccounts = async () => {
  let accountsWithTwitterClass: TwitterAccount[] = []
  let loginData: LoginData[] = await getLoginData()
  console.log(loginData)
  loginData?.forEach((account:LoginData) => {
        let  twitterAccountName = new TwitterAccount(account.loginnametwitter, account.passwordtwitter, account.id );
    
        accountsWithTwitterClass.push(twitterAccountName);
    
  });

  return accountsWithTwitterClass
}





export default generateTwitterAccounts