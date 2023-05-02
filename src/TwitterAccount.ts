import { updateCommentsIntensivity, updateLikesIntensivity, updateRetweetsIntensivity, updateTweetsIntensivity } from "./SQL";
import { FormData, FormDataObject } from "./TypesApi";


export class TwitterAccount {
  id: number;
  email: string;
  loginNameTwitter: string;
  isAutomated: boolean;
  tweetsIntensivity:number;
  timesToTweet: { hours: number; minutes: number }[];
  likesIntensivity:number;
  timesToLike: { hours: number; minutes: number }[]; 
  retweetsIntensivity:number;
  timesToRetweet: { hours: number; minutes: number }[];
  commentsintensivity:number;
  timesToComment: { hours: number; minutes: number }[];
  usernameForTweets: string[];
  usernameForContent: string[];

  constructor(
    id: number,
    email: string,
    loginNameTwitter: string,
    isAutomated: boolean,
    tweetsIntensivity:number,
    timesToTweet: { hours: number; minutes: number }[],
    likesIntensivity:number,
    timesToLike: { hours: number; minutes: number }[],
    retweetsIntensivity:number,
    timesToRetweet: { hours: number; minutes: number }[],
    commentsintensivity:number,
    timesToComment: { hours: number; minutes: number }[],
    usernameForTweets: string[],
    usernameForContent: string[],
  ) {
    this.id = id;
    this.email = email;
    this.loginNameTwitter = loginNameTwitter;
    this.isAutomated = isAutomated;
    this.tweetsIntensivity=tweetsIntensivity;
    this.timesToTweet = timesToTweet;
    this.likesIntensivity=likesIntensivity;
    this.timesToLike = timesToLike;
    this.retweetsIntensivity=retweetsIntensivity;
    this.timesToRetweet = timesToRetweet;
    this.commentsintensivity=commentsintensivity;
    this.timesToComment = timesToComment;
    this.usernameForTweets = usernameForTweets;
    this.usernameForContent = usernameForContent;
  }

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
  public removeTimesToTweet(hours: number, minutes: number): void {
    const index = this.timesToTweet.findIndex((time) => time.hours === hours && time.minutes === minutes);
    if (index !== -1) {
      this.timesToTweet.splice(index, 1);
    }
  }
  public updateTimesToTweet(oldHours: number, oldMinutes: number, newHours: number, newMinutes: number): void {
    const index = this.timesToTweet.findIndex((time) => time.hours === oldHours && time.minutes === oldMinutes);
    if (index !== -1) {
      this.timesToTweet[index] = { hours: newHours, minutes: newMinutes };
    }
  }
  public updateTimesToTweetIntensivity(intensivityValue:number): void{
    this.tweetsIntensivity=intensivityValue;
    updateTweetsIntensivity(this.loginNameTwitter, intensivityValue)
  }
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
  public removeTimesToLike(hours: number, minutes: number): void {
    const index = this.timesToLike.findIndex((time) => time.hours === hours && time.minutes === minutes);
    if (index !== -1) {
      this.timesToLike.splice(index, 1);
    }
  }
  public updateTimesToLike(oldHours: number, oldMinutes: number, newHours: number, newMinutes: number): void {
    const index = this.timesToLike.findIndex((time) => time.hours === oldHours && time.minutes === oldMinutes);
    if (index !== -1) {
      this.timesToLike[index] = { hours: newHours, minutes: newMinutes };
    }
  }
  public updateTimesToLikeIntensivity(intensivityValue:number): void{
    this.tweetsIntensivity=intensivityValue;
    updateLikesIntensivity(this.loginNameTwitter, intensivityValue)
  }
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
  public removeTimesToRetweet(hours: number, minutes: number): void {
    const index = this.timesToRetweet.findIndex((time) => time.hours === hours && time.minutes === minutes);
    if (index !== -1) {
      this.timesToRetweet.splice(index, 1);
    }
  }
  public updateTimesToRetweet(oldHours: number, oldMinutes: number, newHours: number, newMinutes: number): void {
    const index = this.timesToRetweet.findIndex((time) => time.hours === oldHours && time.minutes === oldMinutes);
    if (index !== -1) {
      this.timesToRetweet[index] = { hours: newHours, minutes: newMinutes };
    }
  }
  public updateTimesToRetweetIntensivity(intensivityValue:number): void{
    this.tweetsIntensivity=intensivityValue;
    updateRetweetsIntensivity(this.loginNameTwitter, intensivityValue)
  }
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
  public removeTimesToComment(hours: number, minutes: number): void {
    const index = this.timesToComment.findIndex((time) => time.hours === hours && time.minutes === minutes);
    if (index !== -1) {
      this.timesToComment.splice(index, 1);
    }
  }
  public updateTimesToComment(oldHours: number, oldMinutes: number, newHours: number, newMinutes: number): void {
    const index = this.timesToComment.findIndex((time) => time.hours === oldHours && time.minutes === oldMinutes);
    if (index !== -1) {
      this.timesToComment[index] = { hours: newHours, minutes: newMinutes };
    }
  }
  public updateTimesToCommentIntensivity(intensivityValue:number): void{
    this.tweetsIntensivity=intensivityValue;
    updateCommentsIntensivity(this.loginNameTwitter, intensivityValue)
  }
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
  public updateIsAutometed(value:boolean): void {
    this.isAutomated = value;
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
