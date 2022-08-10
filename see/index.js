// 1... Load Environemnt Specific Configuration
import {config} from 'dotenv-defaults';
config();

// 2... Load Functions needed
import {
  getGlobalConfig,
  getScriptList,
  loadAndExecuteScript} from './host.utilities.js';
import {isEmptyObject} from './utilities.js';
import {MongoClient} from 'mongodb';
import {recordStep} from './script.utilities.js';

// 3... Load Non Environment Specific Configuration
const globalConfig = getGlobalConfig();
if (isEmptyObject(globalConfig)) {
  console.error('Configuration File Not Found');
  process.exit(1);
}

// 4... Combine Host and environment configuration
const hostConfig = {
  scriptToExecute: process.argv[2],
  mongoDbServer: process.env.MONGO_SERVER,
  ...globalConfig,
};


const scriptList = getScriptList();
console.log(Object.keys(scriptList));
console.log(hostConfig);

// 5... Check if script requested is in script list
// and not in special scripts list

if (hostConfig.scripts_to_run_before.includes(hostConfig.scriptToExecute)) {
  // eslint-disable-next-line max-len
  console.error('ERROR: Cannot request to run script that is in scripts_to_run_before config array');
  process.exit(1);
}

if (hostConfig.scripts_to_run_after.includes(hostConfig.scriptToExecute)) {
  // eslint-disable-next-line max-len
  console.error('ERROR: Cannot request to run script that is in scripts_to_run_after config array');
  process.exit(1);
}

if (!(hostConfig.scriptToExecute in scriptList)) {
  console.error('ERROR: Cannot request to run script that does not exist');
  process.exit(1);
}

const scriptsToBeExecuted = [
  ...hostConfig.scripts_to_run_before,
  hostConfig.scriptToExecute,
  ...hostConfig.scripts_to_run_after];

const mongoDatabaseClient = new MongoClient(hostConfig.mongoDbServer);
scriptsToBeExecuted.forEach((scriptToExecute) => {
  const scriptToExecuteFile = scriptList[scriptToExecute];
  loadAndExecuteScript(scriptToExecuteFile, mongoDatabaseClient)
      .then((r) => recordStep(999, `Finished Executing "${scriptToExecute}"`));
});
console.log(scriptsToBeExecuted);
