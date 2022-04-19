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

  // core.info("Authenticating...")
  // const auth = createTokenAuth(token);
  // const authentication = await auth();

  // core.info('===== AUTHENTICATION =====');
  // core.info('auth type: ' + authentication.type);
  // core.info('auth token: ' + authentication.token);
  // core.info('auth token type: ' + authentication.tokenType);
  //
  // core.info('Replace topics with: ' + topics);

  return await octokit.rest.repos.replaceAllTopics({
    owner,
    repo,
    topics
  })
}

async function addTopics(topics) {
  const oldTopics = await getTopics();
  await replaceTopics(oldTopics.data.names + topics);
}

module.exports.getTopics = getTopics;
module.exports.addTopics = addTopics;
module.exports.replaceTopics = replaceTopics;