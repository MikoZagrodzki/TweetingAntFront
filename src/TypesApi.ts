 export interface bodyPromptGpt{
    prompt:string
  }

  export interface tweetContentJoin{
    text:string
  }

  export interface ResponseChatGpt {
    success: boolean;
    data: string;
  }
  
   export interface FetchTweet {
    id:string,
    author_id: string;
    public_metrics: { like_count: number; retweet_count: number };
    text: string;
  }
  
  export interface Tweet {
    tweetId:string,
    authorId: string,
    likeCount: number,
    retweetCount: number,
    text: string
  }

  export interface LoginData {
    loginnametwitter : string,
    passwordtwitter: string,
    email: string,
    isautomated: boolean,
  }

  export interface FormDataObject {
    formData: FormData[];
  }

  export interface FormData {
    email: string;
    loginnametwitter: string;
    usernameusedfortweets: string;
  }

  export interface TwitterAccountType {
    loginNameTwitter: string;
    email: string;
    id?: number;
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
///////////////////////////////////////////////////////////
    addUsernameForTweets?: (dataObject:FormDataObject)=> void;
    removeUsernameFromTweets?: (username:string)=> void;
///////////////////////////////////////////////////////////
    addUserContent?: (dataObject:FormDataObject)=> void;
    removeUserContent?: (username:string)=> void;
    ///////////////////////////////////////////////////////////
    removeTimesToTweet?: (hours: number, minutes: number)=> void;
    updateTimesToTweet?: (oldHours: number, oldMinutes: number, newHours: number, newMinutes: number)=> void;
///////////////////////////////////////////////////////////
    removeTimesToLike?: (hours: number, minutes: number)=> void;
    updateTimesToLike?: (oldHours: number, oldMinutes: number, newHours: number, newMinutes: number)=> void;
///////////////////////////////////////////////////////////
    removeTimesToRetweet?: (hours: number, minutes: number)=> void;
    updateTimesToRetweet?: (oldHours: number, oldMinutes: number, newHours: number, newMinutes: number)=> void;
///////////////////////////////////////////////////////////
    removeTimesToComment?: (hours: number, minutes: number)=> void;
    updateTimesToComment?: (oldHours: number, oldMinutes: number, newHours: number, newMinutes: number)=> void;
///////////////////////////////////////////////////////////

  }