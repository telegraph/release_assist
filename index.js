const core = require('@actions/core');
const { extractPullRequestCommits, updatePullRequest, addLabelToPullRequest } = require('./pullRequest');
const { getMostRecentRelease, createDraftRelease } = require('./release');
const { getNextReleaseNumber, generateChangelog } = require('./util');

async function run() {
  try {

    core.info('checking release number...')

    const commits = await extractPullRequestCommits();
    const changelog = generateChangelog(commits);

    const latestRelease = await getMostRecentRelease();

    let releaseNumber = 'v1.0.0';
    if (latestRelease == null) {
      core.info('no release found');
    } else {
      core.info('latestRelease: ' + latestRelease.tag_name);
      releaseNumber = getNextReleaseNumber(latestRelease.tag_name, changelog);
    }

    core.info('creating draft release: ' + releaseNumber);

    const releaseNotes = changelog.generateMarkdown();

    core.info('generated release notes: ' + releaseNotes);
    
    await createDraftRelease(releaseNumber, releaseNotes);

    core.info('updating pull request');
    await updatePullRequest(releaseNumber, releaseNotes);

    core.info('adding draftRelease label')
    await addLabelToPullRequest(releaseNumber)

    core.info('done');

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();