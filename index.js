const core = require('@actions/core');
const ApkParser = require('app-info-parser');

async function run() {
  try { 
    const apkPath = core.getInput('apkPath');
    const parser = new ApkParser(apkPath);
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
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
