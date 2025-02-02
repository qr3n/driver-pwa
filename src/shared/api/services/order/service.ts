import {
    CancelOrderParams,
    ChangeStatusParams,
    DiscountOrderParams,
    MakeOrderCurrentParams, NextStepParams, StartProgressParams,
    TakeOrderParams
} from "./types";
import { baseApi } from "@/shared/api";

class OrderService {
    async take(params: TakeOrderParams) {
        return baseApi.post(`/orders/take`, params)
    }

    async startProgress(data: StartProgressParams) {
        return baseApi.post(`/orders/progress/start`, data)
    }

    async discount(params: DiscountOrderParams) {
        return baseApi.post(`/order/discount?token=${params.token}`, params)
    }

    // async makeCurrent(params: MakeOrderCurrentParams) {
    //     return baseApi.post(`/order/current?token=${params.token}`, params)
    // }

    async nextStep(params: NextStepParams) {
        return baseApi.post(`/orders/progress/next`, params)
    }

    async changeStatus(params: ChangeStatusParams) {
        return baseApi.put(`/courier-status?order_id=${params.order_id}&status=${params.status}`)
    }

    async cancel(params: CancelOrderParams){
        return baseApi.post(`/orders/cancel`, params)
    }
}

export const orderService = new OrderService();