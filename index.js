const core = require('@actions/core');
const { deleteLabel } = require('./labels');
const { getTopics, addTopics } = require('./topics');

async function run() {
  try {
    core.info('running update-topics-from-pom');

    let topics = await getTopics();
    core.info('here previous topics: ');
    core.info(topics.data);
    // await addTopics(["pippo", "pluto"]);
    // await deleteLabel('add-pom-topics');

    topics = await getTopics();
    core.info('Topics now: ' + topics.data.names);

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();