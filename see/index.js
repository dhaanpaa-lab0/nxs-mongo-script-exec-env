// 1... Load Sensitive Environment Defaults
import { config } from "dotenv-defaults";
config();

import {recordStep, recordTimeEnd, recordTimeStart} from "./script.utilities.js";
import {getGlobalConfig, getScriptList} from "./host.utilities.js";
import {isEmptyObject} from "./utilities.js";

let globalConfig = getGlobalConfig();
if (isEmptyObject(globalConfig)) {
    console.error("Configuration File Not Found")
    process.exit(1)

}


console.table({
    mongoDbServer: process.env.MONGO_SERVER
});

console.log(getScriptList())

recordTimeStart(1)
recordStep(1, "This is a test message")
recordStep(1, "Configuration")
recordStep(1,globalConfig)

recordTimeEnd(1)