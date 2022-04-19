const github = require('@actions/github');
const core = require("@actions/core");
const { request } = require("@octokit/request");
const { createTokenAuth } = require("@octokit/auth-token");

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;

async function getTopics() {
  return await octokit.rest.repos.getAllTopics({
    owner,
    repo
  })
}

async function replaceTopics(topics) {

  core.info("Owner: " + owner)
  core.info("repo: " + repo)
  core.info("Authenticating...")
  const regToken = await octokit.request('POST /orgs/{org}/actions/runners/registration-token', {
    org: owner
  })

  core.info("Authentication Token");
  core.info("token: " + regToken.token);
  core.info("exp date: " + regToken.expires_at);

  core.info('Replace topics with: ' + topics);
  return await octokit.rest.repos.replaceAllTopics({
    owner,
    repo,
    topics
  });
}

async function addTopics(topics) {
  const oldTopics = await getTopics();
  await replaceTopics(oldTopics.data.names + topics);
}

module.exports.getTopics = getTopics;
module.exports.addTopics = addTopics;
module.exports.replaceTopics = replaceTopics;