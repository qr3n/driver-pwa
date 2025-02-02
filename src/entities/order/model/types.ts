export interface IOrder {
    id: string,
    recipient_phone: string;
    package_width: number;
    pickup_addresses: string[];
    package_length: number;
    package_height: number;
    places_count: number;
    weight: number;
    driver_id: string;
    comment: string;
    user_id: string;
    shipment_type: 'marketplace' | 'anything';
    what_to_deliver: string[];
    marketplace: 'Яндекс маркет' | 'Wildberries' | 'Ozon' | 'AliExpress' | 'Lamoda';
    cost: number;
    delivery_addresses: string[];
    packing_type: 'box' | 'palette';
    sender_phone: string;
    status: 'Поиск курьера' | 'Курьер назначен' | 'В пути' | 'На погрузке' | 'Выполняет' | 'Заказ выполнен' | 'Отменен',
    active: boolean,
    pickup_date: string,
    delivery_date: string,
    pickup_time_from: string,
    pickup_time_to: string,
    delivery_time_from: string,
    delivery_time_to: string,
    is_in_progress: boolean
}