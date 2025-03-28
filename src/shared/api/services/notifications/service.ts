import { DisableNotificationsRequest, EnableNotificationsRequest } from "./types";
import { baseApi } from "@/shared/api";

class NotificationService {
    async enableNotifications(data: EnableNotificationsRequest) {
        return await baseApi.post('/notifications/enable', data)
    }

    async disableNotifications(data: DisableNotificationsRequest) {
        return await baseApi.post('/notifications/disable', data)
    }
}

export const notificationsService = new NotificationService()
