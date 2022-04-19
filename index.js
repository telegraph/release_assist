const core = require('@actions/core');
const { deleteLabel } = require('./labels');
const { getTopics, addTopics, replaceTopics } = require('./topics');

async function run() {
  try {
    core.info('running update-topics-from-pom');

    let topics = await getTopics();
    core.info('Current Topics: ' + topics.data.names);
    await replaceTopics(["pippo", "pluto"]);
    // await addTopics(["pippo", "pluto"]);
    // await deleteLabel('add-pom-topics');
    core.info('After replace');
    topics = await getTopics();
    core.info('Topics now: ' + topics.data.names);

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();