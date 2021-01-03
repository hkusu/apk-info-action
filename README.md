# apk info action

This GitHub Actions gets information of Android apk file.

## Usage

Specify the path of the apk file to `apk-path` input, eg `app/build/outputs/apk/release/app-release.apk`.

```yaml
- name: Check out
  uses: actions/checkout@v2
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
  uses: hkusu/apk-info-action@v1
  with:
    apk-path: ${{ steps.apk-path.outputs.path }}
- name: Show apk info
  run: |
    echo '${{ steps.apk-info.outputs.applicationLabel }}'
    echo '${{ steps.apk-info.outputs.applicationId }}'
    echo '${{ steps.apk-info.outputs.versionCode }}'
    echo '${{ steps.apk-info.outputs.versionName }}'
    echo '${{ steps.apk-info.outputs.minSdkVersion }}'
    echo '${{ steps.apk-info.outputs.targetSdkVersion }}'
    echo '${{ steps.apk-info.outputs.compileSdkVersion }}'
    echo '${{ steps.apk-info.outputs.usesPermissions }}'
    echo '${{ steps.apk-info.outputs.debuggable }}'
    echo '${{ steps.apk-info.outputs.allowBackup }}'
    echo '${{ steps.apk-info.outputs.supportsRtl }}'
    echo '${{ steps.apk-info.outputs.fileSize }}'
    echo '${{ steps.apk-info.outputs.readableFileSize }}'
```

### Result of action

Use `result` outputs.

```yaml
- uses: hkusu/apk-info-action@v1
  id: apk-info
  with:
    apk-path: 'app/build/outputs/apk/release/app-release.apk'
- name: Show result
  if: always()
  run: echo '${{ steps.apk-info.outputs.result }}' # success or failure
```

## License

MIT
