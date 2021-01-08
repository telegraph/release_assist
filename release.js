const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;

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

async function updateRelease(releaseNumber) {
  return octokit.repos.updateRelease({
    owner: owner,
    repo: repo,
    release_id: releaseNumber,
    draft: false
  });
}

module.exports.getMostRecentRelease = getMostRecentRelease;
module.exports.updateRelease = updateRelease;