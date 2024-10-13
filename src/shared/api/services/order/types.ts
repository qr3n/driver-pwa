export interface TakeOrderParams {
    token: string,
    order_id: number
}

export interface DiscountOrderParams {
    token: string,
    order_id: number,
    discount: number
}

export interface MakeOrderCurrentParams {
    token: string,
    order_id: number
}

export interface ChangeStatusParams {
    order_id: number,
    status: string
}

export interface CancelOrderParams {
    token: string,
    order_id: number,
    reason: string,
    comment: string
}