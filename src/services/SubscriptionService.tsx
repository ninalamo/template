export async function getClientSubscriptions(clientId: string)
{
    const res = await fetch(`${process.env.apiBaseURI}/api/clients/${clientId}/subscriptions`);

    if(!res.ok){
        return null;
    }

    return (await res.json()).data[0];
}