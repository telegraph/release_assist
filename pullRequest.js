const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('repo-token');
const teamName = core.getInput('team-name');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;
const pullRequestNumber = github.context.payload.pull_request.number;

async function extractPullRequestCommits() { 
  const commits = await octokit.pulls.listCommits({
    owner: owner,
    repo: repo,
    pull_number: pullRequestNumber,
    per_page: 100
  });

  core.info('fetched: ' + commits.data.length + ' commits');

  return commits;
}

async function updatePullRequest(releaseVersionNumber, releaseNotes) {
  const pullRequestBody = `
<team_name>${teamName}</team_name>
<release_version>${releaseVersionNumber}</release_version>
<release_description>

 Release Notes: 
 ${releaseNotes}

 Impact:
  - yahoo-uk-feed-trigger

</release_description>
  `;
  
  return octokit.pulls.update({
    owner: owner,
    repo: repo,
    pull_number: pullRequestNumber,
    body: pullRequestBody
  });
}

module.exports.extractPullRequestCommits = extractPullRequestCommits;
module.exports.updatePullRequest = updatePullRequest;