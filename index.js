const core = require('@actions/core');
const { deleteLabel } = require('./labels');
const { addTopics } = require('./topics');

async function run() {
  try {
    core.info('running update-topics-from-pom');

    const res = await addTopics("pippo");
    await deleteLabel('add-pom-topics');
    core.info(res);

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();