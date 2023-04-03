import { generateSeleniumDriver, triggerLoginToTwitterAccount, executeAtScheduledTime } from "./Funcinalities";



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
      executeAtScheduledTime(this.myFunction, this.howManyComments);
      

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
      

  
  // example usage
  myFunction = () =>{
    const now = new Date()
      console.log(`Scheduled time reached at ${now}!`);
  }

  

    






}


  export default TwitterAccount