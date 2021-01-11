#!/usr/bin/env node

const core = require('@actions/core');
const github = require('@actions/github');

function extractJiraTicketId(branchName) {
  const result = /(?<jira_id>[A-Z]+-[0-9]+).*/.exec(branchName);
    
  if (result == null) {
    core.warning('branch name doesnt match expected pattern (PLTX-1234-cool-feature): ' + branchName);
    return branchName;
  } else {
    return result.groups.jira_id;
  }
}

try {
    const jiraTicketId = extractJiraTicketId(github.context.payload.pull_request.head.ref);
    core.info('jiraTicketId: ' + jiraTicketId);

    core.setOutput("label", github.context.payload.label.name);
    core.setOutput("project_name", github.context.payload.repository.name);
    core.setOutput("pr_link", github.context.payload.pull_request.html_url);
    core.setOutput("original_ticket", jiraTicketId);

    // extract optional fields from PR body 
    ks = ["team_name", "release_description", "release_version"];	    
    ks.forEach(function(elem) {
      let re = new RegExp(`<\s*?(${elem})\s*?>([\\\s\\\S]*?)<\/\s*?${elem}>\s*?`);
      res = github.context.payload.pull_request.body.match(re);
      if (res != null) {
        core.setOutput(res[1], res[2].replace(/[\n\r]+/g, ' '));
      }
    });	
} catch (error) {
    core.setFailed(error.message);
}
