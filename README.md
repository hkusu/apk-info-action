# apk info action

This action gets apk info.

## Inputs

### `apkPath`

**Required** apk file path. ex: `app/build/outputs/apk/release/app-release.apk`

## Outputs

See Useage.

## Usage

```yaml
- name: Check out
  uses: actions/checkout@v1
- name: Set up JDK
  uses: actions/setup-java@v1
  with:
    java-version: 1.8
- name: Build with Gradle
  run: ./gradlew assembleRelease
- name: Get apk path
  id: apk-path
  run: |
    path=$(find **/build/outputs/apk -name '*.apk' -type f | head -1)
    echo "::set-output name=path::$path"
- name: Get apk info
  id: apk-info
  uses: hkusu/apk-info-action@v0.1.0
  with:
    apkPath: ${{ steps.apk-path.outputs.path }}
- name: Show apk info
  run: |
    echo '${{ steps.apk-info.outputs.versionCode }}'
    echo '${{ steps.apk-info.outputs.versionName }}'
    echo '${{ steps.apk-info.outputs.compileSdkVersion }}'
    echo '${{ steps.apk-info.outputs.compileSdkVersionCodename }}'
    echo '${{ steps.apk-info.outputs.packageName }}'
    echo '${{ steps.apk-info.outputs.usesPermissions }}'
    echo '${{ steps.apk-info.outputs.minSdkVersion }}'
    echo '${{ steps.apk-info.outputs.targetSdkVersion }}'
    echo '${{ steps.apk-info.outputs.applicationLabel }}'
    echo '${{ steps.apk-info.outputs.debuggable }}'
    echo '${{ steps.apk-info.outputs.allowBackup }}'
    echo '${{ steps.apk-info.outputs.supportsRtl }}'
```

## License

MIT
