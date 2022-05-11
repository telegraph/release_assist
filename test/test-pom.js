const { cleanPom } = require('../pom');

const assert = require('assert');

describe('Testing POM cleaning', function() {
    it('Testing dependencies fetching', function() {
        let pom =
            "<project><dependencies>" +
                "<dependency>" +
                    "<groupId>uk.co.telegraph</groupId>" +
                    "<artifactId>tmg-model</artifactId>" +
                    "<version>0.0.0</version>" +
                "</dependency>" +
                "<dependency>" +
                    "<groupId>uk.co.telegraph</groupId>" +
                    "<artifactId>tmg-test</artifactId>" +
                "</dependency>" +
                "<dependency>" +
                    "<groupId>some.other.company</groupId>" +
                    "<artifactId>should-not-appear</artifactId>" +
                    "<version>0.0.0</version>" +
                "</dependency>" +
            "</dependencies></project>";
        let result = cleanPom(pom);
        assert.equal("tmg-model,tmg-model-0-0-0,tmg-test", result.toString());
    })
})