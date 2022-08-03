const xml2js = require('xml2js');
const core = require('@actions/core');

function cleanPom(xml) {
    let dependencies;
    let artifacts = [];
    let parser = new xml2js.Parser();
    parser.parseString(xml, function (err, result) {
        dependencies = result['project']['dependencies'][0]['dependency'];
        for (let index = 0; index < dependencies.length; index++)
            if (dependencies[index]["groupId"] == "uk.co.telegraph") {
                artifacts.push(dependencies[index]["artifactId"]);
                let version = dependencies[index]["version"];
                if (version) {
                    core.info("Version in POM: " + version);
                    if (version.toString().startsWith("$")) {
                        core.info("Version is stored in Properties");
                        let variable_name = variable_name.slice(2, variable_name.length-1).replace(/ /g,"");
                        core.info("Property Name: " + variable_name);
                        version = result['properties']['properties'][0][variable_name];
                        core.info("Version: " + version);
                    }
                    artifacts.push(dependencies[index]["artifactId"] + "-" + version.toString().replace(/\./g, "-"));
                }
            }
    });
    return artifacts;
}

module.exports.cleanPom = cleanPom;