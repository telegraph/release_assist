const core = require('@actions/core');
const { getMostRecentRelease, updateRelease } = require('./release');

async function run() {
  try {
    core.info('running');

    const latestRelease = await getMostRecentRelease();

    if (latestRelease == null) {
      core.info('no release found. nothing to update');
      return;
    }

    if (!latestRelease.draft) {
      core.info('latest release is not a draft release');
      return;
    }

    await updateRelease(latestRelease.id);

    core.info('release: ' + latestRelease.tag_name + ' successfully updated to a full release');

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();