const xml2js = require('xml2js');

function cleanPom(xml) {
    let dependencies;
    let artifacts = [];
    let parser = new xml2js.Parser();
    parser.parseString(xml, function(err,result){
        //Extract the value from the data element
        dependencies = result['project']['dependencies'][0]['dependency'];
        for (let index = 0; index < dependencies.length; index++)
            if(dependencies[index]["groupId"] == "uk.co.telegraph")
                artifacts.push(dependencies[index]["artifactId"]);
    });
    return artifacts;
}

module.exports.cleanPom = cleanPom;