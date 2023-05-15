import {requestApi} from "../Funcinalities"

export const insertLikesAttack = async (formData: {}[]) => {
    // const body = {
    //     email: email,
    //     loginNameTwitter : loginNameTwitter,
    //     username : username,
       
    // }
    try {
    await requestApi('http://localhost:3002/twitterClass/insert_Likes_Attack', {
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

  export default insertLikesAttack