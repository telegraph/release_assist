const core = require('@actions/core');
const { extractPullRequestCommits, updatePullRequest } = require('./pullRequest');
const { getMostRecentRelease, createDraftRelease } = require('./release');
const { getNextReleaseNumber, generateChangelog } = require('./util');

async function run() {
  try {
    core.info('running');

    const commits = await extractPullRequestCommits();
    const releaseNotes = generateChangelog(commits);
    core.info('releaseNotes: \n' + releaseNotes);

    const latestRelease = await getMostRecentRelease();

    let releaseNumber = 'v1.0.0';
    if (latestRelease == null) {
      core.info('no release found');
    } else {
      core.info('latestRelease: ' + latestRelease.tag_name);
      releaseNumber = getNextReleaseNumber(latestRelease.tag_name, releaseNotes);
    }

    core.info('creating draft release: ' + releaseNumber);

    await createDraftRelease(releaseNumber, releaseNotes);

    core.info('updating pull request');
    await updatePullRequest(releaseNumber, releaseNotes);

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();