const core = require('@actions/core');
const wait = require('./wait');

const AppInfoParser = require('app-info-parser');


// most @actions toolkit packages have async methods
async function run() {
  try { 
/*
    const ms = core.getInput('milliseconds');
    console.log(`Waiting ${ms} milliseconds ...`)

    core.debug((new Date()).toTimeString())
    await wait(parseInt(ms));
    core.debug((new Date()).toTimeString())

    core.setOutput('time', new Date().toTimeString());
*/

    const apkPath = core.getInput('apkPath');

    console.log(apkPath);

    const parser = new AppInfoParser(apkPath);// or xxx.ipa
    parser.parse().then(result => {

        core.setOutput("versionCode", result.versionCode);
        core.setOutput("versionNum", result.versionName);
        core.setOutput("applicationId", result.package);
        core.setOutput("name", result.application.label);
        console.log('app info ----> ', result);

    }).catch(err => {
        console.log('err ----> ', err)
    });


  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
