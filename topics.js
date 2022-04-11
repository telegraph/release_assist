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
  // core.info('request PUT /repos/{owner}/{repo}/topics');
  // await request('PUT /repos/{owner}/{repo}/topics', {
  //   headers: {
  //     authorization: "Barer " + token
  //   },
  //   owner: owner,
  //   repo: repo,
  //   names: topics
  // });
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
