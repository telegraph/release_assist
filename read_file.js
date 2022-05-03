const { promises: fs } = require('fs')

async function readFile(path) {
    let content = await fs.readFile(path, 'utf8')
    return content;
}

function cleanPom(pom) {
    let content = "TO DO"
    return content;
}

module.exports.readFile = readFile;
module.exports.cleanPom = cleanPom;