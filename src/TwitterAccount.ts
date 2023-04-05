
import { generateSeleniumDriver, triggerLoginToTwitterAccount, executeAtScheduledTime, fetchTweets, addRephrasedTweetToTwitter,chatGpt, dailyTask, triggerLikeTweet, triggerRetweetTweet, triggerCommentTweet } from "./Funcinalities";
import { checkCommentedTweets, checkLikedTweets, checkRephresedTweets, checkRetweetedTweets, getUserNameUsedForTweets, insertCommentedTweets, insertLikedTweets, insertRephresedTweets, insertRetweetedTweets } from "./SQL";
import { Tweet } from "./TypesApi";
import categories from "./Data/ListOfCategories";


export class TwitterAccount {
    loginNameTwitter : string; 
    private passwordTwitter: string;
    id: string; 
    howManyTweets: [] | { hours: number,  minutes: number }[];
    howManyLikes: [] | { hours: number,  minutes: number }[];
    howManyRetweets: [] | { hours: number,  minutes: number }[];
    howManyComments: [] | { hours: number,  minutes: number }[];
     constructor(loginNameTwitter: string, passwordTwitter: string, id: string) {
      this.loginNameTwitter = loginNameTwitter;
      this.passwordTwitter = passwordTwitter;
      this.id = id;
      this.howManyTweets =  dailyTask(this.setTimeToTweets)
      this.howManyLikes = dailyTask(this.setTimeToLikes);
      this.howManyRetweets = this.setTimeToRetweets();
      this.howManyComments = this.setTimeToComments();
      this.createDriversAndLogin()
      executeAtScheduledTime(this.myFunction, this.howManyComments);
      executeAtScheduledTime(this.fetchAndRephreseAndTweet, this.howManyTweets);
      executeAtScheduledTime(this.fetchAndLikeTweet, this.howManyLikes)
      

     }
  
     setHowManyTweets = (numberOfTweets: number) => {
        this.setHowManyTweets(numberOfTweets)
        return this.howManyTweets
     }
  
      setHowManyLikes  = (numberOfLikes: number) => {
      this.setTimeToLikes(numberOfLikes)
      return this.howManyLikes
     }
  
      setHowManyRetweets  = (howManyRetweets: number) => {
      this.setTimeToRetweets(howManyRetweets)
      return
     }
  
      setHowManyComments  = (howManyComments: number) => {
        this.setTimeToComments(howManyComments)
        return; 
     }
  
     
     getRandomTime = ():  {hours: number, minutes: number} => {
    
        const currentDate = new Date()
        const hour = parseInt(Math.floor((Math.random() * 24  - currentDate.getHours() + 1) + currentDate.getHours()).toString().padStart(2, '0'))
        const minute = parseInt(Math.floor(Math.random() * 60).toString().padStart(2, '0'));
        const randomTime: {hours: number, minutes: number} = {hours: hour, minutes: minute }
        console.log(currentDate.getHours())
        return randomTime
  
     } 
  

     
     setTimeToTweets = (numberOfTweets?:number) => {
      let randomNumber: number = Math.floor(Math.random() * 5) + 1;
      if (numberOfTweets) {
        randomNumber = numberOfTweets
      }

      let tweets: [] | { hours: number,  minutes: number }[] = [];
      for (let i = 0; i < randomNumber; i++) {
        tweets = [ ...tweets, this.getRandomTime()];
      }
      this.howManyTweets = tweets ;
      console.log(this.howManyTweets);
      return this.howManyTweets;
    };
  
    setTimeToLikes = (numberOfLikes?:number) => {
      let randomNumber: number = Math.floor(Math.random() * 50) + 1
      
      if (numberOfLikes) {
         randomNumber = numberOfLikes
      }

      let likes: [] | { hours: number,  minutes: number }[] = []
      for (let i = 0; i < randomNumber; i++){
        likes = [...likes, this.getRandomTime()]
      }
      this.howManyLikes = likes
      return this.howManyLikes
    }
  
    setTimeToRetweets = (howManyRetweets?: number) => {
      let randomNumber: number = Math.floor(Math.random() * 2) + 1
      if (howManyRetweets) {
         randomNumber = howManyRetweets
      }
      let retweets: { hours: number; minutes: number; }[] | [] = []
      for (let i = 0; i < randomNumber; i++ ) {
        retweets = [...retweets, this.getRandomTime()]
      }
      this.howManyRetweets = retweets
      return this.howManyRetweets
    }
  
    setTimeToComments = (howManyComments?: number) => {
      let randomNumber: number = Math.floor(Math.random() * 5) + 1
      
      if (howManyComments) {
         randomNumber = howManyComments
      }
      
      let comments: [] | { hours: number,  minutes: number }[] = []
      for (let i = 0; i < randomNumber; i++){
        comments = [...comments, this.getRandomTime() ]
      }
      this.howManyComments = comments
      return this.howManyComments
    }

    async createDriversAndLogin(){
      await generateSeleniumDriver(this.loginNameTwitter)
      await triggerLoginToTwitterAccount(this.loginNameTwitter,this.loginNameTwitter,this.passwordTwitter)
    }
      

  
  // example usage
  myFunction = () =>{
    const now = new Date()
      console.log(`Scheduled time reached at ${now}!`);
  }

  // need to get from SQL userNameUsedForTweets

    async fetchAndRephreseAndTweet(index:number = 0, addTweets: Tweet[] = [] ){
      let isTrue: boolean = false
      if (index > 20){
        return 
      }
      let addToIndex: number = index; 
      let tweets: [] | Tweet[] = addTweets

      if (index === 0 ) {
      const twitterAccountsUsedForTweets = await getUserNameUsedForTweets(this.loginNameTwitter)
      const randomNumber = Math.floor(Math.random() * twitterAccountsUsedForTweets.length)
      tweets = await fetchTweets(`from:${twitterAccountsUsedForTweets[randomNumber]}`);
      isTrue = await checkRephresedTweets(this.loginNameTwitter, tweets[index].tweetId); 
      } else {
      isTrue = await checkRephresedTweets(this.loginNameTwitter, tweets[index].tweetId)
      }
  
      if (isTrue) {
        console.log('Loop is executed')
        addToIndex += 1;
        await this.fetchAndRephreseAndTweet(addToIndex, tweets);

      } else {
    
        const rephresedTweet = await chatGpt(`Rephrese this tweet as a intelectual teenager, do not use more than 280 charaters and write it in english: ${tweets[index].text}`)
        await addRephrasedTweetToTwitter(rephresedTweet, this.loginNameTwitter)
        await insertRephresedTweets(this.loginNameTwitter, tweets[index].tweetId)
        console.log('fetchAndRephreseAndTweet executed')
      }


    }


    async fetchAndLikeTweet(index: number = 0, addTweets: Tweet[] = []) {
      let isTrue: boolean = false
      if (index > 20){
        return 
      }
      let addToIndex: number = index; 
      let tweets: [] | Tweet[] = addTweets

      if (index === 0) {
      const randomNumber = Math.floor(Math.random() * categories.length)
      tweets = await fetchTweets(categories[randomNumber])
      isTrue = await checkLikedTweets(this.loginNameTwitter, tweets[index].tweetId)
      } else {
        isTrue = await checkLikedTweets(this.loginNameTwitter, tweets[index].tweetId)
      }
      if (isTrue) {
        addToIndex += 1
        this.fetchAndLikeTweet(addToIndex, tweets)
      } else {
        await triggerLikeTweet(this.loginNameTwitter,tweets[index].authorId, tweets[index].tweetId)
        await insertLikedTweets(this.loginNameTwitter, tweets[index].tweetId)
        console.log('fetchAndLikeTweet executed')
      }
    }

    async fetchAndRetweetTweet(index: number = 0, addTweets: Tweet[] = []) {
      let isTrue: boolean = false
      if (index > 20){
        return 
      }
      let addToIndex: number = index; 
      let tweets: [] | Tweet[] = addTweets

      if (index === 0) {
      const twitterAccountsUsedForTweets = await getUserNameUsedForTweets(this.loginNameTwitter)
      const randomNumber = Math.floor(Math.random() * twitterAccountsUsedForTweets.length)
      tweets = await fetchTweets(`from:${twitterAccountsUsedForTweets[randomNumber]}`)
      isTrue = await checkRetweetedTweets(this.loginNameTwitter, tweets[index].tweetId)
      } else {
        isTrue = await checkRetweetedTweets(this.loginNameTwitter, tweets[index].tweetId)
      }
      if (isTrue) {
        addToIndex += 1
        this.fetchAndRetweetTweet(addToIndex, tweets)
      } else {
        await triggerRetweetTweet(this.loginNameTwitter,tweets[index].authorId, tweets[index].tweetId)
        await insertRetweetedTweets(this.loginNameTwitter, tweets[index].tweetId)
        console.log('fetchAndRetweetTweet')
      }
    }

    async fetchAndComment(index: number = 0, addTweets: Tweet[] = []) {
      let isTrue: boolean = false
      if (index > 20){
        return 
      }
      let addToIndex: number = index; 
      let tweets: [] | Tweet[] = addTweets

      if (index === 0) {
        const randomNumber = Math.floor(Math.random() * categories.length)
        tweets = await fetchTweets(categories[randomNumber])
        isTrue = await checkCommentedTweets(this.loginNameTwitter, tweets[index].tweetId)
        } else {
          isTrue = await checkCommentedTweets(this.loginNameTwitter, tweets[index].tweetId)
        }
        if (isTrue) {
          addToIndex += 1
          this.fetchAndComment(addToIndex, tweets)
        } else {
          const rephresedTweet: any = await chatGpt(`Write a comment to this tweet as a intelectual teenager, use 50 characters, write in english: ${tweets[index].text}`)
          await triggerCommentTweet(this.loginNameTwitter, rephresedTweet, tweets[index].authorId, tweets[index].tweetId)
          await insertCommentedTweets(this.loginNameTwitter, tweets[index].tweetId)
          console.log('FetchAndComment Executed!')
        }


    }
    



}


  export default TwitterAccount