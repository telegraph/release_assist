const core = require('@actions/core');
const { readFile } = require('./read_file');
const { cleanPom } = require('./read_file');
const { getTopics, addTopics, replaceTopics } = require('./topics');

const path = core.getInput('path');
const replace = core.getInput('replace-topics');
const isPom = core.getInput('is-pom');

async function run() {
  try {
    core.info("Previous Topics: " + (await getTopics()).data.names);
    let topics;
    core.info("from POM?: " + isPom);
    if(isPom)
      topics = cleanPom(readFile(path))
    else
      topics = (await readFile(path)).replace(" ", "-").split(/\r?\n/);
    core.info("Topics to add: " + topics);
    core.info("replace: " + replace);
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