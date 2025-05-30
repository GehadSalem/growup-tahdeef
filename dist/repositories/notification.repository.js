"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const data_source_1 = require("../dbConfig/data-source");
const Notification_1 = require("../entities/Notification");
exports.NotificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
