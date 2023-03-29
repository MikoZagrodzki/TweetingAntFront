import requestApi from "./RequestApi"


export const triggerLoginToTwitterAccount = async (driver: string, twitterEmail: string, twitterPassword: string) => {
    const body = {
        driverId : driver,
        email : twitterEmail,
        password : twitterPassword
    }
    try {
    await requestApi('http://localhost:3002/selenium/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body)

    })
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default triggerLoginToTwitterAccount