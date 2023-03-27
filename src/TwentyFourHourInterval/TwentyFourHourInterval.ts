

export const twentyFourHourInterval = (drivers: string[], setTwitterAccountsWithClass: any ) => {
  let accountsWithTwitterClass: {}[] = []
  // drivers.forEach((x, i ) => accountsWithTwitterClass.push(new TwitterAccount(x)))
 

  drivers.forEach((driver, i) => {
    const twitterAccountName = `${i}`;
    const twitterAccount = new TwitterAccount(driver);
    Object.defineProperty(twitterAccount, 'name', { value: twitterAccountName });
    accountsWithTwitterClass.push(twitterAccount);
  });
  // console.log(accountsWithTwitterClass[0].howManyLikes)
  setTwitterAccountsWithClass(accountsWithTwitterClass)
}

interface Comment {
  howManyComments : [{number: number}]
  
}




class TwitterAccount {
  id: string 
  howManyTweets?: {number:number} | number 
  howManyLikes?: {number:number} | number
  howManyRetweets?: number | {number:number}
  howManyComments?: any
   constructor(id: string) {
    this.id = id 
    this.howManyTweets =  this.setTimeToTweets();
    this.howManyLikes = this.setTimeToLikes()
    this.howManyRetweets = this.setTimeToRetweets();
    this.howManyComments = this.setTimeToComments();
    this.executeAtScheduledTime(this.myFunction)

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

   
   getRandomTime = ():  {hours: number, minutes: number} => {
      const hour = parseInt(Math.floor(Math.random() * 24).toString().padStart(2, '0'))
      const minute = parseInt(Math.floor(Math.random() * 60).toString().padStart(2, '0'));
      const randomTime: {hours: number, minutes: number} = {hours: hour, minutes: minute }
      return randomTime

   } 

   getRandomhour = (): number => {
    const hour = parseInt(Math.floor(Math.random() * 24).toString().padStart(2, '0'))
    return hour
   }

   getRandomMinute = (): number => {
    const minute = parseInt(Math.floor(Math.random() * 60).toString().padStart(2, '0'))
    return minute
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
    this.howManyComments = [{number : Math.floor(Math.random() * 5) + 1}]
    let comments: any  = []
    for (let i = 0; i < this.howManyComments[0].number; i++){
      comments = [...comments, this.getRandomTime() ]
    }
    this.howManyComments = comments
    return this.howManyComments
  }

    
  executeAtScheduledTime = (callback: any) => {
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
    console.log('Scheduled time reached!');
}



}


     

 



export default twentyFourHourInterval