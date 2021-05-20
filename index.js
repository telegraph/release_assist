const core = require('@actions/core');
const { getPullRequestDraftRelease, updateRelease } = require('./release');

async function run() {
  try {
    core.info('running');

    const pullRequestRelease = await getPullRequestDraftRelease();

    if (pullRequestRelease == null) {
      core.info('no PR release found. nothing to update');
      return;
    }

    await updateRelease(pullRequestRelease.id, pullRequestRelease.tag_name);

    core.info('release: ' + pullRequestRelease.tag_name + ' successfully updated to a full release');

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();