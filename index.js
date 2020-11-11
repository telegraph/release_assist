#!/usr/bin/env node

const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const data = {}
    const url = core.getInput('url');
    
    
    const team_name = core.getInput('team');
    if (team_name != null) {
      data.team_name = team_name
    }
    
    console.log(data)
    await axios.post(url, data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
