const core = require('@actions/core');
const xml2js = require('xml2js');

function cleanPom(xml) {
    let extractedData;
    let parser = new xml2js.Parser();
    parser.parseString(xml, function(err,result){
        //Extract the value from the data element
        extractedData = result['project'];
        core.info(" ~ POM Extracted Data 1 ~ ");
        core.info(result['project'].toString());
        core.info(result['project']['dependencies'].toString());
        core.info(result['project']['dependencies']['dependency'].toString());
        core.info(result['project']['dependencies']['dependency']['groupId'][0].toString());
    });
    core.info(" ~ POM Extracted Data 2 ~ ");
    core.info(extractedData.toString());

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