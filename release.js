const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;
const pullRequestNumber = github.context.payload.pull_request.number;

async function getMostRecentRelease() {
  const response = await octokit.repos.listReleases({
    owner: owner,
    repo: repo
  });

  if (response.data.length > 0) {
    return response.data[0];
  } else {
    return null;
  }
}

async function createDraftRelease(releaseNumber, body) {
  return octokit.repos.createRelease({
    owner: owner,
    repo: repo,
    tag_name: releaseNumber,
    name: releaseNumber + "-PR" + pullRequestNumber,
    body: body,
    draft: true
  });
}

module.exports.getMostRecentRelease = getMostRecentRelease;
module.exports.createDraftRelease = createDraftRelease;