const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;
const pullRequestNumber = github.context.payload.pull_request.number;

async function deleteLabel(labelName) {
  // get draft release from label
  const labels_response = await octokit.issues.listLabelsOnIssue({
    owner: owner,
    repo: repo,
    issue_number: pullRequestNumber
  });

  if (labels_response.data.length > 0) {
    let label = labels_response.data.find(label => label.name.includes(labelName));
    if (typeof label !== 'undefined') {
      //delete draft label
      await octokit.issues.deleteLabel({
        owner: owner,
        repo: repo,
        name: label.name
      });
      core.info('label ' + label.name + ' deleted')
      return;
    } else {
      core.info('label ' + label.name + ' not found')
      return null;
    }
  } else {
    core.info('no labels where found')
    return null;
  }
}

async function updateRelease(releaseNumber, tagName) {
  return octokit.repos.updateRelease({
    owner: owner,
    repo: repo,
    name: tagName,
    release_id: releaseNumber,
    draft: false
  });
}

module.exports.deleteLabel = deleteLabel;