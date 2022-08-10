import fs from "fs";
import YAML from "yaml";
import * as path from "path";


const getGlobalConfig = () => {
    if (fs.existsSync('./config.yaml')) {
        const globalConfigFile = fs.readFileSync('./config.yaml', 'utf8')
        return YAML.parse(globalConfigFile).config;
    }
    return {};
}

const getScriptList = () => {
    const scripts = Object.fromEntries(fs
        .readdirSync("./scripts")
        .map(s => [path.basename(s,'.js'),`./scripts/${s}`]));

    console.table(scripts);
    return scripts;
}

export {
    getGlobalConfig,
    getScriptList
}