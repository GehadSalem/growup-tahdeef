import admin from 'firebase-admin';

const serviceAccount = require('../../growup-tahdeef-436e0-firebase-adminsdk-fbsvc-b066554920.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default admin;