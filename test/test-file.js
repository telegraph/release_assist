const { readFile } = require('../file');

const assert = require('assert');

describe('Testing READ FILE', function() {
    it('Testing That a file is read and parsed properly', async function () {
        let file = await readFile("./test/test.txt");
        let file2 = await readFile("./test/test2.txt");
        let fileComma = await readFile("./test/test-comma.txt");
        assert.equal("Lorem ipsum dolor sit amet", file);
        assert.equal("Ut\nenim\nad\nminim\nveniam", file2);
        assert.equal("quis,nostrud,exercitation,ullamco", fileComma);
        assert.equal("Lorem,ipsum,dolor,sit,amet", file.replace(/ /g, '\r\n').split(/\r?\n/));
        assert.equal("Ut,enim,ad,minim,veniam", file2.replace(/ /g, '\r\n').split(/\r?\n/));
        assert.equal("quis,nostrud,exercitation,ullamco", fileComma.replace(/ /g, '\r\n').split(/\r?\n/));
    })
})