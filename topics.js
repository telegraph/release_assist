const github = require('@actions/github');
const core = require("@actions/core");
const { createTokenAuth } = require("@octokit/auth-token");

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;

const auth = createTokenAuth(token);
// const authentication = await auth();

async function getTopics() {
  return await octokit.request('GET /repos/{owner}/{repo}/topics', {
    owner: owner,
    repo: repo
  })
}

async function replaceTopics(topics) {
  core.info('===== AUTH =====');
  core.info('auth: ' + auth);
  core.info('auth type' + auth.type);
  core.info('auth token' + auth.token);
  core.info('auth token type' + auth.tokenType);
  core.info('octokit.request PUT /repos/{owner}/{repo}/topics');
  await octokit.request('PUT /repos/{owner}/{repo}/topics', {
    owner: owner,
    repo: repo,
    names: topics
  })
}

async function addTopics(topics) {
  const oldTopics = await getTopics();
  await replaceTopics(oldTopics.data.names + topics);
}

module.exports.getTopics = getTopics;
module.exports.addTopics = addTopics;
module.exports.replaceTopics = replaceTopics;