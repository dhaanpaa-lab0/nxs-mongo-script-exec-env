import fs from "fs";
import YAML from "yaml";


const getGlobalConfig = () => {
    if (fs.existsSync('./config.yaml')) {
        const globalConfigFile = fs.readFileSync('./config.yaml', 'utf8')
        return YAML.parse(globalConfigFile);
    }
    return {};
}

export {
    getGlobalConfig
}