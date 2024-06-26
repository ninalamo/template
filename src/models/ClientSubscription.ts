export interface ClientSubscription{
    subscription_id: string,
    client_id: string,
    card_level: number,
    description: string,
    card_expiry_in_months: number,
    start_date: string
    end_date: string,
    actual_end_date: string,
    status_code: number,
    status_description: string,
    reason: string,
    reminder_interval: number,
    payment_interval: number
}

export interface SubscriptionCreate
{
    client_id: string,
    start_date: string,
    end_date: string,
    card_level: number,
    number_of_month_to_expire: number
}