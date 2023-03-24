 export interface bodyPromptGpt{
    prompt:string|string[]
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