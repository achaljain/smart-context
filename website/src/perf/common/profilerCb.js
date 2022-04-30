let simulateTime = 0;

const callback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime // when React committed this update
) => {
  // console.log('id - ', id);
  // console.log('phase - ', phase);
  // console.log('actualDuration - ', actualDuration);
  // console.log('startTime - ', startTime);
  // console.log('commitTime - ', commitTime);
  if (window.logStartTime === "start") {
    window.logStartTime = "";
    simulateTime = commitTime;
  }

  if (window.logStartTime === "end") {
    simulateTime = commitTime - simulateTime;
    window.logStartTime = "";
    console.log("SIMULATE TIME - ", simulateTime);
    return simulateTime;
  }

  return null;
};

export default callback;
