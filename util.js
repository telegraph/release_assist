const breakingLine = `
`;

class CommitMessage {
  constructor(jiraId, type, message) {
    this.jiraId = jiraId;
    this.type = type;
    this.message = message;
  }
}
class Changelog {  
  constructor() {
    this.breaking = false
    this.features = []
    this.fixes = []
    this.docs = []
    this.others = []
  }

  addFix(fix) {
    this.fixes.push(fix);
    this.checkIfBreakingChange(fix);
  }

  addFeature(feature) {
    this.features.push(feature);
    this.checkIfBreakingChange(feature);
  }

  addDoc(doc) {
    this.docs.push(doc);
    this.checkIfBreakingChange(doc);
  }

  addOther(other) {
    this.others.push(other);
    this.checkIfBreakingChange(other);
  }

  checkIfBreakingChange(change) {
    if (change.toUpperCase().includes('BREAKING')) {
      this.breaking = true;
    }
  }

  hasFeatures() {
    return this.features.length > 0;
  }

  generateMarkdown() {
    let markdown = '';
    
    if (this.features.length > 0) {
      markdown += breakingLine;
      markdown += '### ✨ Features';
      markdown += breakingLine;
      markdown += this.joinCommitMessages(this.features);
    }

    if (this.fixes.length > 0) {
      markdown += breakingLine;
      markdown += '### 🐞 Fixes';
      markdown += breakingLine;
      markdown += this.joinCommitMessages(this.fixes);
    }

    if (this.docs.length > 0) {
      markdown += breakingLine;
      markdown += '### 📋 Documentation';
      markdown += breakingLine;
      markdown += this.joinCommitMessages(this.docs);
    }

    if (this.others.length > 0) {
      markdown += breakingLine;
      markdown += '### 🛠 Others';
      markdown += breakingLine;
      markdown += this.joinCommitMessages(this.others);
    }

    return markdown;
  }

  joinCommitMessages(commitMessages) {
    return commitMessages.map(commitMessage => ` - ${commitMessage}`).join(breakingLine);
  }
  
} 

function getNextReleaseNumber(currentReleaseNumber, releaseChangelog) {
  const result = currentReleaseNumber.match(/^v(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/); 
  
  if (result == null) {
    console.log('current release number: ' + currentReleaseNumber + ' is not a semver number.');
    return 'v1.0.0';
  }
  
  let major = result[1];
  let minor = result[2];
  let patch = result[3];
  
  if (releaseChangelog.breaking) {
    console.log('incrementing major number');
    major++;
    minor = 0;
    patch = 0;
  } else if (releaseChangelog.hasFeatures()) {
    console.log('incrementing minor number');
    minor++;
    patch = 0;
  } else {
    console.log('incrementing patch number');
    patch++;
  }
  
  return 'v' + major + '.' + minor + '.' + patch;
}

function parseCommitMessage(commitMessage) {
  const result = /(?<jira_id>[A-Z]+-[0-9]+)?(\s*)(?<type>(\w+):)?(?<message>.*)/.exec(commitMessage);
  return new CommitMessage(result.groups.jira_id, result.groups.type, result.groups.message);
}

function generateChangelog(commits) {
  const changelog = new Changelog();
  commits.data.forEach(commit => {
    const commitMessage = parseCommitMessage(commit.commit.message);

    const message = commitMessage.message.replace("[deploy=preprod]",'').replace('deploy=preprod','').trim();
    if (message == '' || message.includes('Merge branch')) {
      console.log('filtered out: ' + commit.commit.message)
      return;
    }
    
    if (commitMessage.type != undefined) {
      if (commitMessage.type == 'feat:') {
        changelog.addFeature(message);
      } else if (commitMessage.type == 'fix:') {
        changelog.addFix(message);
      } else if (commitMessage.type == 'docs:') {
        changelog.addDoc(message);
      } else {
        changelog.addOther(commitMessage.type + ' ' + message);
      }
    } else {
      changelog.addOther(message);
    }    
  });

  return changelog;
}

module.exports.getNextReleaseNumber = getNextReleaseNumber;
module.exports.generateChangelog = generateChangelog;