const core = require("@actions/core");
const { promises: fs } = require('fs')

async function readFile() {
    const path = core.getInput('path');
    let content = await fs.readFile(path, 'utf8')
    core.info(" === FILE");
    core.info(content);
}