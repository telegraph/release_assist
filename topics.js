const github = require('@actions/github');
const core = require("@actions/core");
const { request } = require("@octokit/request");

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;

async function getTopics() {
  return await octokit.request('GET /repos/{owner}/{repo}/topics', {
    owner: owner,
    repo: repo
  })
}

async function replaceTopics(topics) {
  let authorizations = await octokit.request('POST /authorizations', {
    scopes: [
      'scopes'
    ]
  })
  core.info('url: ' + topics.url);
  core.info('token: ' + topics.data.token);
  core.info('token last 8: ' + topics.data.token_last_eight);
  await request('PUT /repos/{owner}/{repo}/topics', {
    headers: {
      authorization: token
    },
    owner: owner,
    repo: repo,
    names: topics
  });
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
