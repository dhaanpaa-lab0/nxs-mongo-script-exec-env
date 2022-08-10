import fs from "fs";
import YAML from "yaml";


const getGlobalConfig = () => {
    if (fs.existsSync('./config.yaml')) {
        const globalConfigFile = fs.readFileSync('./config.yaml', 'utf8')
        return YAML.parse(globalConfigFile).config;
    }
    return {};
}

const getScriptList = () => {
    const scripts = fs.readdirSync("./scripts").filter(s => s.endsWith(".js"));
    console.table(scripts);
    return scripts;
}

export {
    getGlobalConfig,
    getScriptList
}