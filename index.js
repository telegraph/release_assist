const core = require('@actions/core');
const { getPullRequestDraftRelease, deleteRelease } = require('./release');

async function run() {
  try {
    core.info('running');

    const pullRequestRelease = await getPullRequestDraftRelease();

    if (pullRequestRelease == null) {
      core.info('no PR release found. nothing to delete');
      return;
    }

    await deleteRelease(pullRequestRelease.id);

    core.info('release: ' + pullRequestRelease.tag_name + ' successfully deleted');

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();