import "./App.css";
import React, { useEffect, useState } from "react";
import { requestApi } from "./CustomHooks";
import { bodyPromptGpt, tweetContentJoin, ResponseChatGpt, FetchTweet, Tweet  } from "./TypesApi";
import getCurrentTime from "./GetCurrentTime"
import twentyFourHourInterval from "./TwentyFourHourInterval";



function App() {
  const currentDate: Date = new Date();
  const [currentHour, setCurrentHour] = useState<number>(currentDate.getHours())
  const [chatGptCompletion, setChatGptCompletion] = useState<string>("");
  const [inputChatGpt, setInputChatGpt] = useState<string>("");
  const [isChatButtonClicked, setIsChatButtonClicked] = useState<boolean>(false);
  const [gptPromptAndCompletions, setGptPromptAndCompletions] = useState<string[]>([]);
  const [isGptResponseEmpty, setIsGptResponseEmpty] = useState<boolean>(false);
  const [fetchedTweets, setFetchedTweets] = useState<Tweet[]>([]);
  const [twitterLoginCredentials, setTwitterLoginCredentials] = useState<{email: string, password: string} | null >(null)
  const [likeAllTweets,setLikeAllTweets] = useState<boolean>(false)
  const [drivers, setDrivers] = useState<string[]>(['1','2','3','4','5'])
  const [twitterAccountsWithClass, setTwitterAccountsWithClass] = useState<{}[]>([])

  
  
  const twitterLikeFunction = async (twitterUserNameFetch: string) => {
    await fetchTweets(twitterUserNameFetch)
    await handleLikeAllTweetsFromUser(twitterUserNameFetch, fetchedTweets[0].tweetId)
    
  }

  const twitterAddRephraseTweet = async (twitterUserNameFetch: string) => {
    await fetchTweets(twitterUserNameFetch)
    rephraseTweet(fetchedTweets)
    await handleAddingTwitterPost(chatGptCompletion)

  }
  
  const handleTwitterAccountsUpdate = (twitterAccountsWithClass:any) => {
    setTwitterAccountsWithClass(twitterAccountsWithClass);
  };
  

  
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



  useEffect(()=>{

    // twentyFourHourInterval(drivers, setTwitterAccountsWithClass)
    // if (twitterAccountsWithClass.length > 0) {
    // accountsAutomationTwitter(twitterAccountsWithClass)
    // }
    const intervalID1 = getCurrentTime(setCurrentHour, (x,y) => twentyFourHourInterval(x, y), drivers,
     setTwitterAccountsWithClass, twitterAccountsWithClass, handleTwitterAccountsUpdate);

    return () => clearInterval(intervalID1);

   },[twitterAccountsWithClass])

  const getGptCompletion = async (
    inputChatGpt: string
  ) => {
    const bodyPromptGpt: bodyPromptGpt = {
      prompt: inputChatGpt,
    };
 

    try {
      const responseChatGpt: ResponseChatGpt = await requestApi(
        "http://localhost:3002/chat-gpt",
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
      requestApi("http://localhost:3002/twitterpost", {
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
      tweetId: tweet.id,
      authorId: tweet.author_id,
      likeCount: tweet.public_metrics.like_count,
      retweetCount: tweet.public_metrics.retweet_count,
      text: tweet.text,
    };
  };

  const fetchTweets = async (fetchTweetsQuery: string) => {
    const apiResponse = await requestApi(
      `http://localhost:3002/twittersearch?query=${fetchTweetsQuery}  -is:reply&max_results=20&tweet.fields=public_metrics&media.fields=public_metrics&expansions=author_id&sort_order=relevancy`,
      {
        method: "GET",
      }
    );
    setFetchedTweets(apiResponse.payload._realData.data.map(fetchTweetsMap));
    console.log(apiResponse.payload._realData)
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

  const response = await requestApi('http://localhost:3002/selenium/twitter_driver_and_login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body:JSON.stringify({
      email : 'ketaminion2137',
      password : 'Selenium2137'
    })

    })
   console.log(response)
}
  const handleAddingTwitterPost = async (fetchedTweets: any) => {
    await requestApi('http://localhost:3002/selenium/twitter_add_rephrased_post', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({text : fetchedTweets[0].text ? fetchedTweets[0].text : fetchedTweets})

    })
  }

  
 useEffect(()=>{

  if (fetchedTweets?.length === 0 ) {
    return;
  }

  for (let i = 0; i < fetchedTweets.length; i++) {
    (function (index) {
      setTimeout(() => {
        handleLikeAllTweetsFromUser(inputChatGpt, fetchedTweets[index].tweetId);
      },5000 * (index + 1));
    })(i);
    
  }

 },[likeAllTweets])


  const handleLikeAllTweetsFromUser = async(inputChat: string, fetchedTweets: any)=>{

      const likeTweetsObject = {username : inputChatGpt, tweetId:fetchedTweets}
      console.log(likeTweetsObject)
      
      const response = await requestApi('http://localhost:3002/selenium/twitter_like_all_tweets', {
       method: 'POST',
       headers: {
         "Content-Type": "application/json",
         "Access-Control-Allow-Origin": "*",
       },
       body: JSON.stringify(likeTweetsObject)
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
      <button onClick={()=>handleAddingTwitterPost(fetchedTweets)}>Add Twitter Rephrase</button>
      <button onClick={()=>{handleLikeAllTweetsFromUser(inputChatGpt, fetchedTweets[0].tweetId)}}>Like All Tweets From User</button>
      <button onClick={()=>handleLikeAllTweetsFromUser(inputChatGpt,fetchedTweets)}>Like All Tweets Map</button>
      <button onClick={()=>setLikeAllTweets(!likeAllTweets)}>Like All Tweets UseEffect</button>
      <button onClick={()=> twentyFourHourInterval(drivers,setTwitterAccountsWithClass)}>Twentyfourhourinterval check</button>
      <button onClick={()=> console.log(twitterAccountsWithClass)}>ConsoleLogTwitterAccountsClass</button>
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
      <h4>{currentHour}</h4>
    </div>
  );
}

export default App;
