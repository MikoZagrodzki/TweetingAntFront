import { FormData, FormDataObject } from "./TypesApi";


export class TwitterAccount {
  id: number;
  email: string;
  loginNameTwitter: string;
  isAutomated: boolean;
  timesToTweet: { hours: number; minutes: number }[];
  timesToLike: { hours: number; minutes: number }[]; 
  timesToRetweet: { hours: number; minutes: number }[];
  timesToComment: { hours: number; minutes: number }[];
  usernameForTweets: string[];
  usernameForContent: string[];

  constructor(
    id: number,
    email: string,
    loginNameTwitter: string,
    isAutomated: boolean,
    timesToTweet: { hours: number; minutes: number }[],
    timesToLike: { hours: number; minutes: number }[],
    timesToRetweet: { hours: number; minutes: number }[],
    timesToComment: { hours: number; minutes: number }[],
    usernameForTweets: string[],
    usernameForContent: string[],
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

  public addUsernameForTweets(formDataObj: FormDataObject): void {
    const { formData } = formDataObj;
    if (formData) {
      const usernames = formData.map(data => data.usernameusedfortweets);
      this.usernameForTweets.unshift(...usernames);
    }
  }
  public removeUsernameFromTweets(username: string): void {
    this.usernameForTweets = this.usernameForTweets.filter((u) => u !== username);
  }
  public addUserContent(formDataObj: FormDataObject): void {
    const { formData } = formDataObj;
    if (formData) {
      const usernames = formData.map(data => data.usernameusedfortweets);
      this.usernameForContent.unshift(...usernames);
    }
  }
  public removeUserContent(username: string): void {
    this.usernameForContent = this.usernameForContent.filter((u) => u !== username);
  }

  // public removeUsernameFromTweets(username: string) {
  //   const index = this.usernameForTweets.indexOf(username);
  //   if (index !== -1) {
  //     this.usernameForTweets.splice(index, 1);
  //   }
  // }

  // public removeUserContent(username: string) {
  //   const index = this.usernameForContent.indexOf(username);
  //   if (index !== -1) {
  //     this.usernameForContent.splice(index, 1);
  //   }
  // }

}

export default TwitterAccount;
