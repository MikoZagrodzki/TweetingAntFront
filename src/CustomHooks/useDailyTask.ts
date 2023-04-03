import { useEffect, useState, useRef } from 'react';
import { generateTwitterAccounts } from '../Funcinalities';
import TwitterAccount from '../TwitterAccount'

const useDailyTask = async (Drivers?:any) => {
  const [taskResult, setTaskResult] = useState< TwitterAccount[] | { hours: number,  minutes: number }[]>([]);
  const isFirstRun = useRef(true);
  
  const executeTask = async () => {
    console.log('Daily task executed at', new Date());
    // Your daily task code here
    const result = await generateTwitterAccounts(); // Replace with the actual result from your daily task
    setTaskResult(result);
  };



  useEffect(() => {
    if(isFirstRun.current){
      executeTask();
      isFirstRun.current = false;
    }
  },[])





  useEffect(() => {


    const getNextMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      return tomorrow.getTime() - now.getTime();
    };


    // Schedule the task to run at the next midnight (00:00:00)

    const initialTimeout = setTimeout(() => {
      executeTask();
      // Set an interval of 24 hours (86400000 ms) after the initial midnight execution
      const dailyInterval = setInterval(executeTask, 24 * 60 * 60 * 1000);

      // Clear the interval when the component is unmounted
      return () => clearInterval(dailyInterval);
    }, getNextMidnight());

    // Clear the initial timeout when the component is unmounted
    return () => clearTimeout(initialTimeout);
  }, []);

  return taskResult;
};

export default useDailyTask;

