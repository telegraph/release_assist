const xml2js = require('xml2js');

function cleanPom(xml) {
    let dependencies;
    let artifacts = [];
    let parser = new xml2js.Parser();
    parser.parseString(xml, function(err,result){
        dependencies = result['project']['dependencies'][0]['dependency'];
        for (let index = 0; index < dependencies.length; index++)
            if(dependencies[index]["groupId"] == "uk.co.telegraph") {
                artifacts.push(dependencies[index]["artifactId"]);
                artifacts.push(dependencies[index]["artifactId"] + "-" + dependencies[index]["version"].replace(".","_"));
            }
    });
    return artifacts;
}

module.exports.cleanPom = cleanPom;