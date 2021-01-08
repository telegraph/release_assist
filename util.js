function getNextReleaseNumber(currentReleaseNumber, releaseChangelog) {
  const result = currentReleaseNumber.match(/^v(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/); 
  
  if (result == null) {
    console.log('current release number: ' + currentReleaseNumber + ' is not a semver number.');
    return 'v1.0.0';
  }
  
  let major = result[1];
  let minor = result[2];
  let patch = result[3];
  
  if (releaseChangelog.includes('BREAKING')) {
    console.log('incrementing major number');
    major++;
    minor = 0;
    patch = 0;
  } else if (releaseChangelog.includes('feat')) {
    console.log('incrementing minor number');
    minor++;
    patch = 0;
  } else {
    console.log('incrementing patch number');
    patch++;
  }
  
  return 'v' + major + '.' + minor + '.' + patch;
}

function generateChangelog(commits) {
  const commitMessages = commits.data
    .map(commit => ` - ${commit.commit.message}`);
  const result = commitMessages.join('\n');
  return result;
}

module.exports.getNextReleaseNumber = getNextReleaseNumber;
module.exports.generateChangelog = generateChangelog;