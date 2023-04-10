import TwitterAccount from "../TwitterAccount"
export const createSingleTwitterAccount = (twitterUsername:string, twitterPassword: string , email: string  ) => {

 const twitterAccount = new TwitterAccount(twitterUsername, twitterPassword, email)

 return twitterAccount
}

export default createSingleTwitterAccount