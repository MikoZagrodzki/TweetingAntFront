// add tweets some tweets and some time and restart porcedure everyday
// when there is a new day, new parameters are picked. 
// have set those paramerts to work at certain time.
// picked how many tweets, and at what time we will add them to our feed

// based on the given number generate number of hours, than set a function to be triggered at this hour. 

export const twentyFourHourInterval = (drivers: string[], setTwitterAccountsWithClass: any ) => {
  let accountsWithTwitterClass: {}[] = []
  drivers.forEach(x => accountsWithTwitterClass.push(new TwitterAccount(x)))
 
  console.log(accountsWithTwitterClass)
  setTwitterAccountsWithClass(accountsWithTwitterClass)
}

class TwitterAccount {
  id: string 
  howManyTweets?: {number:number} | number 
  howManyLikes?: {number:number} | number
  howManyRetweets?: number | {number:number}
  howManyComments?: number | {number:number}
   constructor(id: string) {
    this.id = id 
    this.howManyTweets =  this.setTimeToTweets();
    this.howManyLikes = this.setTimeToLikes()
    this.howManyRetweets = this.setTimeToRetweets();
    this.howManyComments = this.setTimeToComments();
   }

   setHowManyTweets = (howManyTweets: number) => {
      this.howManyTweets = howManyTweets
      return this.howManyTweets
   }

    setHowManyLikes  = (howManyLikes: number) => {
    this.howManyLikes = howManyLikes
    return this.howManyLikes
   }

    setHowManyRetweets  = (howManyLikes: number) => {
    this.howManyLikes = howManyLikes
    return this.howManyLikes
   }

    setManyComments  = (howManyLikes: number) => {
    this.howManyLikes = howManyLikes
    return this.howManyLikes
   }

   
   getRandomTime = (): string => {
      const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0')
      const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      const randomTime = `${hour}:${minute}`
      return randomTime

   } 

   
   setTimeToTweets = () => {
    this.howManyTweets = { number: Math.floor(Math.random() * 5) + 1 };
    let tweets: {} = {};
    for (let i = 0; i < this.howManyTweets.number; i++) {
      tweets = { ...tweets, [i]: this.getRandomTime() };
    }
    this.howManyTweets = { ...this.howManyTweets, ...tweets };
    console.log(this.howManyTweets);
    return this.howManyTweets;
  };

  setTimeToLikes = () => {
    this.howManyLikes = {number : Math.floor(Math.random()* 50)+ 1}
    let likes: {} = {}
    for (let i = 0; i < this.howManyLikes.number; i++){
      likes = {...likes, [i]: this.getRandomTime()}
    }
    this.howManyLikes = {...this.howManyLikes, ...likes}
    return this.howManyLikes
  }

  setTimeToRetweets = () => {
    this.howManyRetweets = {number : Math.floor(Math.random() * 2)}
    let retweets: {} = {}
    for (let i = 0; i < this.howManyRetweets.number; i++ ) {
      retweets = {...retweets, [i]: this.getRandomTime()}
    }
    this.howManyRetweets = {...this.howManyRetweets,...retweets}
    return this.howManyRetweets
  }

  setTimeToComments = () => {
    this.howManyComments = {number : Math.floor(Math.random() * 5) + 1}
    let comments: {} = {}
    for (let i = 0; i < this.howManyComments.number; i++){
      comments = {...comments, [i]: this.getRandomTime()}
    }
    this.howManyComments = {...this.howManyComments,...comments}
    return this.howManyComments
  }

 }



export default twentyFourHourInterval