const core = require('@actions/core');
const { deleteLabel } = require('./labels');
// const { readFile } = require('./read_file');
const { getTopics, addTopics, replaceTopics } = require('./topics');

const content = core.getInput('topics');

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
    core.info('=== CONTENT: ');
    // await readFile(path);
    core.info(content);

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();