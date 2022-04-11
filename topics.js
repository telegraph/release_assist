const github = require('@actions/github');
const core = require("@actions/core");
const { request } = require("@octokit/request");
const { createTokenAuth } = require("@octokit/auth-token");

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;
const auth = createTokenAuth(token);
const authentication = await auth();

async function getTopics() {
  return await octokit.request('GET /repos/{owner}/{repo}/topics', {
    owner: owner,
    repo: repo
  })
}

async function replaceTopics(topics) {
  core.info('===== AUTH =====');
  core.info('auth: ' + auth);
  core.info('auth data' + auth.data);
  core.info('auth data type' + auth.data.type);
  core.info('auth data token' + auth.data.token);
  core.info('auth data token type' + auth.data.tokenType);
  core.info('auth type' + auth.type);
  core.info('auth token' + auth.token);
  core.info('auth token type' + auth.tokenType);
  core.info('request PUT /repos/{owner}/{repo}/topics');
  await request('PUT /repos/{owner}/{repo}/topics', {
    headers: authentication.headers,
    owner: owner,
    repo: repo,
    names: topics
  });
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
