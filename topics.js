const github = require('@actions/github');

function getTopics() {
  return github.context.payload.getAllTopics();
}

function replaceTopics(topics) {
  return github.context.payload.replaceAllTopics(topics);
}

function addTopics(topics) {
  const oldTopics = getTopics();
  return github.context.payload.replaceAllTopics(oldTopics + topics);
}

module.exports.getTopics = getTopics;
module.exports.addTopics = addTopics;
module.exports.replaceTopics = replaceTopics;
