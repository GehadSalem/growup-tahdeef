import { AppDataSource } from '../dbConfig/data-source';
import { Notification } from '../entities/Notification';

export const NotificationRepository = AppDataSource.getRepository(Notification);
