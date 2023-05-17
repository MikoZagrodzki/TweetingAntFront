
const requestApi = async (
  url: string,
  reqParams:{}|undefined,
) => {
    try {
    const response = await fetch(url, reqParams);
    if (!response.ok) {
      throw new Error("Please reload the app");
    }
    const apiResponse = await response.json();
    return apiResponse;
  } catch(error){
    console.error(error)
  }

};

export default requestApi;