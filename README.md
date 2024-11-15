# Repro for issue 7646

## Versions

node: v20.2.1<br>
firebase-tools: v13.25.0<br>
platform: macOS

## Steps to reproduce

1. Install dependencies
   - Run `cd functions`
   - Run `npm i`
   - Run `cd ../`
2. Run `firebase emulators:start --project demo-project --import ./emulator-data`
3. Run `curl http://127.0.0.1:3015/demo-project/us-central1/helloWorld` or open http://127.0.0.1:3015/demo-project/us-central1/helloWorld in a browser.
4. Terminal running the emulators shows:

```
⚠  functions: Error: Permission denied. No READ permission.
    at new ApiError (/Users/<PATH>/issues/7946/functions/node_modules/@google-cloud/storage/build/cjs/src/nodejs-common/util.js:114:15)
    at Util.parseHttpRespBody (/Users/<PATH>/issues/7946/functions/node_modules/@google-cloud/storage/build/cjs/src/nodejs-common/util.js:253:38)
    at Util.handleResp (/Users/<PATH>/issues/7946/functions/node_modules/@google-cloud/storage/build/cjs/src/nodejs-common/util.js:193:30)
    at /Users/<PATH>/issues/7946/functions/node_modules/@google-cloud/storage/build/cjs/src/nodejs-common/util.js:583:22
    at onResponse (/Users/<PATH>/issues/7946/functions/node_modules/retry-request/index.js:259:7)
    at /Users/<PATH>/issues/7946/functions/node_modules/teeny-request/build/src/index.js:217:17
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
⚠  Your function was killed because it raised an unhandled error.
```

## Notes

### Admin SDK

Tried making the request to the emulator using the Admin SDK only(`admin-only` directory)

1. Install dependencies
   - Run `cd admin-only`
   - Run `npm i`
2. Run `firebase emulators:start --project demo-project --import ./emulator-data`
3. In a new terminal, run `cd admin-only`, then run `node .`. It throws an error

```
ApiError: Permission denied. No READ permission.
...
```

### Live Firebase project

Tried connecting to a real Firebase project, and the Admin SDK was able to bypass the closed rules

1. Run `firebase deploy --only storage --project PROJECT_ID`
1. Modify `functions/index.js` to pass config to your Firebase Project

```js
initializeApp({
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  credential: cert("../service-account.json"),
});
```

2. Run `firebase emulators:start --only functions --project PROJECT_ID`
3. Open http://127.0.0.1:3015/PROJECT_ID/us-central1/helloWorld in a browser.
   - Outputs the link to the file