
interface LoginData {
  id: number;
  email: string;
  loginnametwitter: string;
  passwordtwitter: string;
  isautomated: boolean;
  dateadded: Date;
}

export class TwitterAccount {
  id: number;
  email: string;
  loginNameTwitter: string;
  isAutomated: boolean;
  timesToTweet: any[];
  timesToLike: any[]; 
  timesToRetweet: any[];
  timesToComment: any[];
  usernameForTweets: any[];
  usernameForContent: any[];

  constructor(
    id: number,
    email: string,
    loginNameTwitter: string,
    isAutomated: boolean,
    timesToTweet: any[],
    timesToLike: any[],
    timesToRetweet: any[],
    timesToComment: any[],
    usernameForTweets: any[],
    usernameForContent: any[]
  ) {
    this.id = id;
    this.email = email;
    this.loginNameTwitter = loginNameTwitter;
    this.isAutomated = isAutomated;
    this.timesToTweet = timesToTweet;
    this.timesToLike = timesToLike;
    this.timesToRetweet = timesToRetweet;
    this.timesToComment = timesToComment;
    this.usernameForTweets = usernameForTweets;
    this.usernameForContent = usernameForContent;
  }

  // add any additional methods here
}

export default TwitterAccount;
