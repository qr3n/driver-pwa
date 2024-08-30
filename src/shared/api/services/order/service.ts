import { DiscountOrderParams, MakeOrderCurrentParams, TakeOrderParams } from "./types";
import { baseApi } from "@/shared/api";

class OrderService {
    async take(params: TakeOrderParams) {
        return baseApi.post(`/order/take?token=${params.token}`, params)
    }

    async discount(params: DiscountOrderParams) {
        return baseApi.post('/order/discount', params)
    }

    async makeCurrent(params: MakeOrderCurrentParams) {
        return baseApi.post(`/order/current?token=${params.token}`, params)
    }
}

export const orderService = new OrderService();