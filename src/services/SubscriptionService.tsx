import { SubscriptionCreate } from "@/models/ClientSubscription";

export async function getClientSubscriptions(clientId: string)
{
    const res = await fetch(`${process.env.apiBaseURI}/api/clients/${clientId}/subscriptions`);

    if(!res.ok){
        return null;
    }

    return (await res.json()).data[0];
}

export async function createClientSubscription(data: SubscriptionCreate)
{
    var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    
    const res = await fetch(
    `${process.env.apiBaseURI}/api/Subscriptions`,
    requestOptions
    );

    const result = await res.json();
    
    return {
        status: res.status,
        result
    }
}