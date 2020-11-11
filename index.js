#!/usr/bin/env node

const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const data = {}
    const url = core.getInput('url');
    
    // extract optional inputs and add them to POST request body
    inputs = ['team', 'project_name', 'release_version', 'release_description']
    inputs.forEach(function(elem) {
       const val = core.getInput(elem);
       if (val != null && val != "") {
         data[elem] = val;
       }
    });
    
    console.log(data)
    await axios.post(url, data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
