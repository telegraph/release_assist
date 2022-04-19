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

  core.info("Authenticating...")
  // sends request with `Authorization: token mypersonalaccesstoken123` header
  const { data } = await octokit.request("/user");

  const { Octokit } = require("@octokit/rest");
  const { createAppAuth } = require("@octokit/auth-app");

  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 123,
      privateKey: process.env.PRIVATE_KEY,
      // optional: this will make appOctokit authenticate as app (JWT)
      //           or installation (access token), depending on the request URL
      installationId: 123,
    },
  });

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