const core = require('@actions/core');
const { readFile } = require('./file');
const { cleanPom } = require('./pom');
const { getTopics, addTopics,removeAllTopics } = require('./topics');

const paths = core.getInput('paths').split(" ");
const replace = core.getInput('replace-topics');
const isPom = core.getInput('is-pom');

async function run() {
  try {
    let topics;
    core.info("Previous Topics: " + (await getTopics()).data.names);
    if(replace == "true")
      await removeAllTopics();
    for (let index = 0; index < paths.length; index++) {
      core.info("Reading path: " + paths[index]);
      let content = await readFile(paths[index]);
      if(isPom == "true")
        topics = cleanPom(await readFile(paths[index])).toString().split(",");
      else
        // Replacing all spaces into new lines, then splitting by new lines
        topics = content.replace(/ /g, '\r\n').split(/\r?\n/);
      core.info("Topics: " + topics);
      await addTopics(topics);
    }
    core.info("DONE. Current Topics: " + (await getTopics()).data.names);
  } catch (error) {
      core.setFailed(error.message);
  }
}

run();