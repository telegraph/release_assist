const core = require('@actions/core');
const xml2js = require('xml2js');

function cleanPom(pom) {
    core.info("POM: " + pom);
    let parser = new xml2js.parseFromString(pom, "text/xml");
    return content;
}

module.exports.cleanPom = cleanPom;