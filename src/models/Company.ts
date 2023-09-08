export interface Company {
    id: number,
    name: string,
    industry: string,
    subscription: string
} 
  
export interface AddCompany {
    company_name: string,
    industry: string,
    is_discreet?: boolean,
    subscription_level: number,
} 
  

export interface Client {
    client_id: string,
    company_name: string,
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