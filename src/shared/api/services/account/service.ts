import { baseApi } from "@/shared/api";
import { AddCarInfoParams, AddInfo } from "@/shared/api/services/account/types";

class AccountService {
    addCarInfo(params: AddCarInfoParams): Promise<void> {
        return baseApi.post(`/car?token=${params.token}`, params)
    }

    addInfo(params: AddInfo): Promise<void> {
        return baseApi.post(`/driver-info?token=${params.token}`, params)
    }
}

export const accountService = new AccountService();