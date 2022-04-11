const github = require('@actions/github');
const core = require("@actions/core");
const { request } = require("@octokit/request");

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;
const tokenAuth = "Barer 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";

async function getTopics() {
  return await octokit.request('GET /repos/{owner}/{repo}/topics', {
    owner: owner,
    repo: repo
  })
}

async function replaceTopics(topics) {
  core.info('token: ' + token);
  core.info('token Auth: ' + tokenAuth);
  await request('PUT /repos/{owner}/{repo}/topics', {
    headers: {
      accept: "application/vnd.github.v3+json",
      authorization: tokenAuth,
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
