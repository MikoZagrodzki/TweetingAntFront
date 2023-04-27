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

  export interface TwitterAccountType {
    loginNameTwitter: string;
    email: string;
    id?: number;
    isAutomated: boolean;
    timesToTweet: [] | { hours: number; minutes: number }[];
    timesToLike: [] | { hours: number; minutes: number }[];
    timesToRetweet: [] | { hours: number; minutes: number }[];
    timesToComment: [] | { hours: number; minutes: number }[];
    usernameForTweets: [] | string[];
    usernameForContent: [] | string[];
  }