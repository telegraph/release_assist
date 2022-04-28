const core = require('@actions/core');
const { readFile } = require('./read_file');
const { getTopics, addTopics, replaceTopics } = require('./topics');

const path = core.getInput('path');
const replace = core.getInput('replace');

async function run() {
  try {
    core.info('running update-topics');
    core.info("Previous Topics: " + (await getTopics()).data.names);
    let topics = (await readFile(path)).trim().split(/\r?\n/);
    core.info("Topics to add: " + topics);
    if(replace)
      await replaceTopics(topics)
    else
      await addTopics(topics);
    core.info("Current Topics: " + (await getTopics()).data.names);
  } catch (error) {
      core.setFailed(error.message);
  }
}

run();