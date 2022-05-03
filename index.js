const core = require('@actions/core');
const { readFile } = require('./read_file');
const { cleanPom } = require('./read_file');
const { getTopics, addTopics, replaceTopics } = require('./topics');

const paths = core.getInput('paths').split(" ");
const replace = core.getInput('replace-topics');
const isPom = core.getInput('is-pom');

async function run() {
  try {
    core.info("Previous Topics: " + (await getTopics()).data.names);
    core.info("Paths: " + paths);
    core.info("from POM?: " + isPom);
    if(isPom == "true")
      core.info("with POM -> TODO")
    else
      for (let index = 0; index < paths.length; index++) {
        core.info("Reading path: " + paths[index]);
        let topics = (await readFile(paths[index])).replace(" ", "\n").split(/\r?\n/);
        core.info("Topics: " + topics);
        if(replace == "true")
          await replaceTopics(topics);
        else
          await addTopics(topics);
      }
    core.info("replace: " + replace);
    core.info("Current Topics: " + (await getTopics()).data.names);
  } catch (error) {
      core.setFailed(error.message);
  }
}

run();