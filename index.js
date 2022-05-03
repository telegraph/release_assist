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
    let topics = [];
    core.info("from POM?: " + isPom);
    if(isPom)
      core.info("with POM -> TODO")
      // topics = cleanPom(readFile(path))
    else
      for (let path of paths) {
        core.info("path: " + path);
        topics.push((await readFile(path)).replace(" ", "-").split(/\r?\n/));
      }
    core.info("Topics to add: " + topics);
    core.info("replace: " + replace);
    if(replace)
      await replaceTopics(topics)
    else
      await addTopics(topics);
    core.info("Current Topics: " + (await getTopics()).data.names);
  } catch (error) {
      core.setFailed(error.message);
  }
}

run();