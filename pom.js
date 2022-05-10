const xml2js = require('xml2js');
const core = require('@actions/core');

function cleanPom(xml) {
    let dependencies;
    let artifacts = [];
    let parser = new xml2js.Parser();
    parser.parseString(xml, function(err,result){
        dependencies = result['project']['dependencies'][0]['dependency'];
        for (let index = 0; index < dependencies.length; index++)
            if(dependencies[index]["groupId"] == "uk.co.telegraph") {
                artifacts.push(dependencies[index]["artifactId"]);
                let version = dependencies[index]["version"] + "";
                core.info("--- version:");
                core.info(version);
                if(version)
                    artifacts.push(dependencies[index]["artifactId"] + "-" + version.replace(/\./g,"-"));
            }
    });
    return artifacts;
}

module.exports.cleanPom = cleanPom;