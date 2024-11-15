const { initializeApp } = require('firebase-admin/app');
const { getStorage, getDownloadURL } = require('firebase-admin/storage');

process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "127.0.0.1:3014"

const adminApp = initializeApp(
    {
        projectId: "demo-project",
        storageBucket: "demo-project.appspot.com"
    }
);

async function main() {
    const fileRef = getStorage(adminApp).bucket().file('my-file.txt');
    const downloadURL = await getDownloadURL(fileRef);
    console.log(downloadURL);
}

main()