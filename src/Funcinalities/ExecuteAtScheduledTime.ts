



export const executeAtScheduledTime = async (callback: any, timeData: [] | { hours: number,  minutes: number }[] ) => {
      

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    // iterate through each account and find the next scheduled time that hasn't passed yet
    let nextScheduledTime:any = null;
    
        // sort the howManyComments array in ascending order based on the time
        const sortedTimes = timeData.sort((a: any, b: any) => {
            if (a.hours === b.hours) {
                return a.minutes - b.minutes;
            }
            return a.hours - b.hours;
        });
            console.log(console.log(JSON.stringify(sortedTimes)) + ' sorted times ')
        // find the next scheduled time that hasn't passed yet
        const scheduledTime: any = sortedTimes.find((time: any) => {
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


export default executeAtScheduledTime