const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;
const pullRequestNumber = github.context.payload.pull_request.number;

async function getPullRequestDraftRelease() {
  const response = await octokit.repos.listReleases({
    owner: owner,
    repo: repo
  });

  const labels_response = octokit.issues.listLabelsOnIssue({
    owner: owner,
    repo: repo,
    issue_number: pullRequestNumber
  });

  core.info(labels_response)

  if (response.data.length > 0) {
    return response.data.find(release => release.draft && release.name && release.name.includes("PR" + pullRequestNumber));
  } else {
    return null;
  }
}

async function deleteRelease(releaseNumber) {
  return octokit.repos.deleteRelease({
    owner: owner,
    repo: repo,
    release_id: releaseNumber
  });
}

module.exports.getPullRequestDraftRelease = getPullRequestDraftRelease;
module.exports.deleteRelease = deleteRelease;