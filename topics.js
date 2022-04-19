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
  // This works too
  // return await octokit.request('GET /repos/{owner}/{repo}/topics', {
  //   owner: owner,
  //   repo: repo
  // })
}

async function replaceTopics(topics) {
  // const auth = createTokenAuth(token);
  // const authentication = await auth();

  // core.info('===== AUTH =====');
  // core.info('auth: ' + auth);
  // core.info('auth type: ' + auth.type);
  // core.info('auth token: ' + auth.token);
  // core.info('auth token type: ' + auth.tokenType);

  // core.info('===== AUTHENTICATION =====');
  // core.info('auth: ' + authentication);
  // core.info('auth type: ' + authentication.type);
  // core.info('auth token: ' + authentication.token);
  // core.info('auth token type: ' + authentication.tokenType);
  // core.info('request PUT /repos/{owner}/{repo}/topics');

  core.info('You want this topics');
  core.info(topics);

  return await octokit.rest.repos.replaceAllTopics({
    owner,
    repo,
    topics
  });

  // await request('PUT /repos/{owner}/{repo}/topics', {
  //   headers: {
  //     authorization: authentication.token
  //   },
  //   owner: owner,
  //   repo: repo,
  //   names: topics
  // });

  // core.info('octokit.request PUT /repos/{owner}/{repo}/topics');
  // await octokit.request('PUT /repos/{owner}/{repo}/topics', {
  //   owner: owner,
  //   repo: repo,
  //   names: topics
  // })
}

async function addTopics(topics) {
  const oldTopics = await getTopics();
  await replaceTopics(oldTopics.data.names + topics);
}

module.exports.getTopics = getTopics;
module.exports.addTopics = addTopics;
module.exports.replaceTopics = replaceTopics;