export const getCurrentTime = (setDate: (hour: number) => void): NodeJS.Timer => {
    const intervalID = setInterval(() => {
        const currentDate: Date = new Date();
        setDate(currentDate.getHours())
   },1000);
   return intervalID
}

export default getCurrentTime 