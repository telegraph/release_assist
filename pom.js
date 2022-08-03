const xml2js = require('xml2js');

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
                    if (version[0] == '$') {
                        core.info("Version is stored in Properties");
                        let variable_name = str.slice(2, str.length-1).replace(/ /g,"");
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