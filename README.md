# Apk Info Action

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
  uses: zhaobozhen/apk-info-action@v1
  with:
    apk-path: ${{ steps.apk-path.outputs.path }}
- name: Show apk info
  run: |
    echo '${{ steps.apk-info.outputs.application-name }}'
    echo '${{ steps.apk-info.outputs.application-id }}'
    echo '${{ steps.apk-info.outputs.version-code }}'
    echo '${{ steps.apk-info.outputs.version-name }}'
    echo '${{ steps.apk-info.outputs.min-sdk-version }}'
    echo '${{ steps.apk-info.outputs.target-sdk-version }}'
    echo '${{ steps.apk-info.outputs.compile-sdk-version }}'
    echo '${{ steps.apk-info.outputs.uses-permissions }}'
    echo '${{ steps.apk-info.outputs.debuggable }}'
    echo '${{ steps.apk-info.outputs.allow-backup }}'
    echo '${{ steps.apk-info.outputs.supports-rtl }}'
    echo '${{ steps.apk-info.outputs.file-size }}'
    echo '${{ steps.apk-info.outputs.readable-file-size }}'
```

### Result of action

Use `result` outputs.

```yaml
- uses: zhaobozhen/apk-info-action@v1
  id: apk-info
  with:
    apk-path: 'app/build/outputs/apk/release/app-release.apk'
- name: Show result
  if: always()
  run: echo '${{ steps.apk-info.outputs.result }}' # success or failure
```

## License

MIT
