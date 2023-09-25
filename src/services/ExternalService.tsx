import { MemberRegister } from "@/models/Member";

export async function getMemberInfo(
    client_id: string,
    member_id: string,
    uid: string)
{
    const res = await fetch(`${process.env.apiBaseURI}/ext/v1/tenants/${client_id}/members/${member_id}?uid=${uid}`);

    if(!res.ok){
        return null;
    }

    return (await res.json()).data[0][0]; 
}

export async function saveMemberInfo(data: MemberRegister)
{
    const settings = {
        method: 'POST'
        ,headers: {
            Accept: 'application/json'
            ,'Content-Type': 'application/json'
        }
        ,body: JSON.stringify(data)
    }

    try{
        const res = await fetch(
            `${process.env.apiBaseURI}/ext/v1/tenants/${data.client_id}/members/${data.member_id}?uid=${data.card_key}`
            ,settings);

        console.log('unprocessed', res);
        const result = await res.json();
        console.log("Success:", result);

        return {
            status: res.status,
            result
        };
        
    }catch(e){
        throw new Error('Failed to save data');
    }
}