const { promises: fs } = require('fs')

async function readFile(path) {
    let content = await fs.readFile(path, 'utf8')
    return content;
}

module.exports.readFile = readFile;