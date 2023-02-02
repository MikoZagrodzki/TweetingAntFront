import Twitter from "twitter-lite";
import dotenv from 'dotenv'

dotenv.config()

const client= new Twitter({
  consumer_key:'process.env.CONSUMER_KEY',
  consumer_secret:'process.env.CONSUMER_SECRET',
  access_token_key:'process.env.ACCESS_KEY',
  access_token_secret:'process.env.ACCESS_SECRET',
})

const twitterPost = async () => {
    return  await client.post('statuses/update', {status: chatGptResponse})
  }

