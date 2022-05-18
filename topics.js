const github = require('@actions/github');
const core = require("@actions/core");

const token = core.getInput('repo-token');
const octokit = github.getOctokit(repo-token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;

async function getTopics() {
  return await octokit.rest.repos.getAllTopics({
    owner,
    repo
  })
}

async function replaceTopics(names) {
  core.info("Saving: " + names);
  return await octokit.rest.repos.replaceAllTopics({
    owner,
    repo,
    names,
  })
}

async function addTopics(topics) {
  const oldTopics = await getTopics();
  let topicsToAdd = oldTopics.data.names.concat(topics);
  await replaceTopics(topicsToAdd);
}

async function removeAllTopics() {
  core.info("Removing all topics...");
  await replaceTopics([]);
}

module.exports.getTopics = getTopics;
module.exports.addTopics = addTopics;
module.exports.replaceTopics = replaceTopics;
module.exports.removeAllTopics = removeAllTopics;
