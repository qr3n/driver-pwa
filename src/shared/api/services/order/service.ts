import {
    CancelOrderParams,
    ChangeStatusParams,
    DiscountOrderParams,
    MakeOrderCurrentParams,
    TakeOrderParams
} from "./types";
import { baseApi } from "@/shared/api";

class OrderService {
    async take(params: TakeOrderParams) {
        return baseApi.post(`/order/take?token=${params.token}`, params)
    }

    async discount(params: DiscountOrderParams) {
        return baseApi.post(`/order/discount?token=${params.token}`, params)
    }

    async makeCurrent(params: MakeOrderCurrentParams) {
        return baseApi.post(`/order/current?token=${params.token}`, params)
    }

    async changeStatus(params: ChangeStatusParams) {
        return baseApi.put(`/courier-status?order_id=${params.order_id}&status=${params.status}`)
    }

    async cancel(params: CancelOrderParams){
        return baseApi.post(`/order/cancel?token=${params.token}`, params)
    }
}

export const orderService = new OrderService();