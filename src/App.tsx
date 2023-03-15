import "./App.css";
import React, { useEffect, useState } from "react";
import { requestApi } from "./CustomHooks";
import { bodyPromptGpt, tweetContentJoin } from "./TypesApi";

interface responseChatGpt {
  success: boolean;
  data: string;
}

interface FetchTweet {
  author_id: string;
  public_metrics: { like_count: number; retweet_count: number };
  text: string;
}

interface Tweet {
  authorId: string,
  likeCount: number,
  retweetCount: number,
  text: string

}

function App() {
  const [chatGptCompletion, setChatGptCompletion] = useState<string>("");
  const [inputChatGpt, setInputChatGpt] = useState<string>("");
  const [isChatButtonClicked, setIsChatButtonClicked] =
    useState<boolean>(false);
  const [gptPromptAndCompletions, setGptPromptAndCompletions] = useState<
    string[]
  >([]);
  const [isGptResponseEmpty, setIsGptResponseEmpty] = useState<boolean>(false);
  const [fetchedTweets, setFetchedTweets] = useState<Tweet[]>([]);
  const [twitterLoginCredentials, setTwitterLoginCredentials] = useState<{email: string, password: string} | null >(null)

  const rephraseTweet = (tweets: Tweet[]): void => {
    let isUrl: boolean = false;
    let tweet!: string;

    const isValidHttpUrl = (tweets: Tweet[]) => {
      for (let i = 0; i < tweets.length; i++) {
        let url;
        try {
          url = new URL(tweets[i].text);
        } catch (_) {
          tweet = tweets[i].text;
          return tweet;
        }
        isUrl = url.protocol === "http:" || url.protocol === "https:";
        if (isUrl === false) {
          tweet = tweets[i].text;
          return tweet;
        }
      }
    };
    isValidHttpUrl(tweets);

    if (!tweet) {
      console.error("Proper Tweet to rephrase not found");
      return;
    }

    getGptCompletion(`Rephrase this: ${tweet}`);
  };

  const getGptCompletion = async (
    inputChatGpt: string
    // gptPromptAndCompletions: string[]
  ) => {
    // let bodyPromptGpt:bodyPromptGpt|Record<string, never> = {};
    // if (gptPromptAndCompletions?.length === 0) {
    const bodyPromptGpt: bodyPromptGpt = {
      prompt: inputChatGpt,
    };
    // }
    // else {
    //   bodyPromptGpt = {
    //     prompt: gptPromptAndCompletions,
    //   };
    // }

    try {
      const responseChatGpt: responseChatGpt = await requestApi(
        "http://localhost:3001/chat-gpt",
        // bodyPromptGpt
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(bodyPromptGpt),
        }
      );
      console.log(responseChatGpt);
      console.log(responseChatGpt.data);
      setChatGptCompletion(responseChatGpt.data);
      if (!responseChatGpt.data) {
        setIsGptResponseEmpty(!isGptResponseEmpty);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!inputChatGpt) {
      return;
    }
    getGptCompletion(inputChatGpt);
  }, [isChatButtonClicked, isGptResponseEmpty]);

  const handleGptCompletion = (
    inputChatGpt: string,
    chatGptCompletion: string
  ) => {
    setGptPromptAndCompletions([inputChatGpt, chatGptCompletion]);
    setInputChatGpt("");
  };

  useEffect(() => {
    if (!chatGptCompletion) {
      return;
    }
    handleGptCompletion(inputChatGpt, chatGptCompletion);
  }, [chatGptCompletion]);

  const requestGptCompletionButton = () => {
    if (gptPromptAndCompletions) {
      setGptPromptAndCompletions([]);
    }
    setIsChatButtonClicked(!isChatButtonClicked);
  };

  const addTwitterPost = async (tweetContent: string[]) => {
    const tweetContentJoin: tweetContentJoin = { text: tweetContent.join(" ") };
    try {
      requestApi("http://localhost:3001/twitterpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(tweetContentJoin),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTweetsMap = (tweet: FetchTweet): Tweet => {
    return {
      authorId: tweet.author_id,
      likeCount: tweet.public_metrics.like_count,
      retweetCount: tweet.public_metrics.retweet_count,
      text: tweet.text,
    };
  };

  const fetchTweets = async (fetchTweetsQuery: string) => {
    const apiResponse = await requestApi(
      `http://localhost:3001/twittersearch?query=${fetchTweetsQuery}  -is:reply&max_results=20&tweet.fields=public_metrics&media.fields=public_metrics&expansions=author_id&sort_order=relevancy`,
      {
        method: "GET",
      }
    );
    setFetchedTweets(apiResponse.payload._realData.data.map(fetchTweetsMap));
    console.log(fetchedTweets);
  };

const openTwitterDriver = async()=>{
  const response = await fetch("http://localhost:3002/");
    if (!response.ok) {
      throw new Error("Please reload the app");
    }
    const apiResponse = await response.json();
    return apiResponse;
}

const handleLoginToTwitter = async () => {
  let twitterUsername = prompt('Please Enter Twitter Username', 'Username')
  if (!twitterUsername) {
    alert('Username not provided, please try again')
    return;
  }
  let twitterPassword = prompt('Please Enter Twitter Password', 'Password')
  if (!twitterPassword) {
    alert('Username not provided, please try again')
    return;
  }

  const twitterCredentials = {
    email : twitterUsername,
    password : twitterPassword
  }
  setTwitterLoginCredentials(twitterCredentials)

  console.log(twitterCredentials)
  // const response = await requestApi('http://localhost:3002/selenium/twitter_driver_and_login', {
  // method: "POST",
  // body : JSON.stringify(twitterCredentials)
  // })
}

const loginPostRequestTwitter = async (twitterLoginCredentials: {email: string, password: string } | null ) => {
  const response = await requestApi('http://localhost:3002/selenium/twitter_driver_and_login', {
    method: "POST",
    body : JSON.stringify(twitterLoginCredentials)
    })
}

  return (
    <div className="App">
      <textarea
        value={inputChatGpt}
        onChange={(e) => {
          setInputChatGpt(e.target.value);
        }}
        placeholder="Ask For anything or Get Tweets from a specific user"
      />
      <button onClick={requestGptCompletionButton}>Ask Chat GPT!</button>
      <button
        onClick={() => {
          addTwitterPost(gptPromptAndCompletions.slice(1));
        }}
      >
        Add to Twitter!
      </button>
      <button
        onClick={() => {
          fetchTweets(`from:${inputChatGpt}`);
        }}
      >
        Get Me Tweets From...
      </button>
      <button onClick={()=>handleLoginToTwitter()}>Set Twitter Credentials</button>
      <button onClick={()=>loginPostRequestTwitter(twitterLoginCredentials)}>POST METHOD TWIITER LOGIN</button>
      {fetchedTweets.length > 1 ? (
        <button
          onClick={() => {
            rephraseTweet(fetchedTweets);
          }}
        >
          Rephrase Those Tweets
        </button>
      ) : null}

      {gptPromptAndCompletions ? (
        <div>
          <p>Your Prompt: {gptPromptAndCompletions[0]}</p>
          <p>Chat GPT Answer: {gptPromptAndCompletions.slice(1)}</p>
        </div>
      ) : (
        <p>Type your question and find answer right away!</p>
      )}
    </div>
  );
}

export default App;
