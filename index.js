const core = require('@actions/core');
const { deleteLabel } = require('./labels');
const { readFile } = require('./read_file');
const { getTopics, addTopics, replaceTopics } = require('./topics');

async function run() {
  try {
    core.info('running update-topics');

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();