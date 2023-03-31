import { generateSeleniumDriver, triggerLoginToTwitterAccount } from "./Funcinalities";


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
      this.howManyTweets =  this.setTimeToTweets();
      this.howManyLikes = this.setTimeToLikes();
      this.howManyRetweets = this.setTimeToRetweets();
      this.howManyComments = this.setTimeToComments();
      this.createDriversAndLogin()
      this.executeAtScheduledTime(this.myFunction);
      

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
        const hour = parseInt(Math.floor((Math.random() * 24) + currentDate.getHours() % 23).toString().padStart(2, '0'))
        const minute = parseInt(Math.floor(Math.random() * 60).toString().padStart(2, '0'));
        const randomTime: {hours: number, minutes: number} = {hours: hour, minutes: minute }
        return randomTime
  
     } 
  
     getRandomhour = (): number => {
      const currentDate = new Date()
      const hour = parseInt(Math.floor(Math.random() * 24) + currentDate.getHours().toString().padStart(2, '0'))
      return hour
     }
  
     getRandomMinute = (): number => {
      const minute = parseInt(Math.floor(Math.random() * 60).toString().padStart(2, '0'))
      return minute
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
      
    async executeAtScheduledTime(callback: any){
      

      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
  
      // iterate through each account and find the next scheduled time that hasn't passed yet
      let nextScheduledTime:any = null;
      
          // sort the howManyComments array in ascending order based on the time
          const sortedTimes = this.howManyComments.sort((a: any, b: any) => {
              if (a.hours === b.hours) {
                  return a.minutes - b.minutes;
              }
              return a.hours - b.hours;
          });
              console.log(console.log(JSON.stringify(sortedTimes)) + ' sorted times ')
          // find the next scheduled time that hasn't passed yet
          const scheduledTime = sortedTimes.find((time: any) => {
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
  
      console.log(`Next scheduled time found for next Comment : ${scheduledHours}:${scheduledMinutes}`);
      console.log(`Time until scheduled: ${timeUntilScheduled}ms`);
  
      setTimeout(callback, timeUntilScheduled);
  }
  
  // example usage
  myFunction = () =>{
    const now = new Date()
      console.log(`Scheduled time reached at ${now}!`);
  }

  

    






}


  export default TwitterAccount