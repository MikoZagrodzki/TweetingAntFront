

export const getCurrentTime = (setDate: (hour: number) => void, twentyFourHourInterval: (x: string[], y :any) => void , drivers: string[], setTwitterAccountsWithClass: any): NodeJS.Timer => {
    const intervalID = setInterval(() => {
        const currentDate: Date = new Date();
        if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0 && currentDate.getSeconds() === 0) {
            twentyFourHourInterval(drivers, setTwitterAccountsWithClass);
            console.log('24h Interval working')
          }
        setDate(currentDate.getHours())
   },1000);
   return intervalID
}

export default getCurrentTime 