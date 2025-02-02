export interface TakeOrderParams {
    order_id: string
}

export interface DiscountOrderParams {
    token: string,
    order_id: number,
    discount: number
}

export interface MakeOrderCurrentParams {
    order_id: number
}

export interface StartProgressParams {
    order_id: string
}

export interface ChangeStatusParams {
    order_id: string,
    status: string
}

export interface NextStepParams {
    order_id: string,
}

export interface CancelOrderParams {
    order_id: string,
    reason: string,
    comment: string
}