/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage, getDownloadURL } = require('firebase-admin/storage');

initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest(async (request, response) => {
    const fileRef = getStorage().bucket().file('my-file.txt');
    const downloadURL = await getDownloadURL(fileRef);
    logger.log(downloadURL);
    response.send(downloadURL)
});
