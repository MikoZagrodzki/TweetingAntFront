// import Twitter from "twitter-lite";
// import dotenv from 'dotenv';

// dotenv.config();

// const client= new Twitter({
//   consumer_key:'process.env.CONSUMER_KEY',
//   consumer_secret:'process.env.CONSUMER_SECRET',
//   access_token_key:'process.env.ACCESS_KEY',
//   access_token_secret:'process.env.ACCESS_SECRET',
// });

// const twitterPost = async () => {
//     return  await client.post('statuses/update', {status: 'yoo'});
//   };


  // twitterPost().catch(error => {
  //   console.error(error);
  // });
  // twitterPost();



// (async ()=>await client.post('statuses/update', {status: 'yoo'}))();


// import Twitter from "twitter-lite";
// import dotenv from 'dotenv';

// dotenv.config();

// const client = new Twitter({
//   consumer_key: process.env.CONSUMER_KEY,
//   consumer_secret: process.env.CONSUMER_SECRET,
//   access_token_key: process.env.ACCESS_KEY,
//   access_token_secret: process.env.ACCESS_SECRET,
// });

// const twitterPost = async () => {
//   return await client.post('statuses/update', { status: 'yoo' });
// };

// twitterPost()
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.error(error);
//   });



import Twitter from "twitter-lite";
import dotenv from 'dotenv';

dotenv.config();

const client = new Twitter({
  consumer_key: "KCPwr2tWIOlYUJO4Doi2gUtRz",
  consumer_secret: "kr4aylIrYi5SE1TlaAcebJBQXcpATp1fir1baC78bHfin9tihy",
  access_token_key: "3020076014-1rFyhoohSGiYYTdYwGOgJtNCWKqAIQOyBFXX3dV",
  access_token_secret: "sTezxJuHuA3XYkYOnsDusRzjmW0rGp3SP7bETw1RrgxiC",
});

(async () => {
  try {
    const response = await client.post('statuses/update', { status: 'yoo' });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();

