const GITHUB = require('@actions/github');
const CORE = require("@actions/core");
const XLM2js = require('xml2js');
const FS = require('fs');

const assert = require('assert');

describe('Testing the dependencies', function() {
        it('GITHUB exists', function() {
            assert.notEqual('undefined', GITHUB);
        }),
        it('CORE exists', function() {
            assert.notEqual('undefined', CORE);
        }),
        it('XLM2js exists', function() {
            assert.notEqual('undefined', XLM2js);
        }),
        it('FS exists', function() {
            assert.notEqual('undefined', FS);
        })
})