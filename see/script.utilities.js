import {zeroPad} from "./utilities.js";

const getStepLabel = step => zeroPad(step, 3);

const getStepLabelTime = step => `step_${getStepLabel(step)}`;

const recordStep = (step, msg) => console.log(`${(getStepLabelTime(step))}:`, msg);

const recordTimeStart = (step) => console.time(getStepLabelTime(step))

const recordTimeLog = (step) => console.timeLog(getStepLabelTime(step))

const recordTimeEnd = (step) => console.timeEnd(getStepLabelTime(step))

export {
    recordStep,
    recordTimeStart,
    recordTimeEnd,
    recordTimeLog

};