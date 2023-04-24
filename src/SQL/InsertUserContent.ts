import {requestApi} from "../Funcinalities"

export const insertUserContent = async (formData: {}[]) => {
    // const body = {
    //     email: email,
    //     loginNameTwitter : loginNameTwitter,
    //     username : username,
       
    // }
    try {
    await requestApi('http://localhost:3002/database/insert_User_Content', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(formData)

    })
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default insertUserContent