#!/usr/bin/env node

const core = require('@actions/core');
const github = require('@actions/github');

try {
    core.setOutput("label", github.context.payload.label.name)
    //core.setOutput("pr_body", github.context.payload.pull_request.body);
    core.setOutput("pr_body", "platforms");
    core.setOutput("team_name", "platforms1");
} catch (error) {
    core.setFailed(error.message);
}
