import requestApi from "./RequestApi"


export const generateSeleniumDriver = async (driver: string) => {
    const body = {
        driverId : driver
    }
    try {
    await requestApi('http://localhost:3002/selenium/driver', {
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

  export default generateSeleniumDriver