import { baseApi } from "@/shared/api";
import { AddCarInfoParams, AddInfo } from "@/shared/api/services/account/types";
import { ICar } from "@/entities/car/model/types";

class AccountService {
    async addCarInfo(params: AddCarInfoParams) {
        return await baseApi.put<ICar>(`/profile/car`, params)
    }

    async getCarInfo() {
        return await baseApi.get<ICar>('/profile/car')
    }

    async addInfo(params: AddInfo): Promise<void> {
        return await baseApi.post(`/profile`, params)
    }

    async changeInfo(params: AddInfo) {
        return await baseApi.put(`/profile`, params)
    }

    async getInfo() {
        return await baseApi.get('/profile')
    }
}

export const accountService = new AccountService();