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
    subscription_id: string,
    identity: UserCredential
}   


export interface MemberInfo{
    id: string,
    clientId: string,
    company: string,
    fullName: string,
    firstName: string,
    lastName: string,
    middleName: string,
    nameSuffix: string,
    phoneNumber: string,
    email: string,
    address: string,
    occupation: string,
    facebook: string,
    linkedIn: string,
    instagram: string,
    pinterest: string,
    twitter: string,
    card_key: string,
    subscription: string,
    subscription_level: number
}