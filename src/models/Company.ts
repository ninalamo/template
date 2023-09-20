export interface Company {
    id: string,
    name: string,
    industry: string,
    subscriptions: number
} 
  
export interface AddCompany {
    company_name: string,
    industry: string,
} 
  

export interface Client {
    client_id: string,
    company_name: string,
    industry: string,
    is_discreet: boolean,
    is_active: boolean,
    card_holders: number,
    non_cardholders: number,
    subscription: string,
    subscription_level: number,
    created_by: string,
    created_on: string,
    modified_by: string,
    modified_on: string
}