"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
var data_source_1 = require("../dbConfig/data-source.js");
var Notification_entity_1 = require("../entities/Notification.entity.js");
exports.NotificationRepository = data_source_1.AppDataSource.getRepository(Notification_entity_1.Notification);
//# sourceMappingURL=notification.repository.js.map