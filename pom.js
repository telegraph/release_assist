const core = require('@actions/core');
const xml2js = require('xml2js');

function cleanPom(pom) {
    core.info("POM: " + pom);
    let extractedData;
    let parser = new xml2js.Parser();
    parser.parseString(xml, function(err,result){
        //Extract the value from the data element
        extractedData = result['project']['repositories']['repository']['id'];
    });
    core.info(" ~ POM Extracted Data ~ ");
    core.info(extractedData);

    // parser.parseStringPromise(data).then(function (result) {
    //     console.dir(result);
    //     console.log('Done');
    // })
    //     .catch(function (err) {
    //         // Failed
    //     });
    return extractedData;
}

module.exports.cleanPom = cleanPom;