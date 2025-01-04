import {
    IAddNotificationsDeviceRequest,
    IRemoveNotificationsDeviceRequest
} from "@/shared/api/services/notifications/types";
import { baseApi } from "@/shared/api";

class NotificationsService {
    async getConnection(data: IAddNotificationsDeviceRequest) {
        return baseApi.get(`/notifications/driver/devices/connection?access_token=${data.access_token}&token=${data.token}`,)
    }

    async addDevice(data: IAddNotificationsDeviceRequest) {
        return baseApi.post(`/notifications/driver/devices/connect?token=${data.access_token}`, data)
    }

    async removeDevice(data: IRemoveNotificationsDeviceRequest) {
        return baseApi.post(`/notifications/driver/devices/disconnect?token=${data.access_token}`, data)
    }
}

export const notificationsService = new NotificationsService()