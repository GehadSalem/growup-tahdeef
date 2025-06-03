"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require('../../growup-tahdeef-436e0-firebase-adminsdk-fbsvc-b066554920.json');
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount)
    });
}
exports.default = firebase_admin_1.default;
//# sourceMappingURL=firebase-admin.js.map