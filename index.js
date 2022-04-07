const core = require('@actions/core');
const { deleteLabel } = require('./labels');
const { addTopics } = require('./topics');

async function run() {
  try {
    core.info('running');

    const res = addTopics("pippo");
    await deleteLabel('add-pom-topics');
    core.info(res);

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();