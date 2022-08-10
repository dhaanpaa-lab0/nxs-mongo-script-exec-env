import fs from "fs";
import YAML from "yaml";
import * as path from "path";
import glob from "glob";


const getGlobalConfig = () => {
    if (fs.existsSync('./config.yaml')) {
        const globalConfigFile = fs.readFileSync('./config.yaml', 'utf8')
        return YAML.parse(globalConfigFile).config;
    }
    return {};
}


const getPath = (p) => `${path.dirname(p).replaceAll("/",":")}`.toLowerCase()
const getScriptKey = (p) => {
    return (getPath(p) + ":" +  path.basename(p, '.js')).replace(".:scripts:","");
}
const getScriptList = () => {
    const scriptsToRun = glob.sync("./scripts/**/*.js");

    console.log(scriptsToRun);
    const scripts = Object.fromEntries(
        scriptsToRun.map(s => [getScriptKey(s),s]))

    console.table(scripts);
    return scripts;
}

const loadAndExecuteScript = async (scr, db) => {
    // Load Javascript file into plugin variable
    const  plugin  = await import(scr)

    // Execute exported function from javscript file
    await plugin.executePlugin(db)
}

export {
    getGlobalConfig,
    getScriptList,
    loadAndExecuteScript
}