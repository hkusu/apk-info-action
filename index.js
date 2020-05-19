const core = require('@actions/core');
const ApkParser = require('app-info-parser');

async function run() {
  try { 
    const apkPath = core.getInput('apkPath');

    const parser = new ApkParser('./app-debug.apk');

    const result = await parser.parse();

    core.setOutput("versionCode", result.versionCode);
    core.setOutput("versionName", result.versionName);
    core.setOutput("compileSdkVersion", result.compileSdkVersion);
    core.setOutput("compileSdkVersionCodename", result.compileSdkVersionCodename);
    core.setOutput("package", result.package);
    core.setOutput("usesPermissions", JSON.stringify(result.usesPermissions.map(item => item.name)));
    core.setOutput("minSdkVersion", result.usesSdk.minSdkVersion);
    core.setOutput("targetSdkVersion", result.usesSdk.targetSdkVersion);
    core.setOutput("label", result.application.label);
    core.setOutput("debuggable", result.application.debuggable);
    core.setOutput("allowBackup", result.application.allowBackup);
    core.setOutput("supportsRtl", result.application.supportsRtl);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
