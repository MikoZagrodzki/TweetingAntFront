import { LoginData } from "../TypesApi";

  
  const dailyTask = (taskToExecute:any) => {
    const taskResultRef = { current: [] };
    const isFirstRunRef = { current: true };
    let dailyInterval = null;
  
    const executeTask = (taskToExecute:any) => {
      console.log('Daily task executed at', new Date());
      const result = taskToExecute();
      taskResultRef.current = result;
    };
  
    const getNextMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      return tomorrow.getTime() - now.getTime();
    };
  
    const scheduleTask = () => {
      const initialTimeout = setTimeout(() => {
        executeTask(taskToExecute);
        dailyInterval = setInterval(executeTask, 24 * 60 * 60 * 1000);
      }, getNextMidnight());
  
      return initialTimeout;
    };
  
    if(isFirstRunRef.current){
      executeTask(taskToExecute);
      isFirstRunRef.current = false;
    }
  
    if(!dailyInterval){
      const initialTimeout = scheduleTask();
      return taskResultRef.current;
    }
  
    return taskResultRef.current;
  };
  
  export default dailyTask;
  