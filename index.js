const core = require('@actions/core');
const { readFile } = require('./file');
const { cleanPom } = require('./pom');
const { getTopics, addTopics, removeAllTopics } = require('./topics');

const paths = core.getInput('paths').split(" ");
const replace = core.getInput('replace');
const isPom = core.getInput('is-pom');

async function run() {
  try {
    core.info("Previous Topics: " + (await getTopics()).data.names);
    if(replace == "true")
      await removeAllTopics();
    for (let index = 0; index < paths.length; index++) {
      let topics = [];
      core.info("Reading path: " + paths[index]);
      let content = await readFile(paths[index]);
      if(isPom == "true")
        topics = cleanPom(await readFile(paths[index])).toString().split(",");
      else
        // Replacing all spaces into new lines, then splitting by new lines
        topics = content.replace(/ /g, '\r\n').split(/\r?\n/);
      if(topics[topics.length-1] == ','){
        topics = topics.slice(0, topics.length-1);
      }
      core.info("Topics: " + topics);
      await addTopics(topics);
    }
    core.info("DONE. Current Topics: " + (await getTopics()).data.names);
  } catch (error) {
      core.setFailed(error.message);
  }
}

run();