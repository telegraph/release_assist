const core = require('@actions/core');
const xml2js = require('xml2js');

function cleanPom(pom) {
    core.info("POM: " + pom);
    let parser = new xml2js.Parser();
    parser.parseString(xml, function(err,result){
        //Extract the value from the data element
        extractedData = result['project']['repositories']['repository']['id'];
        console.log(extractedData);
    });



    // parser.parseStringPromise(data).then(function (result) {
    //     console.dir(result);
    //     console.log('Done');
    // })
    //     .catch(function (err) {
    //         // Failed
    //     });
    return content;
}

module.exports.cleanPom = cleanPom;