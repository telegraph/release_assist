#!/usr/bin/env node

const core = require('@actions/core');
const github = require('@actions/github');

try {
    core.setOutput("label", github.context.payload.label.name)
    core.setOutput("project_name", github.context.payload.repository.name);
    // extract optional fields from PR body 
    ks = ["team_name", "release_description", "release_version"];	    
    ks.forEach(function(elem) {
	    let re = new RegExp(`<!##(${elem})([\\\s\\\S]*?)##end`);
	    res = github.context.payload.pull_request.body.match(re);
        if (res != null) {
	       core.setOutput(res[1], res[2].replace(/[\n\r]+/g, ' '))	
	    }
    });	
} catch (error) {
    core.setFailed(error.message);
}
