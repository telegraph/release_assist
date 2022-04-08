const github = require('@actions/github');
const core = require("@actions/core");
const {createTokenAuth} = require("./dist");

const token = core.getInput('repo-token');
const octokit = github.getOctokit(token);
const owner = github.context.payload.repository.owner.login;
const repo = github.context.payload.repository.name;
// const tokenAuth = createTokenAuth(token);
const tokenAuth = "Bearer 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";

async function getTopics() {
  return await octokit.request('GET /repos/{owner}/{repo}/topics', {
    owner: owner,
    repo: repo
  })
}

async function replaceTopics(topics) {
  await octokit.request('PUT /repos/{owner}/{repo}/topics', {
    owner: owner,
    repo: repo,
    names: topics,
    auth: tokenAuth
  })
}

async function addTopics(topics) {
  const oldTopics = await getTopics();
  await replaceTopics(oldTopics.data.names + topics);
}

module.exports.getTopics = getTopics;
module.exports.addTopics = addTopics;
module.exports.replaceTopics = replaceTopics;
