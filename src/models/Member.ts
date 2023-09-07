import { UserCredential } from "./UserCredential";

export interface MemberRegister{
    client_id: string | undefined,
    member_id: string | undefined,
    first_name: string,
    last_name: string,
    middle_name: string,
    name_suffix: string,
    phone_number: string,
    email: string,
    address: string,
    occupation: string,
    facebook: string,
    linkedin: string,
    instagram: string,
    pinterest: string,
    twitter: string,
    card_key: string | undefined,
    subscription_level: number,
    identity: UserCredential
}

export interface MemberInfo{
    member_id: string,
    full_name: string,
    first_name: string,
    last_name: string,
    middle_name: string,
    name_suffix: string,
    phone_number: string,
    email: string,
    address: string,
    occupation: string,
    facebook: string,
    linkedin: string,
    instagram: string,
    pinterest: string,
    twitter: string,
    card_key: string,
    subscription_level: number
}