#!/usr/bin/env node

const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const url = core.getInput('url');
    core.info('Sending POST request...');
    const data = JSON.parse(core.getInput('data'));
    console.log(data)
    await axios.post(url, data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
