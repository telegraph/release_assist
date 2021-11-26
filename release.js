const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;
const pullRequestNumber = github.context.payload.pull_request.number;

async function getPullRequestDraftRelease() {

  // get draft release from label
  const labels_response = await octokit.issues.listLabelsOnIssue({
    owner: owner,
    repo: repo,
    issue_number: pullRequestNumber
  });

  // core.info(JSON.stringify(labels_response, null, 2));
  const draft_version = labels_response.data.find(label => label.name.includes('draftRelease:')).name.substring(13);

  // find draft releases
  const response = await octokit.repos.listReleases({
    owner: owner,
    repo: repo
  });

  if (response.data.length > 0) {
    return response.data.find(release => release.draft && release.name && release.name.includes(draft_version + "-PR" + pullRequestNumber));
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