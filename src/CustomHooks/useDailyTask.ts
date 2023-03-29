import { useEffect, useState } from 'react';
import { generateTwitterAccounts } from '../Funcinalities';

const useDailyTask = (Drivers:any) => {
  const [taskResult, setTaskResult] = useState<{}[] | null >(null);

  useEffect(() => {
    const executeTask = () => {
      console.log('Daily task executed at', new Date());
      // Your daily task code here
      const result = generateTwitterAccounts(Drivers); // Replace with the actual result from your daily task
      setTaskResult(result);
    };

    const getNextMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      return tomorrow.getTime() - now.getTime();
    };

    // Execute the task immediately on startup
    executeTask();

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

