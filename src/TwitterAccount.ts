
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
      this.executeAtScheduledTime(this.fetchAndComment, this.howManyComments, 'Comment');
      this.executeAtScheduledTime(this.fetchAndRephreseAndTweet, this.howManyTweets, 'Rephresed Tweet');
      this.executeAtScheduledTime(this.fetchAndLikeTweet, this.howManyLikes, 'Like Tweet')
      this.executeAtScheduledTime(this.fetchAndRetweetTweet, this.howManyRetweets, 'Retweet Tweet')
      

     }
  
///////////////////

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
  
///////////////////

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

    getRandomTime = ():  {hours: number, minutes: number} => {
    
      const currentDate = new Date()
      const hour = parseInt(Math.floor((Math.random() * (23  - currentDate.getHours())) + currentDate.getHours()).toString().padStart(2, '0'))
      const minute = parseInt(Math.floor(Math.random() * 60).toString().padStart(2, '0'));
      const randomTime: {hours: number, minutes: number} = {hours: hour, minutes: minute }
      return randomTime
   } 


///////////////////


    async createDriversAndLogin(){
      await generateSeleniumDriver(this.loginNameTwitter)
      await triggerLoginToTwitterAccount(this.loginNameTwitter,this.loginNameTwitter,this.passwordTwitter)
    }
      


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
          

          const rephresedTweet: any = await chatGpt(`Write a in english comment to this tweet as a intelectual teenager, use 50 characters, write in english: ${tweets[index].text}`)
          await triggerCommentTweet(this.loginNameTwitter, rephresedTweet, tweets[index].authorId, tweets[index].tweetId)
          await insertCommentedTweets(this.loginNameTwitter, tweets[index].tweetId)
          console.log('FetchAndComment Executed!')
        }
    }
    


    async executeAtScheduledTime(callback: any, timeData: [] | { hours: number,  minutes: number }[], whatIsExecuted: string){
      // const delayTime = 2000
      // const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms))
      // await delay(10000)
      // await callback.call(this);

      const now = new Date();  
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
  
      // iterate through each account and find the next scheduled time that hasn't passed yet
      let nextScheduledTime:any = null;
      
          // sort the howManyComments array in ascending order based on the time
          const sortedTimes = timeData.sort((a: any, b: any) => {
              if (a.hours === b.hours) {
                  return a.minutes - b.minutes;
              }
              return a.hours - b.hours;
          });
          // find the next scheduled time that hasn't passed yet
          const scheduledTime: any = sortedTimes.find((time: any) => {
              return (
                  time.hours > currentHours ||
                  (time.hours === currentHours && time.minutes >= currentMinutes)
              );
          });
  
          if (scheduledTime && (!nextScheduledTime || scheduledTime.hours < nextScheduledTime.hours)) {
              nextScheduledTime = { time: scheduledTime };
          }
      
  
      // if no future scheduled time is found, return null
      if (!nextScheduledTime) {
          console.log('No scheduled time found');
          return;
      }
  
      const scheduledHours = nextScheduledTime.time.hours;
      const scheduledMinutes = nextScheduledTime.time.minutes;
  
      // calculate the time until the next scheduled time
      let timeUntilScheduled =
          (scheduledHours - currentHours) * 60 * 60 * 1000 +
          (scheduledMinutes - currentMinutes) * 60 * 1000;
  
      // if the scheduled time is already past, add 24 hours to the time until scheduled
      if (scheduledHours < currentHours || (scheduledHours === currentHours && scheduledMinutes <= currentMinutes)) {
          timeUntilScheduled += 24 * 60 * 60 * 1000;
      }
  
      console.log(`Next scheduled time found for next ${this.loginNameTwitter} to exectute ${whatIsExecuted} : ${scheduledHours}:${scheduledMinutes}`);
      console.log(`Time until scheduled: ${timeUntilScheduled}ms`);
  
      setTimeout(() => callback.call(this), timeUntilScheduled);
  } 



}


  export default TwitterAccount