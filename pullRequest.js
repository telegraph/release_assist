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

 ## Release Notes
 ${releaseNotes}

 ## Risk: (High/Medium/Low)
  - High: if the changes can't be tested/are not backwards compatible or the probability to create issues is high
  - Medium: if the changes have been tested and everthing works in preprod
  - Low: if the changes do not affect functionality (tests, docs, chore)

 ## Impact: (High/Medium/Low)
  - ${repo}
  - High: if the changes directly impact editorial or user facing services (cms, website, mobile app, apple news, amp, registrations, subscriptions)
  - Medium: if the changes directly impact backend services only
  - Low: if the changes do no impact any other services

## Impact description (what happens if the release is not successful): 
  - (i.e) AMP pages will not update or will be blank if there is no cache
  - (i.e) TCUK web pages won't update or will show an error of there is no cache
  - (i.e) all content API clients will show an error

## Downtime: expected downtime for this release
  - (i.e) Zero Downtime, 5 minutes, 30 minutes, etc

</release_description>
  `;
  
  return octokit.pulls.update({
    owner: owner,
    repo: repo,
    pull_number: pullRequestNumber,
    body: pullRequestBody
  });
}

async function addLabelToPullRequest(releaseVersionNumber) {
    const versionLabel = `draftRelease:${releaseVersionNumber}`

    core.info('Pull request: ' + pullRequestNumber)
    core.info('Version label: ' + versionLabel)

    return octokit.issues.addLabels({
        owner: owner,
        repo: repo,
        issue_number: pullRequestNumber,
        labels: [versionLabel]
    });
}

module.exports.extractPullRequestCommits = extractPullRequestCommits;
module.exports.updatePullRequest = updatePullRequest;
module.exports.addLabelToPullRequest = addLabelToPullRequest;
