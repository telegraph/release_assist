const core = require('@actions/core');
const { deleteLabel } = require('./labels');
const { readFile } = require('./read_file');
const { getTopics, addTopics, replaceTopics } = require('./topics');

const path = core.getInput('path');

async function run() {
  try {

    core.info('running update-topics');
    // let topics = await getTopics();
    // core.info('=== Current Topics: ' + topics.data.names);
    // await replaceTopics(["pippo", "pluto"]);
    // // await deleteLabel('add-pom-topics');
    // core.info('=== After replace');
    // topics = await getTopics();
    // core.info('Topics now: ' + topics.data.names);
    // await addTopics(["pippo-2", "pluto-2"]);
    // core.info('=== After adding topics');
    // topics = await getTopics();
    // core.info('Topics now: ' + topics.data.names);
    core.info("Previous Topics: " + (await getTopics()).data.names);
    let topics = (await readFile(path)).trim().split(/\r?\n/);
    core.info("Topics to add: " + topics);
    await addTopics(topics);
    core.info("Current Topics: " + (await getTopics()).data.names);
    core.info( await getTopics());

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();