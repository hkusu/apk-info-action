const core = require('@actions/core');
const ApkParser = require('app-info-parser');
const fs = require('fs');

const NODE_ENV = process.env['NODE_ENV'];

let input;
if (NODE_ENV != 'local') {
  input = {
    apkPath: core.getInput('apk-path', { required: true }),
  };
} else {
  input = {
    apkPath: './app-debug.apk',
  };
}

async function run(input) {
  const parser = new ApkParser(input.apkPath);
  const result = await parser.parse();

  core.setOutput("applicationLabel", result.application.label);
  core.setOutput("applicationId", result.package);
  core.setOutput("versionCode", result.versionCode);
  core.setOutput("versionName", result.versionName);
  core.setOutput("minSdkVersion", result.usesSdk.minSdkVersion);
  core.setOutput("targetSdkVersion", result.usesSdk.targetSdkVersion);
  core.setOutput("compileSdkVersion", result.compileSdkVersion);
  core.setOutput("usesPermissions", JSON.stringify(result.usesPermissions.map(item => item.name)));
  core.setOutput("debuggable", result.application.debuggable);
  core.setOutput("allowBackup", result.application.allowBackup);
  core.setOutput("supportsRtl", result.application.supportsRtl);

  const fileSize = fs.statSync(input.apkPath).size;
  core.setOutput("fileSize", fileSize);

  if (1024 * 1024 * 1024 <= fileSize) {
    let gSize = fileSize / (1024 * 1024 * 1024);
    gSize = Math.floor(gSize * 10) / 10; // 小数第二位以下は切り捨て
    core.setOutput("readableFileSize", gSize.toLocaleString() + 'GB');
  } else if (1024 * 1024 <= fileSize) {
    let mSize = fileSize / (1024 * 1024);
    mSize = Math.floor(mSize * 10) / 10; // 小数第二位以下は切り捨て
    core.setOutput("readableFileSize", mSize.toLocaleString() + 'MB');
  } else if (1024 <= fileSize) {
    let kSize = fileSize / 1024;
    kSize = Math.floor(kSize); // 小数第以下は切り捨て
    core.setOutput("readableFileSize", kSize.toLocaleString() + 'KB');
  } else {
    core.setOutput("readableFileSize", fileSize.toLocaleString() + 'B');
  }
}

run(input)
  .then(result => {
    core.setOutput('result', 'success');
  })
  .catch(error => {
    core.setOutput('result', 'failure');
    core.setFailed(error.message);
  });
