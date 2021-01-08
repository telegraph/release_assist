const core = require('@actions/core');
const { getMostRecentRelease, deleteRelease } = require('./release');

async function run() {
  try {
    core.info('running');

    const latestRelease = await getMostRecentRelease();

    if (latestRelease == null) {
      core.info('no release found. nothing to delete');
      return;
    }

    if (!latestRelease.draft) {
      core.info('latest release is not a draft release');
      return;
    }

    await deleteRelease(latestRelease.id);

    core.info('release: ' + latestRelease.tag_name + ' successfully deleted');

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();