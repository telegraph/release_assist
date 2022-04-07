const github = require('@actions/github');
const core = require("@actions/core");
const oktokit = require("@octokit/rest");

const token = core.getInput('repo-token');
// const octokit = github.getOctokit(token);

async function getTopics() {
  const topics = oktokit.getAllTopics();
  core.info(topics);
  return topics;
}

async function replaceTopics(topics) {
  return oktokit.replaceTopics(topics)
}

async function addTopics(topics) {
  const oldTopics = await getTopics();
  return oktokit.replaceAllTopics(oldTopics + topics);
}

module.exports.getTopics = getTopics;
module.exports.addTopics = addTopics;
module.exports.replaceTopics = replaceTopics;
