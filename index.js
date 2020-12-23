const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {

    core.info('running')
    const token = core.getInput('repo-token');

    core.info("token: " +  token);
       
    const octokit = github.getOctokit(token);

    const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
      owner: github.context.payload.repository.owner.login,
      repo: github.context.payload.repository.name
    });

    if (response.status !== 200) {
      const error = 'failed to retrieve releases. response.status: ' + response.status + ' response.data: ' + response.data
      core.error(error);
      core.setFailed(error);
      return;
    }

    let releaseVersion;
    let releaseNotes;
    if (response.data.length > 0) {
      releaseVersion = response.data[0].tag_name;
      releaseNotes = response.data[0].body;
    } else {
      core.warning('no release found');
      releaseVersion = 'N/A';
      releaseNotes = 'No release found';
    }

    core.setOutput('releaseVersion', releaseVersion);
    core.setOutput('releaseNotes', releaseNotes);

  } catch (error) {
      core.setFailed(error.message);
  }
}

run();