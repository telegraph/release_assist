#!/usr/bin/env node

const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const url = core.getInput('url');
    core.info('Sending POST request...');
    const data = JSON.parse(core.getInput('data'));
    const team_name = core.getInput('team');
    
    if (team != null} {
      data.team = team_name
    }
    
    console.log(data)
    await axios.post(url, data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
