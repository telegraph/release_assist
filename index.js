const core = require('@actions/core');
const { readFile } = require('./file');
const { cleanPom } = require('./pom');
const { getTopics, addTopics, replaceTopics } = require('./topics');

const paths = core.getInput('paths').split(" ");
const replace = core.getInput('replace-topics');
const isPom = core.getInput('is-pom');

async function run() {
  try {
    core.info("Previous Topics: " + (await getTopics()).data.names);
    core.info("Paths: " + paths);
    core.info("from POM?: " + isPom);
    for (let index = 0; index < paths.length; index++) {
      core.info("Reading path: " + paths[index]);
      let content = await readFile(paths[index]);
      let topics;
      if(isPom == "true") {
        cleanPom(content);
        core.info("with POM -> TODO");
      }
      else
        // Replacing all spaces into new lines, then splitting by new lines
        topics = content.replace(/ /g, '\r\n').split(/\r?\n/);
      core.info("Topics: " + topics);
      if(replace == "true")
        await replaceTopics(topics);
      else
        await addTopics(topics);
    }
    core.info("Current Topics: " + (await getTopics()).data.names);
  } catch (error) {
      core.setFailed(error.message);
  }
}

run();