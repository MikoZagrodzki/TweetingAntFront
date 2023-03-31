import TwitterAccount from '../TwitterAccount'
import loginData from '../Data/SimpleAccountList';
import {LoginData} from '../TypesApi';

export const generateTwitterAccounts = (loginData: LoginData[]) => {
  let accountsWithTwitterClass: TwitterAccount[] = []
  

  loginData.forEach((account, i) => {
        let  twitterAccountName = new TwitterAccount(account.loginNameTwitter, account.passwordTwitter, account.id );
        
        accountsWithTwitterClass.push(twitterAccountName);
    
  });

  return accountsWithTwitterClass
}





export default generateTwitterAccounts